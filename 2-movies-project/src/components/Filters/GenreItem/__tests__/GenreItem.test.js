import { render, cleanup, fireEvent, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import GenreItem from "../GenreItem";

afterEach(cleanup);

describe("GenreItem component", () => {
  it("renders checkbox with correct label", () => {
    const label = "Label Name";

    render(<GenreItem name={label} />);

    expect(screen.getByText(label)).toBeInTheDocument();
  });

  it("calls a function when checked", () => {
    const onSelect = jest.fn();

    const { getByTestId } = render(<GenreItem onSelect={onSelect} />);

    fireEvent.click(getByTestId("checkbox"));

    expect(onSelect).toBeCalled();
  });

  it("matches a snapshot", () => {
  const { asFragment } = render(<GenreItem />);
  expect(asFragment(<GenreItem />)).toMatchSnapshot();
  });
});
