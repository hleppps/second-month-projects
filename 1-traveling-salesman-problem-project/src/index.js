import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./index.css";
import CountriesProvider from "./store/CountriesProvider";

ReactDOM.render(
  <CountriesProvider>
    <App />
  </CountriesProvider>,
  document.getElementById("root")
);
