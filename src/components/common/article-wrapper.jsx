import { Helmet } from "react-helmet";
import Unfurl from "./unfurl.jsx";
import { SeedSVG } from "./small-icons.jsx";

export default (props) => (
  <div className="relative py-16 grow">
    <Helmet>
      <title>{`Jacob Bolda | ${props.title}`}</title>
      <meta property="og:type" content="article" />
    </Helmet>
    <Unfurl title={props.title} subtitle={props.description} />
    {props?.progress && props.progress !== "article" ? (
      <div className="max-w-prose mx-auto flex justify-center">
        <Seed />
      </div>
    ) : null}
    <article className="mt-6 text-gray-500 grid grid-col-1 gap-y-3 justify-items-center">
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
