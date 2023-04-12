import Link from 'next/link';
import React from 'react';

import styles from './landing.module.scss';

export default function Landing() {
  return (
    <section className={styles.landing}>
      <h1 className={styles.headline}>
        Looking to create a new revenue stream or share your brand
        with the world?
      </h1>
      <Link className={styles.cta} href="/">
        Let&apos;s get started!
      </Link>
    </section>
  );
}
