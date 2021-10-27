import { render, cleanup, fireEvent } from "@testing-library/react";
import ResetFilters from "../ResetFilters";

afterEach(cleanup);

describe("ResetFilters component", () => {
  it("calls the year change function on change", () => {
    const resetfiltersHandler = jest.fn();

    const { getByTestId } = render(
      <ResetFilters resetFilters={resetfiltersHandler} />
    );

    fireEvent.click(getByTestId("reset-button"));

    expect(resetfiltersHandler).toBeCalled();
  });

  it("matches a snapshot", () => {
    const { asFragment } = render(<ResetFilters />);
    expect(asFragment(<ResetFilters />)).toMatchSnapshot();
  });
});
