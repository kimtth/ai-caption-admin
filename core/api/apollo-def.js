const fs = require('fs');
const Joi = require('joi');
const { gql, ApolloError } = require('apollo-server-koa');
const User = require('../models/user');
const Channel = require('../models/channel');
const Message = require('../models/message');
const Admin = require('../models/admin');
const { BlobServiceClient } = require('@azure/storage-blob');

const blobServiceClient = BlobServiceClient.fromConnectionString(process.env.AZURE_STORAGE_CONNECTION_STRING);

const typeDefs = gql(fs.readFileSync(`${__dirname}/schema.graphql`, {
  encoding: 'utf8'
}))

// Provide resolver functions for your schema fields
const resolvers = {
  Query: {
    hello: async () => await 'Hello world!',
    customs: async (parent, args, context, info) => {
      if (!context.userId) return null;
      const customs = await Admin.find();
      if (customs) {
        return customs
      }
    },
    user: async (parent, args, context, info) => {
      if (!context.userId) return null;
      const { userId } = args;
      const user = await User.findOne({ userId: userId });
      if (user) {
        return user
      }
    },
    users: async (parent, args, context, info) => {
      if (!context.userId) return null;
      const users = await User.find();
      if (users) {
        return users
      }
    },
    channel: async (parent, args, context, info) => {
      if (!context.userId) return null;
      const { _id } = args;
      const channel = await Channel.findById(_id);
      return channel
    },
    channels: async (parent, args, context, info) => {
      if (!context.userId) return null;
      const channels = await Channel.find();
      return channels
    },
    message: async (parent, args, context, info) => {
      if (!context.userId) return null;
      const { id } = args;
      const message = await Message.findOne({ id: id });
      return message
    },
    messages: async (parent, args, context, info) => {
      if (!context.userId) return null;
      const messages = await Message.find();
      return messages
    },
    channel_many: async (parent, args, context, info) => {
      if (!context.userId) return null;
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
    },
    message_many: async (parent, args, context, info) => {
      if (!context.userId) return null;
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
      if (!context.userId) return null;
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
      if (!context.userId) throw new ApolloError('Authentication required', 'ERROR', {});
      const { user } = args;
      const { password } = user

      const schema = Joi.object().keys({
        userId: Joi.string().min(1).max(20).required(),
        username: Joi.string(),
        password: Joi.string().required(),
      });
      const result = schema.validate(user);
      if (result.error) {
        throw new ApolloError(result.error, 'ERROR', {});
      }

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
      if (!context.userId) throw new ApolloError('Authentication required', 'ERROR', {});
      const { userId, user } = args;
      const { password } = user;

      // Kim: check for already hashed or not.
      if (!password.startsWith('$2b$10') && password.length < 25) {
        const updated_user = await new User(user);
        await updated_user.setPassword(password);
        user.password = updated_user.password;
      }

      // Kim: While Updating, the publishedDate should be not changed.
      const user_exist = await User.findOne({ userId: userId })
        .catch(e => { throw new ApolloError(e, 'ERROR', {}) });;
      const { publishedDate } = user_exist;
      user.publishedDate = publishedDate;

      const result = await User.findOneAndUpdate(
        { userId: userId },
        user,
        {
          new: true, //body: updated data
        }
      ).catch(e => { throw new ApolloError(e, 'ERROR', {}) });
      return result.serialize();
    },
    updateChannel: async (parent, args, context, info) => {
      if (!context.userId) throw new ApolloError('Authentication required', 'ERROR', {});
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
      if (!context.userId) throw new ApolloError('Authentication required', 'ERROR', {});
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
      if (!context.userId) throw new ApolloError('Authentication required', 'ERROR', {});
      const { userIds } = args
      console.log(userIds)

      let users = []
      userIds.forEach(async userId => {
        const user = await User.findOneAndRemove({ userId: userId });
        const channels = await Channel.find({ userId: userId });
        channels.forEach(async channel => {
          //Kim: channelId + userId => unique key
          const ownerCheck = await Channel.find({ _id: channel._id });
          if (ownerCheck.owner) {
            const deletedChannels = await Channel.deleteMany({ id: channel.id });
            const deletedMessages = await Message.deleteMany({ channelId: channel.id });

            // delete files
            const containerClient = blobServiceClient.getContainerClient(channel.id);
            await containerClient.delete();
          } else {
            await Channel.findOneAndDelete({ _id: channel._id })
          }
        })

        //delete my channel 
        const MAIN_CH_CLASSIFIER = 'my-main'
        const user_main = await User.findOne({ userId: userId });
        const MAIN_CH_ID = `${user_main._id}-${MAIN_CH_CLASSIFIER}`;
        const deletedMessages = await Message.deleteMany({ channelId: MAIN_CH_ID });
        const containerClient = (MAIN_CH_ID);
        await containerClient.delete();

        users.push(user);
      }).catch(e => { throw new ApolloError(e, 'ERROR', {}) });
      return users;
    },
    deleteChannels: async (parent, args, context, info) => {
      if (!context.userId) throw new ApolloError('Authentication required', 'ERROR', {});
      const { _ids } = args
      let channels = []
      _ids.forEach(async _id => {
        const channel = await Channel.findByIdAndRemove(_id);
        if (channel.owner) {
          const deletedChannels = await Channel.deleteMany({ id: channel.id });
          const deletedMessages = await Message.deleteMany({ channelId: channel.id });

          // delete files
          const containerClient = blobServiceClient.getContainerClient(channel.id);
          await containerClient.delete();
        }
        channels.push(channel)
      }).catch(e => { throw new ApolloError(e, 'ERROR', {}) });
      return channels;
    },
    deleteMessages: async (parent, args, context, info) => {
      if (!context.userId) throw new ApolloError('Authentication required', 'ERROR', {});
      const { ids } = args
      let messages = []
      ids.forEach(async id => {
        const message = await Message.findOneAndRemove({ id: id });
        //Kim: The file is deleted when the related channel is dismissed.
        messages.push(message)
      }).catch(e => { throw new ApolloError(e, 'ERROR', {}) });
      return messages;
    },
    deleteCustoms: async (parent, args, context, info) => {
      if (!context.userId) throw new ApolloError('Authentication required', 'ERROR', {});
      const { ids } = args
      let customs = []
      ids.forEach(async id => {
        const custom = await Admin.findOneAndRemove({ id: id });
        customs.push(custom)
      }).catch(e => { throw new ApolloError(e, 'ERROR', {}) });
      return customs;
    }
  }
};

module.exports = {
  typeDefs,
  resolvers
}
