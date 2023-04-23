import React, { PropsWithChildren } from "react";
import { Header } from "../header";
import styles from './layout.module.css'

export default function Layout({ children }: PropsWithChildren) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
      }}
    >
      <Header />
      <div className={styles.wrapper}>
        {children}
      </div>
    </div>
  );
}
