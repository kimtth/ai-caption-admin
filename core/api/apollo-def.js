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
    }
  },
  Mutation: {
    createUser: async (parent, args, context, info) => {
      const { user } = args;
      const { password } = user
      const new_user = await new User(user)
      await new_user.setPassword(password)
      await new_user.save();
      return new_user.serialize();
    },
    updateUser: async (parent, args, context, info) => {
      const { userId, user } = args;
      const update_user = await User.findOneAndUpdate(
        { userId: userId },
        user,
        {
          new: true, //body: updated data
        }
      );
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
      );
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
      );
      return update_message;
    },
    deleteUsers: async (parent, args, context, info) => {
      const { userIds } = args
      console.log(userIds)
      let users = []
      userIds.forEach(async userId => {
        const user = await User.findOneAndRemove({ userId: userId });
        users.push(user);
      });
      return users;
    },
    deleteChannels: async (parent, args, context, info) => {
      const { _ids } = args 
      let channels = []
      _ids.forEach(async _id => {
        const channel = await Channel.findByIdAndRemove(_id);
        channels.push(channel)
      });
      return channels;
    },
    deleteMessages: async (parent, args, context, info) => {
      const { ids } = args 
      let messages = []
      ids.forEach(async id => {
        const message = await Message.findOneAndRemove({ id: id });
        messages.push(message)
      });
      return messages;
    },
  }
};

module.exports = {
  typeDefs,
  resolvers
}
