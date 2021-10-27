import React from "react";
import Header from "../Header";
import styles from "./Layout.module.css"

const Layout = React.memo((props) => {
  return (
    <div className={styles.layout}>
      <Header changeThemeHandler={props.changeThemeHandler} />
      <main className={styles.main}>{props.children}</main>
    </div>
  );
});

export default Layout;
