import { h } from "preact";
import { Helmet } from "react-helmet";
import Unfurl from "./unfurl.js";
import { SeedSVG } from "./small-icons/index.js";

export default (props) => (
  <div class="relative py-16 grow">
    <Helmet>
      <title>Jacob Bolda | {props.children.props.title}</title>
      <meta property="og:type" content="article" />
    </Helmet>
    <Unfurl
      title={props.children.props.title}
      subtitle={props.children.props.description}
    />
    {props?.children?.props?.progress &&
    props.children.props.progress !== "article" ? (
      <div className="max-w-prose mx-auto flex justify-center">
        <Seed />
      </div>
    ) : null}
    <article class="mt-6 text-gray-500 grid grid-col-1 gap-y-3 justify-items-center">
      {props.children}
    </article>
  </div>
);

const Seed = () => (
  <div className="rounded-md bg-primary-50 p-4">
    <div className="flex">
      <div className="flex-shrink-0">
        <SeedSVG className="w-10" aria-hidden="true" />
      </div>
      <div className="ml-3 flex-1 md:flex md:justify-between">
        <p className="text-sm text-primary-700 self-center">
          This content is in progress and is expected to continue to evolve.
        </p>
      </div>
    </div>
  </div>
);
