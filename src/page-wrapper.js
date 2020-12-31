import { h, Fragment } from "preact";
import { Helmet } from "react-helmet";
import { MDXProvider } from "@mdx-js/preact";

import Header from "./components/header.js";
import Footer from "./components/footer.js";

const components = {
  codeblock: (props) => (
    <div
      class="bg-gray-900"
      dangerouslySetInnerHTML={{ __html: props.children }}
    />
  ),
};
export default function PageWrapper(props) {
  return (
    <>
      <Header />
      <MDXProvider components={components}>
        <div>
          <Helmet>
            <link rel="stylesheet" href="/styles.css" />
          </Helmet>
          {props.children}
        </div>
      </MDXProvider>
      <Footer />
    </>
  );
}
