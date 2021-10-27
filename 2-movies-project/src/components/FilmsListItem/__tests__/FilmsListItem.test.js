import "@testing-library/jest-dom";
import { cleanup, render, fireEvent } from "@testing-library/react";
import AuthContext from "../../../store/auth-context";
import FilmsListItem from "../FilmsListItem";

const renderWithContext = (component, providerProps) => {
  return {
    ...render(
      <AuthContext.Provider value={providerProps}>
        {component}
      </AuthContext.Provider>
    ),
  };
};

afterEach(cleanup);

describe("FilmsListItems component", () => {
  it("renders with correct values from props", () => {
    const title = "Film Title";
    const rating = "7.8";
    const backdropPath = "/link.jpg";

    const { getByTestId, getByAltText } = render(
      <FilmsListItem
        title={title}
        rating={rating}
        backdropPath={backdropPath}
      />
    );

    expect(getByTestId("title")).toHaveTextContent(title);
    expect(getByTestId("subtitle")).toHaveTextContent(rating);
    getByAltText(backdropPath);
  });

  it("renders favorites when logged in", () => {
    const setFavoriteFilm = jest.fn();
    const isFavorite = false;
    const providerProps = {
      isLoggedIn: true,
    };

    const { getByTestId } = renderWithContext(
      <FilmsListItem
        setFavoriteFilm={setFavoriteFilm}
        isFavorite={isFavorite}
      />,
      providerProps
    );

    const favoriteIcon = getByTestId("favorite-icon");

    fireEvent.click(favoriteIcon);

    expect(setFavoriteFilm).toBeCalled();
  });

  it("matches a snapshot", () => {
    const { asFragment } = render(<FilmsListItem />);
    expect(asFragment(<FilmsListItem />)).toMatchSnapshot();
  });
});
