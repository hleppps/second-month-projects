import { render, cleanup, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import React from "react";
import Header from "../Header";

afterEach(cleanup);

it("changes theme", () => {
  const changeThemeHandler = jest.fn();
  const { getByTestId } = render(<Header changeThemeHandler={changeThemeHandler} />);

  fireEvent.click(getByTestId("button"));

  expect(changeThemeHandler).toBeCalled()
});

it("matches a snapshot", () => {
  const { asFragment } = render(<Header />);
  expect(asFragment(<Header />)).toMatchSnapshot();
});
