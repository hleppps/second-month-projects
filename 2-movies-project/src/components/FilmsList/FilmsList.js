import React, { useContext } from "react";
import { Col, Row } from "react-bootstrap";
import AuthContext from "../../store/auth-context";
import { setFavoriteFilm } from "../../utils/api";
import FilmsListItem from "../FilmsListItem";
import LoadingSpinner from "../LoadingSpinner";
import styles from "./FilmsList.module.scss";

const FilmsList = React.memo((props) => {
  const authCtx = useContext(AuthContext);
  let filmsList;

  const addFavoriteFilmHandler = (filmId) => {
    authCtx.setFavoriteFilms((prevState) => [...prevState, filmId]);
    setFavoriteFilm(true, filmId, authCtx.token);
  };

  const removeFavoriteFilmHandler = (filmId) => {
    authCtx.setFavoriteFilms((prevState) =>
      prevState.filter((itemId) => itemId !== filmId)
    );
    setFavoriteFilm(false, filmId, authCtx.token);
  };

  const favoriteFilmHandler = (filmId, isFavorite) => {
    if (isFavorite) {
      removeFavoriteFilmHandler(filmId);
    } else {
      addFavoriteFilmHandler(filmId);
    }
  };

  if (props.status === "completed" && !!props.films.length) {
    filmsList = (
      <Row xs={1} md={2} xl={4} className="g-4">
        {props.films.map((filmItem) => (
          <Col className="g-4" key={filmItem.id}>
            <FilmsListItem
              setFavoriteFilm={favoriteFilmHandler}
              isFavorite={authCtx.favoriteFilms.includes(filmItem.id)}
              filmId={filmItem.id}
              backdropPath={filmItem.backdrop_path}
              title={filmItem.title}
              rating={filmItem.vote_average}
            />
          </Col>
        ))}
      </Row>
    );
  } else if (props.status === "completed" && !props.films.length) {
    filmsList = <p>No movies found by these search criteria...</p>;
  } else {
    filmsList = <LoadingSpinner />;
  }

  return (
    <div data-testid="films-list" className={styles.filmsList}>
      {filmsList}
    </div>
  );
});

export default FilmsList;
