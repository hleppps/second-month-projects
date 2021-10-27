import "@testing-library/jest-dom";
import "@testing-library/jest-dom/extend-expect";
import {
  cleanup,
  fireEvent,
  render,
  screen,
} from "@testing-library/react";
import React from "react";
import CountriesContext from "../../../store/countries-context";
import CountriesList from "../CountriesList";

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

describe("CountriesList", () => {
  it("renders with correct values from props", () => {
    const countries = [];
    const title = "Title";
    const subtitle = "Subtitle";

    render(
      <CountriesList countries={countries} title={title} subtitle={subtitle} />
    );

    expect(screen.getByText(title)).toBeInTheDocument();
    expect(screen.getByText(subtitle)).toBeInTheDocument();
  });

  it("responses on drop", async () => {
    const onDropHandler = jest.fn();
    const countries = [];
    const providerProps = {
      dragItem: { set: onDropHandler, get: { type: "" } },
      allFlags: { get: [] },
    };

    const { getByTestId } = renderWithContext(
      <CountriesList countries={countries} />,
      providerProps
    );

    fireEvent.drop(getByTestId("countriesList"));

    expect(onDropHandler).toBeCalled();
  });
});
