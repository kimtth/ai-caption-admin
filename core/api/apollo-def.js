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
      const { id } = args;
      const channel = await Channel.findOne({ id: id });
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
    createUser: async ({ user }) => {
      const { password } = user
      const new_user = await new User(user)
      await new_user.setPassword(password)
      await new_user.save();
      return new_user.serialize();
    },
    updateUser: async ({ userId, user }) => {
      const update_user = await User.findOneAndUpdate(
        { userId: userId },
        user,
        {
          new: true, //body: updated data
        }
      );
      return update_user.serialize();
    },
    updateChannel: async ({ _id, channel }) => {
      const update_channel = await Channel.findByIdAndUpdate(
        _id,
        channel,
        {
          new: true, //body: updated data
        }
      );
      return update_channel;
    },
    updateMessage: async ({ id, message }) => {
      const update_message = await Message.findOneAndUpdate(
        { id: id },
        message,
        {
          new: true, //body: updated data
        }
      );
      return update_message;
    },
    deleteUsers: async ({ ids }) => {
      let users = []
      ids.forEach(async id => {
        const user = await User.findByOneAndRemove({ id: id });
        users.push(user)
      });
      return users;
    },
    deleteChannels: async ({ _ids }) => {
      let channels = []
      _ids.forEach(async _id => {
        const channel = await Channel.findByIdAndRemove(_id);
        channels.push(channel)
      });
      return channels;
    },
    deleteMessages: async ({ ids }) => {
      let messages = []
      ids.forEach(async id => {
        const message = await Message.findByOneAndRemove({ id: id });
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
