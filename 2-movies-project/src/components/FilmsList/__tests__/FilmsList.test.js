import { cleanup, render } from "@testing-library/react";
import React from "react";
import FilmsList from "../FilmsList";

afterEach(cleanup);

describe("FilmsList components", () => {
  it("renders with content", () => {
    const { getByTestId } = render(<FilmsList />);

    expect(getByTestId("films-list")).not.toBeNull();
  });

  it("matches a snapshot", () => {
    const { asFragment } = render(<FilmsList />);
    expect(asFragment(<FilmsList />)).toMatchSnapshot();
  });
});
