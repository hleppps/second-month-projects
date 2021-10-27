import * as CONSTANTS from "./constants";

async function fetchData(url) {
  const response = await fetch(url);
  const data = response.json();
  return data;
}

function reformatData(data, itemsToReformat) {
  // {name: [data]}
  const reformatedData = {};
  for (const countryInfo of data) {
    const countryName = countryInfo["name"];
    const reformatedItems = itemsToReformat.map((item) => countryInfo[item]);
    reformatedData[countryName] = reformatedItems;
  }
  return reformatedData;
}

export async function getAllCountries() {
  const data = await fetchData(`${CONSTANTS.FIREBASE_DOMAIN}/countries.json`);
  return data;
}

export async function getAllCoordinates() {
  const { data } = await fetchData(
    `${CONSTANTS.COUNTRIES_API_DOMAIN}/positions`
  );

  const itemsToReformat = ["long", "lat"];
  const reformatedData = reformatData(data, itemsToReformat);
  return reformatedData;
}

export async function getAllFlags() {
  const { data } = await fetchData(
    `${CONSTANTS.COUNTRIES_API_DOMAIN}/flag/images`
  );

  const itemsToReformat = ["flag"];
  const reformatedData = reformatData(data, itemsToReformat);
  return reformatedData;
}