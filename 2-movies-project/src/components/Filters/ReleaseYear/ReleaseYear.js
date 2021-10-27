import React from "react";
import { Form } from "react-bootstrap";

const ReleaseYear = React.memo((props) => {
  const onChangeHandler = (event) => {
    props.setYearFilter(event.target.value);
  };

  return (
    <Form.Group className="my-3">
      <Form.Label>Release year:</Form.Label>
      <Form.Select
        data-testid="year-select"
        aria-label="Default select example"
        onChange={onChangeHandler}
        value={props.filteredYear}
      >
        <option value="2021">2021</option>
        <option value="2020">2020</option>
        <option value="2019">2019</option>
        <option value="2018">2018</option>
      </Form.Select>
    </Form.Group>
  );
});
export default ReleaseYear;
