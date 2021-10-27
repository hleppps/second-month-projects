import { useContext } from "react";
import { Button, Container, Navbar } from "react-bootstrap";
import AuthContext from "../../store/auth-context";

const Header = ({ onShowModal }) => {
  const { isLoggedIn, logout, userName } = useContext(AuthContext);

  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <Navbar.Brand className="user-select-none">Movies Project</Navbar.Brand>
        {!isLoggedIn && (
          <Button
            data-testid="login-button"
            variant="outline-light"
            onClick={onShowModal}
          >
            Login
          </Button>
        )}
        {isLoggedIn && (
          <Button
            data-testid="logout-button"
            variant="outline-light"
            onClick={() => {
              logout(false);
            }}
          >
            <span>Hello, </span>
            <span className="text-decoration-underline">{userName}</span>
            <span>!</span>
          </Button>
        )}
      </Container>
    </Navbar>
  );
};

export default Header;
