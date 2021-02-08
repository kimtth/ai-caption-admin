/* eslint-disable */ 
import gql from 'graphql-tag';

export const usersQuery = gql `
  query UsersQuery {
    users {
      userId
      username
      password
      publishedDate
    }
  }
`;

export const messagesQuery = gql `
  query MessagesQuery {
    messages {
        id
        channelId
        userId
        conversationText
        translateText
        timestamp
        metadata
        isAudioRecord
        publishedDate
    }
  }
`;

export const channelsQuery = gql `
  query ChannelsQuery {
    channels {
      _id
      id
      name
      userId
      owner
      publishedDate
    }
  }
`;

export const userOneQuery = gql ` 
  query UserOneQuery($userId: ID!) {
    user(userId: $userId){
      userId
      username
      publishedDate
    }
  }
`;

export const channelOneQuery = gql `
  query ChannelOneQuery($id: ID!) {
    channel(id: $id) {
            id
            name
            userId
            owner
            publishedDate
      }
  }
`;

export const messageOneQuery = gql`
  query MessageOneQuery($id: ID!) {
    message(id: $id) {
        id
        channelId
        userId
        conversationText
        translateText
        timestamp
        metadata
        isAudioRecord
        publishedDate
    }
  }
`;

export const userCreateQuery = gql`
  mutation UserCreateQuery($user: UserInput!) {
    createUser(
      user: $user
    ){
      id
      userId
      username
      password
    }
  }
`;

export const userUpdateQuery = gql`
  mutation UserUpdateQuery($userId: ID!, $user: UserInput) {
    updateUser(
      userId: $userId,
      user: $user
    ){
      id
      userId
      username
      password
    }
  }
`;

export const channelUpdateQuery = gql`
  mutation ChannelUpdateQuery($channelId: ID!, $channel: ChannelInput!){
    updateChannel(
      _id: $channelId,
      channel: $channel
    ){
      id
      name
      userId
      owner
    }
  }
`;

export const messageUpdateQuery = gql`
  mutation MessageUpdateQuery($messageId: ID!, $message: MessageInput){
    updateMessage(
      id: $messageId,
      message: $message
    ){
      id
      channelId
      userId
      conversationText
      translateText
      timestamp
      metadata
      isAudioRecord
    }
  }
`;

export const userDeleteQuery = gql ` 
  mutation UserDeleteQuery($ids: [ID]!) {
    deleteUsers(ids: $ids){
      userId
      username
      publishedDate
    }
  }
`;

export const channelDeleteQuery = gql `
  mutation ChannelDeleteQuery($_ids: [ID]!) {
    deleteChannels(_ids: $_ids) {
      id
      name
      userId
      owner
      publishedDate
    }
  }
`;

export const messageDeleteQuery = gql`
  mutation MessageDeleteQuery($ids: ID!) {
    deleteMessages(ids: $ids) {
      id
      channelId
      userId
      conversationText
      translateText
      timestamp
      metadata
      isAudioRecord
      publishedDate
    }
  }
`;

/* eslint-disable */ 
