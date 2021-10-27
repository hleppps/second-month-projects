import React from "react";

const CountriesContext = React.createContext({
  selectedCountries: [],
  sortedCoordinates: [],
  addSelectedCountry: () => {},
  removeSelectedCountry: () => {},
  selectedCoordinates: {},
  dragItem: {},
  allFlags: { set: ()=>{}, get: []}
});

export default CountriesContext;
