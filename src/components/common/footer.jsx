import { useState, useEffect } from "react";
import { SocialSlim } from "./social.jsx";
import Link from "./link.jsx";
import styles from "./footer.module.css";

export default () => (
  <footer className={styles.footer}>
    <div className={styles.footerContainer}>
      <nav className={styles.footerNav} aria-label="Footer">
        <div className={styles.footerNavItem}>
          <Link href="/about" className={styles.footerLink}>
            About
          </Link>
        </div>

        <div className={styles.footerNavItem}>
          <Link href="/uses" className={styles.footerLink}>
            Uses
          </Link>
        </div>

        <div className={styles.footerNavItem}>
          <Link href="/articles" className={styles.footerLink}>
            Articles
          </Link>
        </div>

        <div className={styles.footerNavItem}>
          <Link href="/recipes" className={styles.footerLink}>
            Recipes
          </Link>
        </div>

        <div className={styles.footerNavItem}>
          <Toggle />
        </div>
      </nav>
      <SocialSlim className={styles.footerSocial} />
      <p className={styles.copyright}>
        &copy; Jacob Bolda. All rights reserved.
      </p>
    </div>
  </footer>
);

const Toggle = (props) => {
  const [colorMode, toggleColorMode] = useState("light");

  useEffect(() => {
    document.documentElement.classList.contains("dark")
      ? toggleColorMode("dark")
      : toggleColorMode("light");
  }, []);

  const toggleAction = () => {
    if (!document.documentElement.classList.contains("dark")) {
      document.documentElement.classList.add("dark");
      window.localStorage.setItem("theme", "dark");
      toggleColorMode("dark");
    } else {
      document.documentElement.classList.remove("dark");
      window.localStorage.setItem("theme", "light");
      toggleColorMode("light");
    }
  };

  return (
    <button
      type="button"
      aria-pressed="false"
      className={`${styles.toggle} ${
        colorMode === "light" ? styles.toggleLight : styles.toggleDark
      }`}
      onClick={() => toggleAction()}
    >
      <span className={styles.srOnly}>toggle dark mode</span>
      <span
        className={`${styles.toggleKnob} ${
          colorMode === "light" ? "" : styles.toggleKnobDark
        }`}
      >
        <span
          className={`${styles.toggleIcon} ${
            colorMode === "light"
              ? styles.toggleIconVisible
              : styles.toggleIconHidden
          }`}
          aria-hidden="true"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={styles.toggleIconSvg}
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
              clipRule="evenodd"
            />
          </svg>
        </span>
        <span
          className={`${styles.toggleIcon} ${
            colorMode === "light"
              ? styles.toggleIconHidden
              : styles.toggleIconVisible
          }`}
          aria-hidden="true"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={styles.toggleIconSvg}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="{2}"
              d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
            />
          </svg>
        </span>
      </span>
    </button>
  );
};
