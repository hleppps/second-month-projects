import { useContext } from "react";
import CountriesContext from "../../store/countries-context";
import styles from "./CountriesListItem.module.css";

const CountriesListItem = (props) => {
  const { dragItem } = useContext(CountriesContext);

  const selectCountryHandler = () => {
    props.onSelectCountry(props.countryName);
  };

  const dragStartHandler = (event, item, list) => {
    dragItem.set({ country: item, type: list });
  };

  const dragEndHandler = () => {
    dragItem.set({});
  };

  return (
    <li
      data-testid="countryListItem"
      className={styles.listItem}
      onClick={selectCountryHandler}
      draggable={true}
      onDragStart={(event) =>
        dragStartHandler(event, props.countryName, props.listType)
      }
      onDragEnd={() => dragEndHandler()}
    >
      <p data-testid="countryName" className={styles.name}>
        {props.countryName}
      </p>
      <img
        data-testid="flag"
        className={styles.flag}
        src={props.flagUrl}
        alt={props.flagUrl}
        draggable={false}
      />
    </li>
  );
};

export default CountriesListItem;
