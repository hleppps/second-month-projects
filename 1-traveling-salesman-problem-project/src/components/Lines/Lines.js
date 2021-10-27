import React, { useContext } from "react";
import { Line } from "react-simple-maps";
import CountriesContext from "../../store/countries-context";
import styles from "./Lines.module.css";

const Lines = () => {
  // sortedCoordinates - [[x1, y1], [x2, y2]]
  const { sortedCoordinates } = useContext(CountriesContext);

  const lines = sortedCoordinates.map((coordinatePair, index) => {
    return (
      <Line
        className={styles.line}
        key={index}
        from={coordinatePair[0]}
        to={coordinatePair[1]}
        stroke="#FF5533"
        strokeWidth={2}
        strokeLinecap="round"
      />
    );
  });

  return <>{lines}</>;
};

export default Lines;
