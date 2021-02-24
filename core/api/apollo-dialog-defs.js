const fs = require('fs');
const { gql } = require('apollo-server-koa');
const moment = require("moment");
const User = require('../models/user');
const Channel = require('../models/channel');
const Message = require('../models/message');

const dialogTypeDefs = gql(fs.readFileSync(`${__dirname}/dialog.graphql`, {
  encoding: 'utf8'
}))

const dialogResolvers = {
  Query: {
    audio: async (parent, args, context, info) => {
      if (!context.userId) return null;
      const cnt = await Message.count({
        isAudioRecord: true
      });
      const totalcnt = await Message.count();
      if (cnt) {
        return {
          count: cnt,
          totalCount: totalcnt
        }
      }
    },
    user: async (parent, args, context, info) => {
      if (!context.userId) return null;
      const cnt = await User.count();
      if (cnt) {
        return {
          totalCount: cnt
        }
      }
    },
    custom: async (parent, args, context, info) => {
      if (!context.userId) return null;
      const cnt = await User.count();
      if (cnt) {
        return {
          count: cnt,
          totalCount: cnt
        }
      }
    },
    channel: async (parent, args, context, info) => {
      if (!context.userId) return null;
      const cnt = await Channel.count();
      if (cnt) {
        return {
          count: cnt
        }
      }
    },
    traffic: async (parent, args, context, info) => {
      if (!context.userId) return null;
      // type CountDay {
      //   day: String
      //   count: Int
      // }
      const today = moment(new Date()).format('YYYY-MM-DD[T00:00:00.000Z]');
      moment(today).add(-1, 'days').format('YYYY-MM-DD[T00:00:00.000Z]')
    }
  }
}

module.exports = {
  dialogTypeDefs,
  dialogResolvers
}
