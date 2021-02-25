/* eslint-disable */ 
import gql from 'graphql-tag';

export const audioRecordQuery = gql `
  query AudioRecordQuery {
    audioCnt {
      count
      totalCount
    }
  }
`;

export const totalUserCountQuery = gql `
  query TotalUserQuery {
    userCnt {
      count
    }
  }
`;

export const customCountQuery = gql `
  query customCountQuery {
    customCnt {
      count
      totalCount
    }
  }
`;

export const totalChannelCountQuery = gql `
  query totalChannelCountQuery {
    channelCnt {
      count
    }
  }
`;

export const trafficCountQuery = gql `
  query trafficCountQuery {
    trafficCnt {
      day
      count
    }
  }
`;

/* eslint-disable */ 
