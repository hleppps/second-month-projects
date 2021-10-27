import { render, cleanup, fireEvent } from "@testing-library/react";
import AuthContext from "../../../store/auth-context";
import Header from "../Header";

const renderWithContext = (component, providerProps) => {
  return {
    ...render(
      <AuthContext.Provider value={providerProps}>
        {component}
      </AuthContext.Provider>
    ),
  };
};

afterEach(cleanup);

describe("Header component", () => {
  it("shows the modal", () => {
    const onShowModal = jest.fn();
    const isLoggedIn = false;

    const { getByTestId } = renderWithContext(
      <Header onShowModal={onShowModal} />,
      { isLoggedIn }
    );

    fireEvent.click(getByTestId("login-button"));
    expect(onShowModal).toBeCalled();
  });

  it("calls the logout function", () => {
    const logout = jest.fn();
    const isLoggedIn = true;

    const { getByTestId } = renderWithContext(<Header />, {
      isLoggedIn,
      logout,
    });

    fireEvent.click(getByTestId("logout-button"));
    expect(logout).toBeCalled();
  });

  it("matches a snapshot", () => {
    const { asFragment } = render(<Header />);
    expect(asFragment(<Header />)).toMatchSnapshot();
  });
});
