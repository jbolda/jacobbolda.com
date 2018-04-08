import React from "react";
import Link from "gatsby-link";
import styles from "../palette.json";

class SimpleTopNav extends React.Component {
  render() {
    return (
      <nav className="navbar is-fixed-top is-secondary" role="navigation" aria-label="main navigation">
        <div className="navbar-brand">
          <Link
            to="/"
            className="navbar-item"
            >
            <span
              className="title"
              style={{color: styles.colors.P5}}
              >
              Jacob Bolda
            </span>
          </Link>
        </div>
      </nav>
    )
  }
}

export default SimpleTopNav;
