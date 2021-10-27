import { Form } from "react-bootstrap";

const GenreItem = ({ isSelected, ...props }) => {
  const onCheckHandler = () => {
    props.onSelect(!isSelected, props.id);
  };

  return (
    <Form.Check
      data-testid="checkbox"
      id={props.id}
      type="checkbox"
      label={props.name}
      checked={isSelected}
      onChange={onCheckHandler}
    />
  );
};

export default GenreItem;
