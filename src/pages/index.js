/* @jsx h */
import { h } from "preact";
import { MDXProvider } from "@mdx-js/preact";
import Landing from "./../../an-extra-boop-for-the-homepage/landing.js";
import About from "./../../an-extra-boop-for-the-homepage/about.js";

import STEMonFire from "./../../an-extra-boop-for-the-homepage/ste-mon-fire.js";
import AECC from "./../../an-extra-boop-for-the-homepage/aec-collective.js";
import Masters from "./../../an-extra-boop-for-the-homepage/masters-thesis.js";
import Prog from "./../../an-extra-boop-for-the-homepage/programming.js";
import EWB from "./../../an-extra-boop-for-the-homepage/ewb.js";
import MitchellLofts from "./../../an-extra-boop-for-the-homepage/mitchell-street-market-lofts.js";
import REU from "./../../an-extra-boop-for-the-homepage/reu.js";

export default (props) => (
  <MDXProvider>
    <div>
      <img src="/avatar.png" />
      <Landing />
    </div>
    <About />
    <div>
      <STEMonFire />
      <AECC />
      <Masters />
      <Prog />
      <EWB />
      <MitchellLofts />
      <REU />
    </div>
    <div>
      {props.articles.map((article) => (
        <p>
          <a href={article.meta.slug}>{article.meta.title}</a>
        </p>
      ))}
    </div>
  </MDXProvider>
);
