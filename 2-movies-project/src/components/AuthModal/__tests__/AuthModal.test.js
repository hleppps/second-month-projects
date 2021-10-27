import { cleanup, fireEvent, render } from "@testing-library/react";
import AuthModal from "../AuthModal";

afterEach(cleanup);

describe("AuthModal component", () => {
  it("calls the authHandler function", () => {
    const authHandler = jest.fn();
    const modalIsShown = true;

    const { getByTestId } = render(
      <AuthModal
        authenticationHandler={authHandler}
        modalIsShown={modalIsShown}
      />,
      {}
    );

    fireEvent.submit(getByTestId("login-form"));
    expect(authHandler).toBeCalled();
  });
  
  it("matches a snapshot", () => {
    const { asFragment } = render(<AuthModal />);
    expect(asFragment(<AuthModal />)).toMatchSnapshot();
  });
});
