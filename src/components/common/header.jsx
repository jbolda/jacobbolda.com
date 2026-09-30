import { useState } from "react";
import Link from "./link.jsx";
import styles from "./header.module.css";

export default (props) => {
  const [hamburgerActive, setHamburgerMenu] = useState(false);
  const toggleHamburgerMenu = () => setHamburgerMenu(!hamburgerActive);

  return (
    <div className={styles.header}>
      <div className={styles.container}>
        <div className={styles.bar}>
          <div className={styles.logoWrap}>
            <Logo />
          </div>
          <div className={styles.menuBtn}>
            <OpenMenu toggle={toggleHamburgerMenu} />
          </div>

          <nav className={styles.desktopNav}>
            <Items />
          </nav>
        </div>
      </div>
      {!hamburgerActive ? null : (
        <div className={styles.mobileMenu}>
          <div className={styles.mobileMenuInner}>
            <div className={styles.mobileMenuHeader}>
              <div className={styles.mobileMenuHeaderRow}>
                <Logo />
                <div className={styles.mobileMenuClose}>
                  <CloseMenu toggle={toggleHamburgerMenu} />
                </div>
              </div>
              <nav className={styles.mobileMenuNav}>
                <Items />
              </nav>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const OpenMenu = ({ toggle }) => (
  <button type="button" className={styles.iconBtn} onClick={toggle}>
    <span className={styles.srOnly}>Open menu</span>
    <svg
      className={styles.icon}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M4 6h16M4 12h16M4 18h16"
      />
    </svg>
  </button>
);

const CloseMenu = ({ toggle }) => (
  <button type="button" className={styles.iconBtn} onClick={toggle}>
    <span className={styles.srOnly}>Close menu</span>
    <svg
      className={styles.icon}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M6 18L18 6M6 6l12 12"
      />
    </svg>
  </button>
);

const Logo = () => (
  <a href="/">
    <span className={styles.srOnly}>Jacob Bolda</span>
    <svg
      className={styles.logoIcon}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="{2}"
        d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
      />
    </svg>
  </a>
);

const Items = () => (
  <>
    <Link href="/about">About</Link>
    <Link href="/uses">Uses</Link>
    <Link href="/articles">Articles</Link>
    <Link href="/recipes">Recipes</Link>
  </>
);
