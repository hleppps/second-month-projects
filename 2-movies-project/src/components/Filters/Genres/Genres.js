import React from "react";
import { Button, Form, Spinner } from "react-bootstrap";
import GenreItem from "../GenreItem";

const Genres = ({ allGenresList, selectedGenresList, setGenresFilter }) => {
  const onSelectHandler = (isSelected, genreId) => {
    if (isSelected) {
      setGenresFilter([...selectedGenresList, genreId]);
    }

    if (!isSelected) {
      setGenresFilter(
        selectedGenresList.filter((genreItem) => genreItem !== genreId)
      );
    }
  };

  const resetGenresHandler = () => {
    setGenresFilter([]);
  };

  return (
    <>
      <Button
        data-testid="reset-genres"
        onClick={resetGenresHandler}
        className="my-2 w-100"
        variant="outline-secondary"
      >
        Show All Genres
      </Button>
      <Form.Group className="my-2" data-testid="genres-list">
        {!allGenresList && <Spinner animation="grow" />}
        {allGenresList &&
          allGenresList.map((genreItem) => (
            <GenreItem
              isSelected={selectedGenresList.includes(genreItem.id)}
              onSelect={onSelectHandler}
              key={genreItem.id}
              id={genreItem.id}
              name={genreItem.name}
            />
          ))}
      </Form.Group>
    </>
  );
};

export default Genres;
