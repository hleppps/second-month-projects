import React, { useCallback, useEffect, useState } from "react";
import { getFavoriteFilms } from "../utils/api";
import Cookies from "js-cookie";

const AuthContext = React.createContext({
  token: "",
  isLoggedIn: false,
  login: (token) => {},
  logout: () => {},
  userName: "",
  setUserName: (userName) => {},
  favoriteFilms: [],
  setFavoriteFilms: (films) => {},
});

const retrieveStoredData = () => {
  const storedToken = Cookies.get("token");
  const storedUserName = Cookies.get("userName");

  return {
    token: storedToken,
    userName: storedUserName,
  };
};

export const AuthContextProvider = (props) => {
  const storedData = retrieveStoredData();
  let initialToken;
  let initialUserName;

  if (storedData) {
    initialToken = storedData.token;
    initialUserName = storedData.userName;
  }

  const [token, setToken] = useState(initialToken);
  const [userName, setUserName] = useState(initialUserName);
  const [favoriteFilms, setFavoriteFilms] = useState([]);

  const fetchFavorites = useCallback(async () => {
    if (token) {
      const data = await getFavoriteFilms(token);
      setFavoriteFilms(data);
    }
  }, [token]);

  useEffect(() => {
    fetchFavorites();
  }, [fetchFavorites]);

  const userIsLoggedIn = !!token;

  const logoutHandler = useCallback(() => {
    setToken(null);
    Cookies.remove("token");
    Cookies.remove("userName");
  }, []);

  const loginHandler = (token, userName) => {
    setToken(token);
    Cookies.set("token", token);
    Cookies.set("userName", userName);
  };

  const contextValue = {
    token: token,
    isLoggedIn: userIsLoggedIn,
    login: loginHandler,
    logout: logoutHandler,
    userName,
    setUserName,
    favoriteFilms,
    setFavoriteFilms,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
