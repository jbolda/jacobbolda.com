import { Helmet } from "react-helmet";

import Unfurl from "./unfurl.jsx";

export default function PageWrapper(props) {
  const title = `Jacob Bolda${
    props?.children?.props?.title ? ` | ${props.children.props.title}` : ""
  }`;

  return (
    <div className="flex flex-col min-h-screen bg-primary-50 dark:bg-primary-900">
      <Helmet>
        <html lang="en" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta charSet="utf-8" />
        <title>{title}</title>
        <meta
          property="description"
          content="Senior Software Engineer creating and wielding open source to enable others with proper tools."
        />
        <meta property="og:type" content="website" />
      </Helmet>
      <Unfurl
        title={title}
        subtitle="Senior Software Engineer creating and wielding open source to enable others with proper tools."
        meta={props}
      />
      {props.children}
    </div>
  );
}
