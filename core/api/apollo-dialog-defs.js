const fs = require('fs');
const {
  gql
} = require('apollo-server-koa');
const moment = require("moment");
const User = require('../models/user');
const Channel = require('../models/channel');
const Message = require('../models/message');

const dialogTypeDefs = gql(fs.readFileSync(`${__dirname}/dialog.graphql`, {
  encoding: 'utf8'
}))

const dialogResolvers = {
  Query: {
    audioCnt: async (parent, args, context, info) => {
      if (!context.userId) return null;
      const cnt = await Message.countDocuments({
        isAudioRecord: true
      });
      const totalcnt = await Message.countDocuments();
      if (cnt) {
        return {
          count: cnt,
          totalCount: totalcnt
        }
      }
    },
    userCnt: async (parent, args, context, info) => {
      if (!context.userId) return null;
      const cnt = await User.countDocuments();
      if (cnt) {
        return {
          count: cnt
        }
      }
    },
    customCnt: async (parent, args, context, info) => {
      if (!context.userId) return null;
      const cnt = await User.countDocuments();
      if (cnt) {
        return {
          count: cnt,
          totalCount: cnt
        }
      }
    },
    channelCnt: async (parent, args, context, info) => {
      if (!context.userId) return null;
      const cnt = await Channel.countDocuments();
      if (cnt) {
        return {
          count: cnt
        }
      }
    },
    trafficCnt: async (parent, args, context, info) => {
      if (!context.userId) return null;

      let CountDays = [];
      let fromDateBefore = 2;
      let toDateBefore = 1;
      const today = moment(new Date()).format('YYYY-MM-DD[T00:00:00.000Z]');

      for (let i = 0; i < 15; i++) {
        const fromDate = moment(today).subtract(fromDateBefore, 'days').format('YYYY-MM-DD[T00:00:00.000Z]');
        const toDate = moment(today).subtract(toDateBefore, 'days').format('YYYY-MM-DD[T00:00:00.000Z]');
        
        if(i===0){
          console.log(new Date(fromDate))
          console.log(new Date(toDate))
        }
        
        const cnt = await Message.countDocuments({
          publishedDate: {
            "$gte": new Date(fromDate),
            "$lt": new Date(toDate)
          }
        })
        console.log(cnt);

        const CountDay = {
          day: `${fromDate} <-> ${toDate}`,
          count: cnt
        }
        CountDays.push(CountDay);

        toDateBefore = fromDateBefore;
        fromDateBefore += 1;
      }

      return CountDays;
    }
  }
}

module.exports = {
  dialogTypeDefs,
  dialogResolvers
}
