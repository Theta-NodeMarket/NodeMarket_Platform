import Layout from "@/components/layout/layout";
import React from "react";

import styles from "./about.module.scss";

export default function AboutPage() {
  return (
    <Layout>
      <section className={styles.learnMore}>
        <div className={styles.paragraph}>
          <h1 className={styles.heading}>About Us</h1>
          <p className={styles.paragraph}>
            NodeMarket was established as part of the Theta Network 2023
            Hackathon with the primary objective of utilizing the Theta Network
            to incentivize greater adoption of blockchain technology and disrupt
            the present state of online advertising. Our aim is to enhance
            accessibility to blockchain technology, thereby strengthening the
            Theta blockchain and providing advertisers the opportunity to
            execute their ad campaigns at a reduced cost.
          </p>
          <p className={styles.paragraph}>
            Another one of our primary goals is to promote a mutually beneficial
            relationship between advertisers and promoters. We strive to make
            Web3 more accessible while simultaneously ensuring that both
            categories of users reap the benefits.
          </p>
        </div>
      </section>
    </Layout>
  );
}
