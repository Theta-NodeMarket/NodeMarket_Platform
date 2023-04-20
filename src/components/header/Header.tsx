import React from "react";
import styles from "./header.module.scss";
import Image from "next/image";
import Link from "next/link";
import logo from "../../assets/nodemarket.svg";
import theta from "../../assets/theta.svg";

export function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <Link href="/">
          <Image src={logo} alt="NodeMarket Logo" />
        </Link>
      </div>

      <nav className={styles.links}>
        <ul>
          <li className={styles.link}>
            <Link href="">Sign In</Link>
          </li>
          <li className={styles.link}>
            <Link href="/learnmore">Learn More</Link>
          </li>
          <li className={styles.link}>
            <Link href="/about">About Us</Link>
          </li>
        </ul>
      </nav>

      <Link href="https://www.thetatoken.org/" className={styles.theta}>
        <span>Powered by</span>
        <Image src={theta} alt="Powered by Theta" />
      </Link>
    </header>
  );
}
