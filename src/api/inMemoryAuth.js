let isLoggedIn = false;

export function setAuth(authValue) {
  isLoggedIn = authValue;
}

export function getAuth() {
  return isLoggedIn;
}

export function removeAuth() {
  isLoggedIn = false;
}
