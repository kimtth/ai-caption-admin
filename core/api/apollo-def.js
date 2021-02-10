const fs = require('fs')
const { gql, ApolloError } = require('apollo-server-koa');
const User = require('../models/user');
const Channel = require('../models/channel');
const Message = require('../models/message');

const typeDefs = gql(fs.readFileSync(`${__dirname}/schema.graphql`, {
  encoding: 'utf8'
}))

// Provide resolver functions for your schema fields
const resolvers = {
  Query: {
    hello: async () => await 'Hello world!',
    user: async (parent, args, context, info) => {
      const { userId } = args;
      const user = await User.findOne({ userId: userId });
      if (user) {
        return user
      }
    },
    users: async () => {
      const users = await User.find();
      if (users) {
        return users
      }
    },
    channel: async (parent, args, context, info) => {
      const { _id } = args;
      const channel = await Channel.findById(_id);
      return channel
    },
    channels: async () => {
      const channels = await Channel.find();
      return channels
    },
    message: async (parent, args, context, info) => {
      const { id } = args;
      const message = await Message.findOne({ id: id });
      return message
    },
    messages: async () => {
      const messages = await Message.find();
      return messages
    },
    channel_many: async (parent, args, context, info) => {
      try {
        const { filter } = args;
        const { criteria, keyword } = filter;
        let searchCondition = {}
        switch (criteria) {
          case "name":
            searchCondition = { name: { $regex: `.*${keyword}.*` } }
            break;
          case "userId":
            searchCondition = { userId: { $regex: `.*${keyword}.*` } }
            break;
          case "id":
            searchCondition = { id: { $regex: `.*${keyword}.*` } }
            break;
          default:
        }
        const channels = await Channel.find(searchCondition);
        return channels
      } catch (e) {
        throw new ApolloError(e, 'ERROR', {});
      }

      /*
      query hehe($filter: SearchInput!){
        channel_many(filter: $filter) {
          id
          name
          owner
        }
      }
      
      {
        "filter":
        {
          "criteria": "name",
          "keyword": "dododo"
        }
      }
      */
    },
    message_many: async (parent, args, context, info) => {
      try {
        const { filter } = args;
        const { criteria, keyword } = filter;
        let searchCondition = {}
        switch (criteria) {
          case "channelId":
            searchCondition = { channelId: { $regex: `.*${keyword}.*` } }
            break;
          case "userId":
            searchCondition = { userId: { $regex: `.*${keyword}.*` } }
            break;
          case "conversationText":
            searchCondition = { conversationText: { $regex: `.*${keyword}.*` } }
            break;
          case "translateText":
            searchCondition = { translateText: { $regex: `.*${keyword}.*` } }
            break;
          default:
        }
        const messages = await Message.find(searchCondition);
        return messages
      } catch (e) {
        throw new ApolloError(e, 'ERROR', {});
      }
    },
    user_many: async (parent, args, context, info) => {
      try {
        const { filter } = args;
        const { criteria, keyword } = filter;
        let searchCondition = {}
        switch (criteria) {
          case "username":
            searchCondition = { username: { $regex: `.*${keyword}.*` } }
            break;
          case "userId":
            searchCondition = { userId: { $regex: `.*${keyword}.*` } }
            break;
          default:
        }
        const users = await User.find(searchCondition);
        return users
      } catch (e) {
        throw new ApolloError(e, 'ERROR', {});
      }
    },
  },
  Mutation: {
    createUser: async (parent, args, context, info) => {
      const { user } = args;
      const { password } = user
      try {
        const new_user = await new User(user);
        await new_user.setPassword(password)
        await new_user.save();
        return new_user.serialize();
      } catch (e) {
        throw new ApolloError(e, 'ERROR', {});
      }
    },
    updateUser: async (parent, args, context, info) => {
      const { userId, user } = args;
      const update_user = await User.findOneAndUpdate(
        { userId: userId },
        user,
        {
          new: true, //body: updated data
        }
      ).catch(e => { throw new ApolloError(e, 'ERROR', {}) });
      return update_user.serialize();
    },
    updateChannel: async (parent, args, context, info) => {
      const { _id, channel } = args;
      const update_channel = await Channel.findByIdAndUpdate(
        _id,
        channel,
        {
          new: true, //body: updated data
        }
      ).catch(e => { throw new ApolloError(e, 'ERROR', {}) });
      return update_channel;
    },
    updateMessage: async (parent, args, context, info) => {
      const { id, message } = args
      const update_message = await Message.findOneAndUpdate(
        { id: id },
        message,
        {
          new: true, //body: updated data
        }
      ).catch(e => { throw new ApolloError(e, 'ERROR', {}) });
      return update_message;
    },
    deleteUsers: async (parent, args, context, info) => {
      const { userIds } = args
      console.log(userIds)
      let users = []
      userIds.forEach(async userId => {
        const user = await User.findOneAndRemove({ userId: userId });
        users.push(user);
      }).catch(e => { throw new ApolloError(e, 'ERROR', {}) });
      return users;
    },
    deleteChannels: async (parent, args, context, info) => {
      const { _ids } = args
      let channels = []
      _ids.forEach(async _id => {
        const channel = await Channel.findByIdAndRemove(_id);
        channels.push(channel)
      }).catch(e => { throw new ApolloError(e, 'ERROR', {}) });
      return channels;
    },
    deleteMessages: async (parent, args, context, info) => {
      const { ids } = args
      let messages = []
      ids.forEach(async id => {
        const message = await Message.findOneAndRemove({ id: id });
        messages.push(message)
      }).catch(e => { throw new ApolloError(e, 'ERROR', {}) });
      return messages;
    },
  }
};

module.exports = {
  typeDefs,
  resolvers
}
