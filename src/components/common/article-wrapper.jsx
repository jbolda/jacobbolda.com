import { Helmet } from "react-helmet";
import Unfurl from "./unfurl.jsx";
import { SeedSVG } from "./small-icons.jsx";
import Heading from "./heading.jsx";
import mdxStyles from "./mdxComponents.module.css";
import styles from "./article-wrapper.module.css";

export default (props) => (
  <div className={styles.articleWrap}>
    <Helmet>
      <meta property="og:type" content="article" />
    </Helmet>
    <Unfurl title={props.title} subtitle={props.description} />
    {props?.progress && props.progress !== "article" ? (
      <div className={styles.seedBanner}>
        <Seed />
      </div>
    ) : null}
    <article className={styles.articleGrid}>
      {props.showTitle ? (
        <Heading as="h1" className={mdxStyles.mdxContent}>
          {props.title}
        </Heading>
      ) : null}
      {props.children}
    </article>
  </div>
);

const Seed = () => (
  <div className={styles.seedCard}>
    <div className={styles.seedCardInner}>
      <div className={styles.seedIcon}>
        <SeedSVG aria-hidden="true" />
      </div>
      <div className={styles.seedText}>
        <p>
          This content is in progress and is expected to continue to evolve.
        </p>
      </div>
    </div>
  </div>
);
