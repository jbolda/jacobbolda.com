import React from "react";
import Link from "gatsby-link";
import {P5, P2} from "../../static/css/base.scss";

class SiteNav extends React.Component {
  render() {
    const { location } = this.props

    return (
      <nav className="navbar" role="navigation" aria-label="main navigation">
        <div className="navbar-brand">
          <Link
            to="/"
            className="navbar-item"
            style={location.pathname === '/' ? {backgroundColor: P5} : {}}
            >
            <span
              className="title"
              style={location.pathname === '/' ? {color: P2} : {color: P5}}
              >
              B
            </span>
          </Link>
          <Link
            to="/"
            className="navbar-item"
            style={location.pathname === '/' ? {backgroundColor: P5, color: P2} : {}}
            >
            Articles
          </Link>
          <Link
            to="/about/"
            className="navbar-item"
            style={location.pathname === '/about/' ? {backgroundColor: P5, color: P2} : {}}
            >
            About
          </Link>
          <Link
            to="/contact/"
            className="navbar-item"
            style={location.pathname === '/contact/' ? {backgroundColor: P5, color: P2} : {}}
            >
            Contact
          </Link>
        </div>
      </nav>
    )
  }
}

export default SiteNav;
