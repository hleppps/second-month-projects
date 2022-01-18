import styles from "./Header.module.css";

const Header = (props) => {
  return (
    <header className={styles.header}>
      <h1>TRAVELLING SALESMAN PROBLEM</h1>
      <button data-testid="button" className={styles.logo} onClick={props.changeThemeHandler}></button>
    </header>
  );
};

export default Header;
