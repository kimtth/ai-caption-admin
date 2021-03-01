import { AUTH_API_ENDPOINT } from './Constants';

export async function login(user) {
  const { userId, password } = user;
  const response = await fetch(`${AUTH_API_ENDPOINT}/login`, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ userId, password }),
    credentials: 'include'
  });
  return response.ok;
}

export async function logout() {
  const response = await fetch(`${AUTH_API_ENDPOINT}/logout`, {
    method: 'POST',
    credentials: 'include'
  });
  return response.ok;
}
