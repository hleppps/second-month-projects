import { cleanup, render } from "@testing-library/react";
import React from "react";
import Map from "../Map";

afterEach(cleanup);

it("matches a snapshot", () => {
  const { asFragment } = render(<Map />);
  expect(asFragment(<Map />)).toMatchSnapshot();
});
