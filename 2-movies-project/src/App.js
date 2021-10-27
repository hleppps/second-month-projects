import "bootstrap/dist/css/bootstrap.min.css";
import React, { useContext, useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import ReactDOM from "react-dom";
import AuthModal from "./components/AuthModal";
import FilmsList from "./components/FilmsList";
import Filters from "./components/Filters";
import Layout from "./components/Layout";
import useMovies from "./hooks/useMovies";
import AuthContext from "./store/auth-context";
import {
  createRequestToken,
  createSession,
  getFavoriteFilms,
  getFilms,
  getGenres,
  getUserData,
  validateWithLogin,
} from "./utils/api";

const defaultFiltersState = {
  page: 1,
  sorting: "popularity.desc",
  year: 2021,
  genres: [],
};

const App = () => {
  const [allGenresList, setAllGenresList] = useState([]);
  const [filters, setFilters] = useState(defaultFiltersState);
  const { sendRequest, status, data } = useMovies(getFilms, filters);
  const [modalIsShown, setModalIsShown] = useState(false);
  const authCtx = useContext(AuthContext);

  const hideModalHandler = () => setModalIsShown(false);
  const showModalHandler = () => setModalIsShown(true);

  const fetchGenres = async () => {
    const genres = await getGenres();
    setAllGenresList(genres);
  };

  const authenticationHandler = async (
    loginInputRef,
    passwordInputRef,
    setIsError,
    setIsFetching
  ) => {
    const enteredLogin = loginInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;

    const requestToken = await createRequestToken();

    const validation = await validateWithLogin(
      enteredLogin,
      enteredPassword,
      requestToken
    );

    if (validation.success) {
      const newSession = await createSession(requestToken);

      if (newSession.success) {
        const sessionId = newSession.session_id;

        const userData = await getUserData(sessionId);
        const favoriteFilms = await getFavoriteFilms(sessionId);

        authCtx.setUserName(userData.username);
        authCtx.setFavoriteFilms(favoriteFilms);
        authCtx.login(sessionId, userData.username, favoriteFilms);
        setIsFetching(false);
        hideModalHandler();
      }
    } else {
      setIsFetching(false);
      setIsError(true);
    }
  };

  useEffect(() => {
    fetchGenres();
  }, []);

  useEffect(() => {
    sendRequest();
  }, [sendRequest]);

  const portalElement = document.getElementById("overlays");

  return (
    <>
      {ReactDOM.createPortal(
        <AuthModal
          modalIsShown={modalIsShown}
          onHideModal={hideModalHandler}
          authenticationHandler={authenticationHandler}
        />,
        portalElement
      )}
      <Layout onShowModal={showModalHandler}>
        <Row>
          <Col xs="5" md="4" lg="3">
            <Filters
              status={status}
              allGenresList={allGenresList}
              totalPages={data.total_pages}
              filters={filters}
              setFilters={setFilters}
              defaultFiltersState={defaultFiltersState}
            />
          </Col>
          <Col>
            <FilmsList status={status} films={data.results} />
          </Col>
        </Row>
      </Layout>
    </>
  );
};

export default App;
