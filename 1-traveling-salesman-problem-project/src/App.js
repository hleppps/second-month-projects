import React, { useCallback, useContext, useEffect, useState } from "react";
import { Geography } from "react-simple-maps";
import Card from "./components/Card";
import CountriesList from "./components/CountriesList";
import Layout from "./components/Layout";
import Map from "./components/Map";
import CountriesContext from "./store/countries-context";
import { getAllCoordinates, getAllCountries, getAllFlags } from "./utils/api";
import * as CONSTANTS from "./utils/constants";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [theme, setTheme] = useState(CONSTANTS.THEME_DARK);
  const { allCoordinates, allFlags, selectedCountries, dragItem } =
    useContext(CountriesContext);

  const setAllCoordinates = allCoordinates.set;
  const setAllFlags = allFlags.set;

  const fetchData = useCallback(async () => {
    const countries = await getAllCountries();
    setCountries(countries);

    const coordinatesData = await getAllCoordinates();
    setAllCoordinates(coordinatesData);

    const flagsData = await getAllFlags();
    setAllFlags(flagsData);
  }, [setCountries, setAllCoordinates, setAllFlags]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    const properties = [
      `-primary-color`,
      `-secondary-color`,
      `-list-color`,
      `-list-border-color`,
      `-text-color`,
      `-text-border-color`,
      `-card-border-color`,
      `-marker-color`,
      `-line-color`,
    ];

    properties.forEach((property) => {
      const propertyValue = getComputedStyle(
        document.documentElement
      ).getPropertyValue(`--${theme + property}`);
      document.documentElement.style.setProperty(
        `--selected${property}`,
        propertyValue
      );
    });
  }, [theme]);

  const countriesDrawHandler = ({ geographies }) => {
    const filteredCountries = geographies.filter((country) => {
      return country.properties.REGION_UN === CONSTANTS.MAP_REGION;
    });

    const geographyComponentsArray = filteredCountries.map((country) => {
      return (
        <Geography
          key={country.rsmKey}
          geography={country}
          fill="#EAEAEC"
          stroke="#D6D6DA"
        />
      );
    });
    return geographyComponentsArray;
  };

  const changeThemeHandler = () => {
    setTheme((prevTheme) => {
      if (prevTheme === CONSTANTS.THEME_LIGHT) {
        return CONSTANTS.THEME_DARK;
      } else {
        return CONSTANTS.THEME_LIGHT;
      }
    });
  };


  return (
    <>
      <Layout changeThemeHandler={changeThemeHandler}>
        <Map
          countriesDrawHandler={countriesDrawHandler}
          geoUrl={CONSTANTS.GEO_DOMAIN}
        />
        <Card>
          <CountriesList
            listType={CONSTANTS.LIST_TYPE_ADD}
            countries={countries}
            title={CONSTANTS.TITLE_ALL_COUNTRIES}
            subtitle={CONSTANTS.SUBTITLE_ALL_COUNTRIES}
            highlighted={dragItem.get.type === CONSTANTS.LIST_TYPE_REMOVE}
          ></CountriesList>
          <CountriesList
            listType={CONSTANTS.LIST_TYPE_REMOVE}
            countries={selectedCountries}
            title={CONSTANTS.TITLE_SELECTED_COUNTRIES}
            subtitle={CONSTANTS.SUBTITLE_SELECTED_COUNTRIES}
            highlighted={dragItem.get.type === CONSTANTS.LIST_TYPE_ADD}
          ></CountriesList>
        </Card>
      </Layout>
    </>
  );
};

export default App;
