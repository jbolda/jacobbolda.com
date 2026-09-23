import { Helmet } from "react-helmet";
import Unfurl from "./unfurl.jsx";
import styles from "./page-wrapper.module.css";

export default function PageWrapper(props) {
  const title = `Jacob Bolda${props.title ? ` | ${props.title}` : ""}`;

  return (
    <div className={styles.pageWrapper}>
      <Helmet>
        <html lang="en" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta charSet="utf-8" />
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
