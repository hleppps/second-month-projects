import { render, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom";
import LoadingSpinner from "../LoadingSpinner";

afterEach(cleanup);

it("matches a snapshot", () => {
  const { asFragment } = render(<LoadingSpinner />);
  expect(asFragment(<LoadingSpinner />)).toMatchSnapshot();
});
