let isLoggedIn = false;

export function setAuth(authValue) {
  isLoggedIn = authValue;
  sessionStorage.setItem("isLoggedIn", authValue);
}

export function getAuth() {
  return sessionStorage.getItem("isLoggedIn");
}

export function removeAuth() {
  isLoggedIn = false;
  sessionStorage.removeItem("isLoggedIn");
}
