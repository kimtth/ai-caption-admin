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
  mutation {
    createUser(
      userId: "",
      username: "",
      password: ""
    ){
      userId
      username
      password
    }
  }
`;

/* eslint-disable */ 
