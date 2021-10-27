import React, { useContext } from "react";
import { Marker } from "react-simple-maps";
import CountriesContext from "../../store/countries-context";
import styles from "./Markers.module.css";

const Markers = React.memo(() => {
  // selectedCoordinates - [[x1, y1], [x2, y2]]
  const { selectedCountries, allCoordinates } = useContext(CountriesContext);

  const markers = selectedCountries.map((countryName) => {
    return (
      <Marker
        className={styles.marker}
        key={countryName}
        coordinates={allCoordinates.get[countryName]}
      >
        <circle r={6} stroke="#fff" strokeWidth={2} />

        <text textAnchor="middle" y="25">
          {countryName}
        </text>
      </Marker>
    );
  });

  return <>{markers}</>;
});

export default Markers;
