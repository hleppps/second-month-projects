import { render, cleanup } from "@testing-library/react";
import React from "react";
import Card from "../Card";

afterEach(cleanup);

it("matches a snapshot", () => {
  const { asFragment } = render(<Card />);
  expect(asFragment(<Card />)).toMatchSnapshot();
});
