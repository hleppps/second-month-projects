import React from "react";
import { Form } from "react-bootstrap";

const SortBy = React.memo((props) => {
  const onChangeHandler = (event) => {
    props.setSortingFilter(event.target.value);
  };

  return (
    <Form.Group className="my-3">
      <Form.Label>Sort by:</Form.Label>
      <Form.Select
        data-testid="sort-select"
        aria-label="Default select example"
        onChange={onChangeHandler}
        value={props.filteredSorting}
      >
        <option value="popularity.desc">Most Popular</option>
        <option value="popularity.asc">Least Popular</option>
        <option value="vote_average.desc">Most Wanted</option>
        <option value="vote_average.asc">Least Wanted</option>
      </Form.Select>
    </Form.Group>
  );
});

export default SortBy;
