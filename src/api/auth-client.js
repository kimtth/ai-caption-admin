import { AUTH_API_ENDPOINT } from './Constants'
import Cookie from "js-cookie"

const accessTokenKey = 'accessToken';

export function getAccessToken() {
  const token = Cookie.get("access_token");
  return token;
}

export async function login(user) {
  const { userId, password } = user;
  const response = await fetch(`${AUTH_API_ENDPOINT}/login`, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ userId, password })
  });
  if (response.ok) {
    const { token } = await response.json();
    Cookie.set("access_token", token);
  }
  return response.ok;
}

export async function logout() {
  const response = await fetch(`${AUTH_API_ENDPOINT}/logout`, {
    method: 'POST'
  });
  if (response.ok) {
    Cookie.remove("access_token");
  }
  return response.ok;
}
