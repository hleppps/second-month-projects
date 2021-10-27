import { render, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import React from "react";
import Lines from "../Lines";
// import CountriesProvider from "../../../store/CountriesProvider";
// import CountriesContext from "../../../store/countries-context";

// const renderWithContext = (component) => {
//   return {
//     ...render(
//       <CountriesProvider value={CountriesContext}>
//         {component}
//       </CountriesProvider>
//     ),
//   };
// };

afterEach(cleanup);

it("matches a snapshot", () => {
  const { asFragment } = render(<Lines />);
  expect(asFragment(<Lines />)).toMatchSnapshot();
});
