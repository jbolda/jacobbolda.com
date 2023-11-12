import { Helmet } from "react-helmet";

import Header from "./header.jsx";
import Footer from "./footer.jsx";
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
        {/* <DarkMode /> */}
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
      <Header client:load />
      {props.children}
      <Footer client:load />
    </div>
  );
}

const DarkMode = () => <script>{darkmodeInit}</script>;

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
