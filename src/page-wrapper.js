import { h, Fragment } from "preact";
import { Helmet } from "react-helmet";
import { MDXProvider } from "@mdx-js/preact";

import Header from "./components/header.js";
import Footer from "./components/footer.js";
import Heading from "./components/heading.js";
import Text from "./components/text.js";
import List from "./components/list.js";

import ArticleWrapper from "./components/wrapperArticle.js";

const components = {
  p: ({ children }) => <Text as="p">{children}</Text>,
  h1: (props) => <Heading as="h1" {...props} />,
  h2: (props) => <Heading as="h2" {...props} />,
  h3: (props) => <Heading as="h3" {...props} />,
  h4: (props) => <Heading as="h4" {...props} />,
  h5: (props) => <Heading as="h5" {...props} />,
  h6: (props) => <Heading as="h6" {...props} />,
  blockquote: ({ children }) => <blockquote>{children}</blockquote>,
  ul: ({ children }) => <List as="ul">{children}</List>,
  ol: ({ children }) => <List as="ol">{children}</List>,
  li: ({ children }) => <List as="li">{children}</List>,
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
    <div class="bg-gray-900 w-full">
      <div
        class="mx-content"
        dangerouslySetInnerHTML={{ __html: props.children }}
      />
    </div>
  ),
};
export default function PageWrapper(props) {
  const title = `Jacob Bolda${
    props?.meta?.title ? `| ${props.meta.title}` : ""
  }`;
  return (
    <div class="flex flex-col min-h-screen bg-white">
      <Helmet>
        <html style="background-color: rgba(0, 0, 0);" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta charSet="utf-8" />
        <title>{title}</title>
        <script>{nightwindInit}</script>
        <link rel="stylesheet" href="/styles.css" />
      </Helmet>
      <Header />
      <MDXProvider components={components}>
        <ContentWrapper pageType={props.pageType}>
          {props.children}
        </ContentWrapper>
      </MDXProvider>
      <Footer />
    </div>
  );
}

const ContentWrapper = ({ children, pageType }) => {
  if (pageType === "article") {
    return <ArticleWrapper>{children}</ArticleWrapper>;
  } else {
    return <div class="flex-grow">{children}</div>;
  }
};

const nightwindInit = `
(function() {
  function getInitialColorMode() {
    const persistedColorPreference = window.localStorage.getItem('nightwind-mode');
    const hasPersistedPreference = typeof persistedColorPreference === 'string';
    if (hasPersistedPreference) {
      return persistedColorPreference;
    }
    const mql = window.matchMedia('(prefers-color-scheme: dark)');
    const hasMediaQueryPreference = typeof mql.matches === 'boolean';
    if (hasMediaQueryPreference) {
      if (mql.matches) {
        window.localStorage.setItem("nightwind-mode", "dark");
        return "dark";
      } else {
        window.localStorage.setItem("nightwind-mode", "light");
        return "light";
      }
    }
    return 'light';
  }
  getInitialColorMode() == 'light' ? document.documentElement.classList.remove('dark') : document.documentElement.classList.add('dark');
  document.documentElement.classList.add('nightwind');
})()
`;
