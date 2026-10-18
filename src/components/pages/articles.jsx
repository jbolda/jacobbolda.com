import { Helmet } from "react-helmet";
import Heading from "~/components/common/heading.jsx";
import Text from "~/components/common/text.jsx";
import Link from "~/components/common/link.jsx";
import { SeedSVG } from "~/components/common/small-icons.jsx";
import styles from "./articles.module.css";
import sectionStyles from "~/styles/content-section.module.css";
import unstyledLinkStyles from "~/styles/unstyled-link.module.css";

export default (props) => (
  <ArticleSection>
    <Helmet>
      <meta
        property="description"
        content="These are all of my articles. Enjoy!"
      />
    </Helmet>
    {props.articles.map((article) => (
      <ArticleWrap key={article.slug} article={article} />
    ))}
  </ArticleSection>
);

export const ArticleSection = ({ heading = "Articles", children }) => (
  <div className={sectionStyles.section}>
    <div className={sectionStyles.inner}>
      <div>
        <h2 className={sectionStyles.title}>{heading}</h2>
      </div>
      <div className={sectionStyles.grid}>
        {children.length === 0 ? (
          <Text>{`There are no ${heading.toLowerCase()} currently.`}</Text>
        ) : (
          children
        )}
      </div>
    </div>
  </div>
);

export const ArticleWrap = ({ article }) => (
  <div>
    {!article?.keywords ? null : (
      <div>
        {article.keywords.map((keyword) => (
          <ArticleTag key={keyword} tag={keyword} />
        ))}
      </div>
    )}
    <Link
      href={`${article.slug}`}
      className={[styles.articleLink, unstyledLinkStyles.link].join(" ")}
    >
      <Heading as="h3">{article.title}</Heading>
      <Text>{article.description}</Text>
    </Link>
    <div className={styles.articleMeta}>
      <div>
        <Link href={`${article.slug}`}>Read full story</Link>
      </div>
      {article?.progress && article?.progress !== "article" ? (
        <div className={styles.seedBadge}>
          <SeedSVG />
        </div>
      ) : null}
    </div>
  </div>
);

const ArticleTag = ({ tag }) => (
  <Text as="span" className={styles.tag}>
    {tag}
  </Text>
);
