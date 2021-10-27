import { useContext } from "react";
import CountriesContext from "../../store/countries-context";
import * as CONSTANTS from "../../utils/constants";
import CountriesListItem from "../CountriesListItem";
import LoadingSpinner from "../LoadingSpinner";
import styles from "./CountriesList.module.css";

const CountriesList = (props) => {
  const {
    selectedCountries,
    addSelectedCountry,
    removeSelectedCountry,
    allFlags,
    dragItem,
  } = useContext(CountriesContext);
  const flags = allFlags.get;
  const isLoading = !Object.keys(flags).length;

  let highlightedBorder = props.highlighted
    ? { border: CONSTANTS.HIGHLIGHTED_LIST_BORDER }
    : null;

  const selectCountryHandler = (countryName, listType = props.listType) => {
    if (listType === CONSTANTS.LIST_TYPE_ADD && selectedCountries.length < 8) {
      addSelectedCountry(countryName);
    } else if (listType === CONSTANTS.LIST_TYPE_REMOVE) {
      removeSelectedCountry(countryName);
    }
  };

  const dropListHandler = () => {
    dragItem.set({});
    if (dragItem.get.type !== props.listType) {
      selectCountryHandler(dragItem.get.country, dragItem.get.type);
    }
  };

  const listItems = props.countries
    .filter((country) => {
      if (props.listType === CONSTANTS.LIST_TYPE_ADD) {
        return !selectedCountries.includes(country);
      } else {
        return country;
      }
    })
    .map((country) => {
      return (
        <CountriesListItem
          data-testid="countriesList"
          key={country}
          flagUrl={flags[country]}
          countryName={country}
          listType={props.listType}
          onSelectCountry={selectCountryHandler}
        />
      );
    });

  return (
    <>
      <h2 className={styles.title}>{props.title}</h2>
      <p className={styles.subtitle}>{props.subtitle}</p>
      <ul
        data-testid="countriesList"
        style={highlightedBorder}
        className={styles.list}
        onDragOver={(event) => {
          event.preventDefault();
        }}
        onDrop={() => dropListHandler()}
      >
        {isLoading && props.listType === CONSTANTS.LIST_TYPE_ADD && (
          <>
            <LoadingSpinner />
            <h3>Loading...</h3>
          </>
        )}
        {!isLoading && listItems}
      </ul>
    </>
  );
};

export default CountriesList;
