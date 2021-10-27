import "@testing-library/jest-dom";
import { cleanup, fireEvent, render } from "@testing-library/react";
import SortBy from "../SortBy";

afterEach(cleanup);

describe("SortBy component", () => {
  it("renders year value from props", () => {
    const sortingType = "vote_average.asc";

    const { getByTestId } = render(<SortBy filteredSorting={sortingType} />);

    expect(getByTestId("sort-select")).toHaveValue(sortingType);
  });

  it("calls the year change function on change", () => {
    const sortingChangeHandler = jest.fn();

    const { getByTestId } = render(
      <SortBy setSortingFilter={sortingChangeHandler} />
    );

    fireEvent.change(getByTestId("sort-select"));

    expect(sortingChangeHandler).toBeCalled();
  });

  it("matches a snapshot", () => {
    const { asFragment } = render(<SortBy />);
    expect(asFragment(<SortBy />)).toMatchSnapshot();
  });
});
