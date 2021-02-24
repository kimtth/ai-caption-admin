/* eslint-disable */ 
import gql from 'graphql-tag';

export const audioRecordQuery = gql `
  query AudioRecordQuery {
    audio {
      count
      totalCount
    }
  }
`;

export const totalUserCountQuery = gql `
  query TotalUserQuery {
    user {
      totalCount
    }
  }
`;

export const customCountQuery = gql `
  query TotalUserQuery {
    custom {
      count
      totalCount
    }
  }
`;

export const totalChannelCountQuery = gql `
  query TotalUserQuery {
    channel {
      count
    }
  }
`;

export const trafficCountQuery = gql `
  query TotalUserQuery {
    traffic {
      day
      count
    }
  }
`;

/* eslint-disable */ 
