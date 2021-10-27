import Header from "../Header";
import { Container } from "react-bootstrap";
import styles from "./Layout.module.scss";

const Layout = (props) => {
  return (
    <div className={styles.layout}>
      <Header onShowModal={props.onShowModal} isLoggedIn={props.isLoggedIn} setIsLoggedIn={props.setIsLoggedIn} />
      <main>
        <Container>{props.children}</Container>
      </main>
    </div>
  );
};

export default Layout;
