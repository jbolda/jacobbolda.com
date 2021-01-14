import { h, Fragment } from "preact";
import { Helmet } from "react-helmet";
import { MDXProvider } from "@mdx-js/preact";

import Header from "./components/header.js";
import Footer from "./components/footer.js";

import ArticleWrapper from "./components/wrapperArticle.js";

const Heading = ({ as = "h1", children }) => {
  const Component = as;
  const weight = (c) => {
    switch (c) {
      case "h1":
        return "font-extrabold text-3xl mb-6 mt-2";
      case "h2":
        return "font-bold text-2xl mb-4";
      case "h3":
        return "font-semibold text-xl mb-2";
      default:
        return "font-medium text-lg mb-1";
    }
  };
  return (
    <Component class={`${weight(as)} text-gray-900 mx-auto`}>
      {children}
    </Component>
  );
};

const Text = ({ as = "p", children }) => {
  const Component = as;
  return (
    <Component
      class={`text-xl md:text-lg lg:text-base text-gray-500 mx-auto mb-1`}
    >
      {children}
    </Component>
  );
};

const components = {
  p: ({ children }) => <Text as="p">{children}</Text>,
  h1: (props) => <Heading as="h1" {...props} />,
  h2: (props) => <Heading as="h2" {...props} />,
  h3: (props) => <Heading as="h3" {...props} />,
  h4: (props) => <Heading as="h4" {...props} />,
  h5: (props) => <Heading as="h5" {...props} />,
  h6: (props) => <Heading as="h6" {...props} />,
  blockquote: ({ children }) => <blockquote>{children}</blockquote>,
  ul: ({ children }) => <ul>{children}</ul>,
  ol: ({ children }) => <ol>{children}</ol>,
  li: ({ children }) => <li>{children}</li>,
  table: ({ children }) => <table class="table-auto">{children}</table>,
  thead: ({ children }) => <thead>{children}</thead>,
  tbody: ({ children }) => <tbody>{children}</tbody>,
  tr: ({ children }) => <tr>{children}</tr>,
  th: ({ children }) => <th>{children}</th>,
  td: ({ children }) => <td>{children}</td>,
  inlineCode: ({ children }) => <span>{children}</span>,
  em: ({ children }) => <Text as="em">{children}</Text>,
  strong: ({ children }) => <Text as="strong">{children}</Text>,
  del: ({ children }) => <del>{children}</del>,
  hr: ({ children }) => <hr>{children}</hr>,
  a: ({ children }) => <a>{children}</a>,
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
    return <div class="bg-white">{children}</div>;
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
      if (mql.matches) {
        window.localStorage.setItem("nightwind-mode", "dark");
        return "dark";
      } else {
        ("light");
      }
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
