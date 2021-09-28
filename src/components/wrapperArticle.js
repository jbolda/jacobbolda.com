import { h } from "preact";
import { Helmet } from "react-helmet";
import Unfurl from "./unfurl.js";

export default (props) => (
  <div class="relative py-16 flex-grow">
    <Helmet>
      <title>{props.children.props.title}</title>
      <meta property="og:type" content="article" />
    </Helmet>
    <Unfurl
      title={props.children.props.title}
      subtitle={props.children.props.description}
    />
    <article class="mt-6 text-gray-500 grid grid-col-1 gap-y-3 justify-items-center">
      {props.children}
    </article>
  </div>
);
