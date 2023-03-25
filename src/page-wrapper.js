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
import VideoWrapper from "./components/videoWrapper.js";

const ClickToSeek = ({ player, timing, children }) => {
  return (
    <button
      class="w-full"
      onClick={() => seekPlayerToTimestamp(player, timing)}
    >
      {children}
    </button>
  );
};

const seekPlayerToTimestamp = (player, timestamp) => {
  if (!player) return;
  console.log(player.props);
  console.log(player.getCurrentTime());
  console.log(player.getSecondsLoaded());
  console.log(player.getDuration());
  player.seekTo(timestamp);
};

const components = {
  p: ({ children }) => (
    <Text as="p" classAdd="px-2 w-full md:w-3/4 lg:w-2/3 xl:w-1/2">
      {children}
    </Text>
  ),
  h1: (props) => (
    <Heading
      as="h1"
      {...props}
      classAdd="px-2 w-full md:w-3/4 lg:w-2/3 xl:w-1/2"
    />
  ),
  h2: (props) => (
    <Heading
      as="h2"
      {...props}
      classAdd="px-2 w-full md:w-3/4 lg:w-2/3 xl:w-1/2"
    />
  ),
  h3: (props) => (
    <Heading
      as="h3"
      {...props}
      classAdd="px-2 w-full md:w-3/4 lg:w-2/3 xl:w-1/2"
    />
  ),
  h4: (props) => (
    <Heading
      as="h4"
      {...props}
      classAdd="px-2 w-full md:w-3/4 lg:w-2/3 xl:w-1/2"
    />
  ),
  h5: (props) => (
    <Heading
      as="h5"
      {...props}
      classAdd="px-2 w-full md:w-3/4 lg:w-2/3 xl:w-1/2"
    />
  ),
  h6: (props) => (
    <Heading
      as="h6"
      {...props}
      classAdd="px-2 w-full md:w-3/4 lg:w-2/3 xl:w-1/2"
    />
  ),
  blockquote: ({ children }) => (
    <blockquote class="max-w-prose">{children}</blockquote>
  ),
  ul: ({ children }) => (
    <List as="ul" classAdd="min-w-full">
      {children}
    </List>
  ),
  ol: ({ children }) => (
    <List as="ol" classAdd="min-w-full">
      {children}
    </List>
  ),
  li: ({ children }) => (
    <List as="li" classAdd="">
      {children}
    </List>
  ),
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
    <div class="bg-gray-900 dark:bg-gray-900 w-full mb-4 overflow-x-auto">
      <div class="grid justify-items-center">
        <div class="py-3 px-2 w-full md:w-3/4 lg:w-2/3 xl:w-1/2">
          <div {...props} />
        </div>
      </div>
    </div>
  ),
  ClickText: ({ text, children }) => (
    <Text classAdd="px-2 w-full md:w-3/4 lg:w-2/3 xl:w-1/2">{text}</Text>
  ),
  ClickToSeek,
};

export default function PageWrapper(props) {
  const title = `Jacob Bolda${
    props?.children?.props?.title ? ` | ${props.children.props.title}` : ""
  }`;
  props.children.props.components = components;

  return (
    <div class="flex flex-col min-h-screen bg-primary-50 dark:bg-primary-900">
      <Helmet>
        <html lang="en" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta charSet="utf-8" />
        <script>{darkmodeInit}</script>
        <title>{title}</title>
        <meta
          property="description"
          content="Senior Software Engineer creating and wielding open source to enable others with proper tools."
        />
        <meta property="og:type" content="website" />
        <link rel="stylesheet" href="/styles.css" />
        <script
          defer
          data-domain="jacobbolda.com"
          data-api="/feedback/api/event"
          src="/feedback/js/script.js"
        ></script>
      </Helmet>
      <Unfurl
        title={title}
        subtitle="Senior Software Engineer creating and wielding open source to enable others with proper tools."
        meta={props}
      />
      <Header />
      {/* <MDXProvider components={components}> */}
      <ContentWrapper pageType={props.pageType}>
        {props.children}
      </ContentWrapper>
      {/* </MDXProvider> */}
      <Footer />
    </div>
  );
}

const ContentWrapper = ({ children, pageType }) => {
  if (pageType === "article") {
    return <ArticleWrapper>{children}</ArticleWrapper>;
  } else if (pageType === "video") {
    return <VideoWrapper>{children}</VideoWrapper>;
  } else {
    return <div class="grow">{children}</div>;
  }
};

const darkmodeInit = `
(function() {
  function getInitialColorMode() {
    const persistedColorPreference = window.localStorage.getItem('theme');
    if (typeof persistedColorPreference === 'string') {
      return persistedColorPreference;
    }
    const mql = window.matchMedia('(prefers-color-scheme: dark)');
    if (typeof mql.matches === 'boolean') {
      if (mql.matches) {
        window.localStorage.setItem("theme", "dark");
        return "dark";
      } else {
        window.localStorage.setItem("theme", "light");
        return "light";
      }
    }
    return 'light';
  }
  getInitialColorMode() == 'light' ? document.documentElement.classList.remove('dark') : document.documentElement.classList.add('dark');
  document.documentElement.classList.add('dark');
})()
`;
