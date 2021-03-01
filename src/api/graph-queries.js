/* eslint-disable */
import gql from 'graphql-tag';

export const customQuery = gql`
  query CustomsQuery {
    customs {
      id
      type
      refId
      value
      stream
      publishedDate
    }
  }
`;

export const usersQuery = gql`
  query UsersQuery {
    users {
      userId
      username
      password
      publishedDate
    }
  }
`;

export const messagesQuery = gql`
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

export const channelsQuery = gql`
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

export const userOneQuery = gql` 
  query UserOneQuery($userId: ID!) {
    user(userId: $userId){
      userId
      username
      password
      publishedDate
    }
  }
`;

export const channelOneQuery = gql`
  query ChannelOneQuery($id: ID!) {
    channel(_id: $id) {
      _id
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

export const userManyQuery = gql` 
  query UserManyQuery($filter: SearchInput!) {
    user_many(filter: $filter){
      userId
      username
      password
      publishedDate
    }
  }
`;

export const channelManyQuery = gql`
  query ChannelManyQuery($filter: SearchInput!) {
    channel_many(filter: $filter) {
      _id
      id
      name
      userId
      owner
      publishedDate
    }
  }
`;

export const messageManyQuery = gql`
  query MessageManyQuery($filter: SearchInput!) {
    message_many(filter: $filter) {
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
      userId
      username
      password
    }
  }
`;

export const channelUpdateQuery = gql`
  mutation ChannelUpdateQuery($_id: ID!, $channel: ChannelInput!){
    updateChannel(
      _id: $_id,
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
  mutation MessageUpdateQuery($id: ID!, $message: MessageInput){
    updateMessage(
      id: $id,
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

export const userDeleteQuery = gql` 
  mutation UserDeleteQuery($userIds: [ID]!) {
    deleteUsers(userIds: $userIds){
      userId
      username
      publishedDate
    }
  }
`;

export const channelDeleteQuery = gql`
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
  mutation MessageDeleteQuery($ids: [ID]!) {
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
