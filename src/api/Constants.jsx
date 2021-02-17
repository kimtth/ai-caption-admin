export const DEV_MODE = process.env.NODE_ENV !== "production"? true: false; 
export const GRAPH_API_ENDPOINT = DEV_MODE ? 'http://localhost:8081/graphql': '/graphql';
export const AUTH_API_ENDPOINT = DEV_MODE ? 'http://localhost:8081/api': '/api';