export const DEV_MODE = process.env.NODE_ENV !== "production"? true: false; 
export const API_ENDPOINT = DEV_MODE ? 'http://localhost:8081/graphql': `/graphql`
export let isLoggedIn = false;
export const setAuth = (auth) => {
    isLoggedIn = auth;
}