import { render, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom";
import Layout from "../Layout";

afterEach(cleanup);

it("matches a snapshot", () => {
  const { asFragment } = render(<Layout />);
  expect(asFragment(<Layout />)).toMatchSnapshot();
});
