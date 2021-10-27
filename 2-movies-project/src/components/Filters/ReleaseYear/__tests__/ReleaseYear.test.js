import "@testing-library/jest-dom";
import { cleanup, fireEvent, render } from "@testing-library/react";
import ReleaseYear from "../ReleaseYear";

afterEach(cleanup);

describe("ReleaseYear component", () => {
  it("renders year value from props", () => {
    const year = "2019";

    const { getByTestId } = render(<ReleaseYear filteredYear={year} />);

    expect(getByTestId("year-select")).toHaveValue(year);
  });

  it("calls the year change function on change", () => {
    const yearChangeHandler = jest.fn();

    const { getByTestId } = render(
      <ReleaseYear setYearFilter={yearChangeHandler} />
    );

    fireEvent.change(getByTestId("year-select"));

    expect(yearChangeHandler).toBeCalled();
  });

  it("matches a snapshot", () => {
    const { asFragment } = render(<ReleaseYear />);
    expect(asFragment(<ReleaseYear />)).toMatchSnapshot();
  });
});
