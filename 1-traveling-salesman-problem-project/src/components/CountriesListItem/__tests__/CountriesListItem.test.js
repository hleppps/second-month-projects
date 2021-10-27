import "@testing-library/jest-dom";
import "@testing-library/jest-dom/extend-expect";
import { cleanup, fireEvent, render } from "@testing-library/react";
import React from "react";
import CountriesContext from "../../../store/countries-context";
import CountriesListItem from "../CountriesListItem";

const renderWithContext = (component, providerProps) => {
  return {
    ...render(
      <CountriesContext.Provider value={providerProps}>
        {component}
      </CountriesContext.Provider>
    ),
  };
};

afterEach(cleanup);

describe("CountriesListItem", () => {
  it("renders with correct values from props", () => {
    const countryName = "Country";
    const flagUrl = "https://";

    const { getByTestId, getByAltText } = render(
      <CountriesListItem countryName={countryName} flagUrl={flagUrl} />
    );

    expect(getByTestId("countryName")).toHaveTextContent(countryName);
    getByAltText(flagUrl);
  });

  it("responds to click", () => {
    const onClickHandler = jest.fn();
    const { getByTestId } = render(
      <CountriesListItem onSelectCountry={onClickHandler} />
    );

    fireEvent.click(getByTestId("countryListItem"));

    expect(onClickHandler).toBeCalled();
  });

  it("responds to drag start", () => {
    const onDragHandler = jest.fn();
    const providerProps = {
      dragItem: { set: onDragHandler },
    };

    const { getByTestId } = renderWithContext(
      <CountriesListItem />,
      providerProps
    );

    fireEvent.dragStart(getByTestId("countryListItem"));
    expect(onDragHandler).toBeCalled();
  });

  it("matches a snapshot", () => {
    const { asFragment } = render(<CountriesListItem />);
    expect(asFragment(<CountriesListItem />)).toMatchSnapshot();
  });
});
