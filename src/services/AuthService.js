import Cookies from 'js-cookie';

const TOKEN_PARAM_NAME = 'main';
const TOKEN_EXPIRES = 1;

function setToken(token) {
  Cookies.set(TOKEN_PARAM_NAME, token, { expires: TOKEN_EXPIRES });
}

function getToken() {
  return Cookies.get(TOKEN_PARAM_NAME);
}

function removeToken() {
  Cookies.remove(TOKEN_PARAM_NAME);
}

export function authSignin(username, password) {
  let credentials = [username, password].join(':'),
    accessToken = `Basic ${btoa(credentials)}`;

  setToken(accessToken);
}

export function isUserAuthenticated() {
  return !!getToken();
}

export function authSignout() {
  removeToken();
}
