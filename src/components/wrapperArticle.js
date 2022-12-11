import { h } from "preact";
import { Helmet } from "react-helmet";
import Unfurl from "./unfurl.js";
import { SeedSVG } from "./small-icons/index.js";

export default (props) => (
  <div class="relative py-16 grow">
    <Helmet>
      <title>{props.children.props.title}</title>
      <meta property="og:type" content="article" />
    </Helmet>
    <Unfurl
      title={props.children.props.title}
      subtitle={props.children.props.description}
    />
    {props?.children?.props?.progress &&
    props.children.props.progress !== "article" ? (
      <div className="flex justify-center">
        <div className="flex-none">
          <div
            className="justify-items-end items-center rounded-full bg-primary-50 p-1 w-12"
            alt="Icon indicating that this content will continue to grow"
          >
            <SeedSVG className="w-10" />
          </div>
        </div>
        <p className="flex-none self-center px-2 text-xl md:text-lg lg:text-base text-primary-900 dark:text-primary-50 px-2">
          This content is in progress and is expected to continue to evolve.
        </p>
      </div>
    ) : null}
    <article class="mt-6 text-gray-500 grid grid-col-1 gap-y-3 justify-items-center">
      {props.children}
    </article>
  </div>
);
