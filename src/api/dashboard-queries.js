/* eslint-disable */ 
import gql from 'graphql-tag';

export const totalChannelCountQuery = gql `
  query TotalChannelCountQuery {
    channel_cnt {
      cnt
    }
  }
`;

export const totalUserCountQuery = gql `
  query TotalUserCountQuery {
    user_cnt {
      cnt
    }
  }
`;

/* eslint-disable */ 
