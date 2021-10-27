import React, { useEffect, useMemo, useReducer, useState } from "react";
import CountriesContext from "./countries-context";
import * as CONSTANTS from "../utils/constants";
import sortingAlgorithm from "../utils/sorting-algorithm";

const defaultSelectedCountriesState = {
  /* countryName: [long, lat] */
};

const selectedCountriesReducer = (state, action) => {
  switch (action.type) {
    case CONSTANTS.ADD_COUNTRY:
      return { ...state, [action.countryName]: action.countryCoordinates };

    case CONSTANTS.REMOVE_COUNTRY:
      const filteredCountries = state;
      delete filteredCountries[action.countryName];
      return { ...filteredCountries };

    default:
      return defaultSelectedCountriesState;
  }
};

const CountriesProvider = (props) => {
  const [dragItem, setDragItem] = useState([]);
  const [allCoordinates, setAllCoordinates] = useState({});
  const [allFlags, setAllFlags] = useState({});
  const [sortedCoordinates, setSortedCoordinates] = useState([]);
  const [selectedCountries, dispatchSelectedCountries] = useReducer(
    selectedCountriesReducer,
    defaultSelectedCountriesState
  );

  useEffect(() => {
    const selectedCoutriesCoordinates = Object.values(selectedCountries);
    setSortedCoordinates(sortingAlgorithm(selectedCoutriesCoordinates));
  }, [selectedCountries]);

  const actions = useMemo(
    () => ({
      addCountry: (countryName) => {
        dispatchSelectedCountries({
          type: CONSTANTS.ADD_COUNTRY,
          countryName,
          countryCoordinates: allCoordinates[countryName],
        });
      },
      removeCountry: (countryName) => {
        dispatchSelectedCountries({
          type: CONSTANTS.REMOVE_COUNTRY,
          countryName,
        });
      },
    }),
    [allCoordinates]
  );

  const addSelectedCountryHandler = (countryName) => {
    actions.addCountry(countryName);
  };

  const removeSelectedCountryHandler = (countryName) => {
    actions.removeCountry(countryName);
  };

  const countriesContext = {
    selectedCountries: Object.keys(selectedCountries),
    addSelectedCountry: addSelectedCountryHandler,
    removeSelectedCountry: removeSelectedCountryHandler,
    sortedCoordinates: sortedCoordinates,

    dragItem: { set: setDragItem, get: dragItem },
    allCoordinates: { set: setAllCoordinates, get: allCoordinates },
    allFlags: { set: setAllFlags, get: allFlags },
  };

  return (
    <CountriesContext.Provider value={countriesContext}>
      {props.children}
    </CountriesContext.Provider>
  );
};

export default CountriesProvider;
