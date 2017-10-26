import React from "react";
import Link from "gatsby-link";
import Logo from "../../static/images/logo/Bolda-logo.png"

class SiteNav extends React.Component {
  render() {
    const { location } = this.props
    return (
      <nav className="navbar" role="navigation" aria-label="main navigation">
        <div className="navbar-brand">
          <Link
            to="/"
            className={`navbar-item ${location.pathname === '/' ? 'is-active' : null}`}
            >
            <img src={Logo} />
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
