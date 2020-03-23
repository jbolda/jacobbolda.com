import React from "react";
import { Box } from "theme-ui";
import Nav from "@jbolda/gatsby-theme-layout";
import Breadcrumbs from "gatsby-theme-recipes/src/components/breadcrumbs";

export default ({ children, crumbs, location }) => (
  <Nav location={location}>
    <Box sx={{ px: 11 }}>
      <Breadcrumbs crumbs={crumbs} />
    </Box>
    <Box sx={{ p: 4 }}>{children}</Box>
  </Nav>
);
