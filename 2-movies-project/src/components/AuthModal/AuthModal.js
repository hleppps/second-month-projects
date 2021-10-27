import { useRef, useState } from "react";
import { Button, Form, Modal, Spinner } from "react-bootstrap";
import styles from "./AuthModal.module.scss";

const AuthModal = (props) => {
  const [isFetching, setIsFetching] = useState(false);
  const [isError, setIsError] = useState(false);
  const loginInputRef = useRef();
  const passwordInputRef = useRef();

  const onSubmitHadler = async (event) => {
    event.preventDefault();
    setIsError(false);
    setIsFetching(true);

    await props.authenticationHandler(
      loginInputRef,
      passwordInputRef,
      setIsError,
      setIsFetching
    );
  };

  return (
    <>
      <Modal show={props.modalIsShown} onHide={props.onHideModal}>
        <Modal.Header closeButton>
          <Modal.Title>Authorization</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form data-testid="login-form" onSubmit={onSubmitHadler}>
            <Form.Group className="mb-3" controlId="formUsername">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                defaultValue="hlep"
                required
                ref={loginInputRef}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                defaultValue="121212"
                required
                ref={passwordInputRef}
              />
            </Form.Group>
            <Form.Group className={styles.footer}>
              {!isFetching && (
                <Button className="w-100" type="submit" variant="outline-dark">
                  Sign in
                </Button>
              )}
              {isFetching && <Spinner className="mx-10" animation="grow" />}
              {!isFetching && isError && (
                <p>Invalid username and/or password</p>
              )}
            </Form.Group>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default AuthModal;
