import React from "react";
import Link from "gatsby-link";
import "./style.css";

class SiteNav extends React.Component {
  render() {
    const { location } = this.props
    return (
      <nav className="">
        <ul>
          <li>
            <Link
              to="/"
              className={location.pathname === `/` ? `is-active` : null}
            >
              {` `}Articles
            </Link>
          </li>
          <li>
            <Link
              to="/about/"
              className={location.pathname === `/about/` ? `is-active` : null}
            >
              {` `}About
            </Link>
          </li>
          <li>
            <Link
              to="/contact/"
              className={location.pathname === `/contact/` ? `is-active` : null}
            >
              {` `}Contact
            </Link>
          </li>
        </ul>
      </nav>
    )
  }
}

export default SiteNav;
