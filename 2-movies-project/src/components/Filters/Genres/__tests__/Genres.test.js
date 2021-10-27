import { render, cleanup } from "@testing-library/react";
import Genres from "../Genres";

const allGenres = [{ id: 28, name: "Action" }];
const selectedGenresList = [];
const setGenresFilter = jest.fn();

afterEach(cleanup);

describe("Genres components", () => {
  it("renders with content", () => {
    const { getByTestId } = render(
      <Genres
        allGenresList={allGenres}
        selectedGenresList={selectedGenresList}
        setGenresFilter={setGenresFilter}
      />
    );

    expect(getByTestId("genres-list")).not.toBeNull();
  });

  it("matches a snapshot", () => {
    const { asFragment } = render(
      <Genres
        allGenresList={allGenres}
        selectedGenresList={selectedGenresList}
        setGenresFilter={setGenresFilter}
      />
    );
    expect(asFragment(<Genres />)).toMatchSnapshot();
  });
});