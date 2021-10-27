import { render, cleanup, fireEvent, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Pagination from "../Pagination";

afterEach(cleanup);

describe("Pagination component", () => {
  it("render page number from props", () => {
    const curPage = 1;
    const totalPages = 333;

    render(<Pagination filteredPage={curPage} totalPages={totalPages} />);

    const curPageOnScreen = screen.getByText(curPage, { exact: false });
    expect(curPageOnScreen).toBeInTheDocument();

    const totalPagesOnScreen = screen.getByText(totalPages, { exact: false });
    expect(totalPagesOnScreen).toBeInTheDocument();
  });

  it("calls the page change function on click", () => {
    const pageChangeHandler = jest.fn();

    const { getByTestId } = render(
      <Pagination setPageFilter={pageChangeHandler} />
    );

    fireEvent.click(getByTestId("decrease-button"));

    expect(pageChangeHandler).toBeCalled();

    fireEvent.click(getByTestId("increase-button"));

    expect(pageChangeHandler).toBeCalled();
  });

  it("matches a snapshot", () => {
    const { asFragment } = render(<Pagination />);
    expect(asFragment(<Pagination />)).toMatchSnapshot();
  });
});
