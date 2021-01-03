import { h, Fragment } from "preact";
import { Helmet } from "react-helmet";
import { MDXProvider } from "@mdx-js/preact";

import Header from "./components/header.js";
import Footer from "./components/footer.js";

import ArticleWrapper from "./components/wrapperArticle.js";

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
      <Helmet>
        <link rel="stylesheet" href="/styles.css" />
      </Helmet>
      <Header />
      <MDXProvider components={components}>
        <ContentWrapper pageType={props.pageType}>
          {props.children}
        </ContentWrapper>
      </MDXProvider>
      <Footer />
    </>
  );
}

const ContentWrapper = ({ children, pageType }) => {
  if (pageType === "article") {
    return <ArticleWrapper>{children}</ArticleWrapper>;
  } else {
    return <div>{children}</div>;
  }
};
