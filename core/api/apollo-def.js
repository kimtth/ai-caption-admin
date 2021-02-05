const fs = require('fs')
const { gql } = require('apollo-server-koa');
const User = require('../models/user');
const Channel = require('../models/channel');
const Message = require('../models/message');

const typeDefs = gql(fs.readFileSync(`${__dirname}/schema.graphql`, {
  encoding: 'utf8'
}))

// Provide resolver functions for your schema fields
const resolvers = {
  Query: {
    hello: () => 'Hello world!',
    user: (parent, args, context, info) => {
      // The query from a client
      // query UserOneQuery {
      //   user(userId: "test@test"){
      //     userId
      //     username
      //     publishedDate
      //   }
      // }
      return User.findOne({ userId: args.userId });
    },
    users: () => {
      // query UsersQuery {
      //   users {
      //     userId
      //     username
      //     password
      //     publishedDate
      //   }
      // }
      return User.find();
    },
    channel: (parent, args, context, info) => {
      //  query ChannelOneQuery {
      //     channel(id: "8455d4-02c2-1cf6-a07f-6cde1373b6da") {
      //        id
      //        name
      //        userId
      //        owner
      //        publishedDate
      //    }
      //  }
      return Channel.findOne({ id: args.id });
    },
    channels: () => {
      // query ChannelsQuery {
      //   channels {
      //     id
      //     name
      //     userId
      //     owner
      //     publishedDate
      //   }
      // }
      return Channel.find();
    },
    message: (parent, args, context, info) => {
      // query MessagesQuery {
      //   messages {
      //       id
      //       channelId
      //       userId
      //       conversationText
      //       translateText
      //       timestamp
      //       metadata
      //       isAudioRecord
      //       publishedDate
      //   }
      // }
      return Message.findOne({ id: args.id });
    },
    messages: () => {
      // query MessageOneQuery {
      //   message(id: "cf74485-aef-16f2-5ed3-fcee3586b5e") {
      //       id
      //       channelId
      //       userId
      //       conversationText
      //       translateText
      //       timestamp
      //       metadata
      //       isAudioRecord
      //       publishedDate
      //   }
      // }
      return Message.find();
    }
  },
};

module.exports = {
  typeDefs,
  resolvers
}
