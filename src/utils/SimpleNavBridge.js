import React from "react";
import SimpleNav from "gatsby-theme-bulma-layout/src/Simple/SimpleNav";

const SimpleNavBridge = props => (
  <SimpleNav {...props}>{props.children}</SimpleNav>
);

export default SimpleNavBridge;
