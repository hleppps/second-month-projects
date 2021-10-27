import { render, cleanup } from "@testing-library/react";
import React from "react";
import Markers from "../Markers";

afterEach(cleanup)

it("matches a snapshot", () => {
  const { asFragment } = render(<Markers />);
  expect(asFragment(<Markers />)).toMatchSnapshot();
});
