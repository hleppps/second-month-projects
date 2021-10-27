import "@testing-library/jest-dom";
import { cleanup, render } from "@testing-library/react";
import React from "react";
import Layout from "../Layout";

afterEach(cleanup);

it("matches a snapshot", () => {
  const { asFragment } = render(<Layout />);
  expect(asFragment(<Layout />)).toMatchSnapshot();
});