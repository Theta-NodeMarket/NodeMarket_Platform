import {Button} from "@mui/material";
import React from "react";

import styles from "./landing.module.scss";

export default function Landing() {
  return (
    <section className={styles.landing}>
      <h1 className={styles.headline}>
        Looking to create a new revenue stream or share your brand with the
        world?
      </h1>
      <Button className={styles.cta} variant="contained" size="large" href="/sign-up">
        Let&apos;s get started!
      </Button>
    </section>
  );
}