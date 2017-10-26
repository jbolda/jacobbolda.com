import React from "react";
import Link from "gatsby-link";

class SiteNav extends React.Component {
  render() {
    const { location } = this.props

    return (
      <nav className="navbar" role="navigation" aria-label="main navigation">
        <div className="navbar-brand">
          <Link
            to="/"
            className={`navbar-item ${location.pathname === '/' ? 'is-active' : `null`}`}
            >
            <span className={`title ${location.pathname === '/' ? 'is-active' : `copyright`}`}>
              B
            </span>
          </Link>
          <Link
            to="/"
            className={`navbar-item ${location.pathname === '/' ? 'is-active' : null}`}
            >
            Articles
          </Link>
          <Link
            to="/about/"
            className={`navbar-item ${location.pathname === '/about/' ? 'is-active' : null}`}
            >
            About
          </Link>
          <Link
            to="/contact/"
            className={`navbar-item ${location.pathname === '/contact/' ? 'is-active' : null}`}
            >
            Contact
          </Link>
        </div>
      </nav>
    )
  }
}

export default SiteNav;
