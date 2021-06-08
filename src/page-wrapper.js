import { h } from "preact";
import { Helmet } from "react-helmet";
import { MDXProvider } from "@mdx-js/preact";

import Header from "./components/header.js";
import Footer from "./components/footer.js";
import Heading from "./components/heading.js";
import Text from "./components/text.js";
import List from "./components/list.js";
import Link from "./components/link.js";
import Unfurl from "./components/unfurl.js";

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
  a: ({ children, ...rest }) => <Link {...rest}>{children}</Link>,
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
  const title = `Jacob Bolda${props?.title ? `| ${props.title}` : ""}`;

  return (
    <div class="flex flex-col min-h-screen bg-primary-50">
      <Helmet>
        <html lang="en" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta charSet="utf-8" />
        <script>{nightwindInit}</script>
        <title>{title}</title>
        <meta
          property="description"
          content="Senior Software Engineer creating and wielding open source to enable others with proper tools."
        />
        <meta property="og:type" content="website" />
        <link rel="stylesheet" href="/styles.css" />
      </Helmet>
      <Unfurl
        title={title}
        subtitle="Senior Software Engineer creating and wielding open source to enable others with proper tools."
        meta={props}
      />
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
    if (typeof persistedColorPreference === 'string') {
      return persistedColorPreference;
    }
    const mql = window.matchMedia('(prefers-color-scheme: dark)');
    if (typeof mql.matches === 'boolean') {
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
