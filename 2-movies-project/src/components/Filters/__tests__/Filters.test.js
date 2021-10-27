import { cleanup, render } from "@testing-library/react";
import React from "react";
import Filters from "../Filters";

const filters = {
  page: 1,
  sorting: "popularity.desc",
  year: 2021,
  genres: [],
};
const allGenresList = [];

afterEach(cleanup);

describe("Filters components", () => {
  it("renders with content", () => {
    const { getByTestId } = render(
      <Filters filters={filters} allGenresList={allGenresList} />
    );

    expect(getByTestId("filters")).not.toBeNull();
  });

  it("matches a snapshot", () => {
    const { asFragment } = render(
      <Filters filters={filters} allGenresList={allGenresList} />
    );
    expect(asFragment(<Filters />)).toMatchSnapshot();
  });
});
