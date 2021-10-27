import { Card } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext } from "react";
import AuthContext from "../../store/auth-context";
import styles from "./FilmsListItem.module.scss";
import * as CONSTANTS from "../../utils/constants";
import "../../utils/fontawasome";

const FilmsListItem = (props) => {
  const { isLoggedIn } = useContext(AuthContext);

  const iconType = props.isFavorite ? "fas" : "far";

  return (
    <>
      <Card className={styles.card}>
        {props.backdropPath && (
          <Card.Img
            variant="top"
            src={`${CONSTANTS.IMAGE_DOMAIN}${props.backdropPath}`}
            alt={props.backdropPath}
          />
        )}
        {!props.backdropPath && (
          <Card.Img variant="top" src={CONSTANTS.ERROR_IMAGE_URL} />
        )}
        <Card.Body className={styles.body}>
          <Card.Title data-testid="title">{props.title}</Card.Title>
          <Card.Text data-testid="subtitle">Rating: {props.rating}</Card.Text>
        </Card.Body>
        {isLoggedIn && (
          <Card.Footer>
            <FontAwesomeIcon
              data-testid="favorite-icon"
              icon={[iconType, "star"]}
              onClick={() => {
                props.setFavoriteFilm(props.filmId, props.isFavorite);
              }}
            />
          </Card.Footer>
        )}
      </Card>
    </>
  );
};

export default FilmsListItem;
