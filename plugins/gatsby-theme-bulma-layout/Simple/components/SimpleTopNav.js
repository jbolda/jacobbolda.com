import React from "react";
import PropTypes from "prop-types";
import { Link } from "gatsby";

const SimpleTopNav = ({ textColor }) => (
  <nav
    className="navbar is-fixed-top is-secondary"
    role="navigation"
    aria-label="main navigation"
  >
    <div className="navbar-brand">
      <Link to="/" className="navbar-item">
        <span className="title" style={{ color: textColor }}>
          Jacob Bolda
        </span>
      </Link>
    </div>
  </nav>
);

export default SimpleTopNav;

SimpleTopNav.propTypes = {
  textColor: PropTypes.string.isRequired
};
