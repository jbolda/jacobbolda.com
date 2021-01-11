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
        <script dangerouslySetInnerHTML={{ __html: init() }} />
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

const init = () => {
  function getInitialColorMode() {
    try {
      if (!window || !document) return "light";
    } catch (e) {
      return "light";
    }
    const persistedColorPreference = window.localStorage.getItem(
      "nightwind-mode"
    );
    const hasPersistedPreference = typeof persistedColorPreference === "string";
    if (hasPersistedPreference) {
      return persistedColorPreference;
    }
    const mql = window.matchMedia("(prefers-color-scheme: dark)");
    const hasMediaQueryPreference = typeof mql.matches === "boolean";
    if (hasMediaQueryPreference) {
      return mql.matches ? "dark" : "light";
    }
    return "light";
  }
  try {
    getInitialColorMode() == "light"
      ? document.documentElement.classList.remove("dark")
      : document.documentElement.classList.add("dark");
    document.documentElement.classList.add("nightwind");
  } catch (e) {
    //noop
  }
};
