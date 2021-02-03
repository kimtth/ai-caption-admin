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
/* eslint-disable */ 
