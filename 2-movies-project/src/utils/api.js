import * as CONSTANTS from "./constants";

export async function fetchData(path, init = {}) {
  const response = await fetch(path, init);
  const data = await response.json();
  return data;
}

export async function getFilms(page, year, sorting, genres) {
  const path = `${CONSTANTS.API_DOMAIN}/discover/movie?api_key=${CONSTANTS.API_KEY}&include_video=false&page=${page}&sort_by=${sorting}&year=${year}&with_genres=${genres}`;
  return fetchData(path);
}

export async function getGenres() {
  const path = `${CONSTANTS.API_DOMAIN}/genre/movie/list?api_key=${CONSTANTS.API_KEY}`;
  return fetchData(path);
}

export async function createRequestToken() {
  const path = `${CONSTANTS.API_DOMAIN}/authentication/token/new?api_key=${CONSTANTS.API_KEY}`;
  const data = await fetchData(path);
  return data.request_token;
}

export async function validateWithLogin(login, password, requestToken) {
  const path = `${CONSTANTS.API_DOMAIN}/authentication/token/validate_with_login?api_key=${CONSTANTS.API_KEY}`;
  const initObject = {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify({
      username: login,
      password: password,
      request_token: requestToken,
    }),
  };
  return fetchData(path, initObject);
}

export async function createSession(requestToken) {
  const path = `${CONSTANTS.API_DOMAIN}/authentication/session/new?api_key=${CONSTANTS.API_KEY}`;
  const initObject = {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify({
      request_token: requestToken,
    }),
  };
  return fetchData(path, initObject);
}

export async function getUserData(sessionId) {
  const path = `${CONSTANTS.API_DOMAIN}/account?api_key=${CONSTANTS.API_KEY}&session_id=${sessionId}`;
  return fetchData(path);
}

export async function getFavoriteFilms(sessionId) {
  const path = `${CONSTANTS.API_DOMAIN}/account/{account_id}/favorite/movies?api_key=${CONSTANTS.API_KEY}&session_id=${sessionId}`;
  const data = await fetchData(path);
  let reformatedData = data.results.map((dataItem) => dataItem.id);

  return reformatedData;
}

export async function setFavoriteFilm(type, filmId, sessionId) {
  const path = `${CONSTANTS.API_DOMAIN}/account/{account_id}/favorite?api_key=${CONSTANTS.API_KEY}&session_id=${sessionId}`;
  const initObject = {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify({
      media_type: "movie",
      media_id: filmId,
      favorite: type,
    }),
  };
  fetchData(path, initObject);
}
