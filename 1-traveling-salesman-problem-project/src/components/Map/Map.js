import React from "react";
import { ComposableMap, Geographies } from "react-simple-maps";
import Lines from "../Lines";
import Markers from "../Markers";
import styles from "./Map.module.css";

const Map = React.memo((props) => {
  return (
    <ComposableMap
      className={styles.map}
      projectionConfig={{
        center: [9, 49],
        scale: 1100,
      }}
    >
      <Geographies data-testid="geographies" geography={props.geoUrl}>
        {props.countriesDrawHandler}
      </Geographies>
      <Lines />
      <Markers />
    </ComposableMap>
  );
});

export default Map;
