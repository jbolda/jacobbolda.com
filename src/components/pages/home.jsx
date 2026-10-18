import { Social } from "~/components/common/social.jsx";
import Engagements from "./home-engagements.jsx";
import Heading from "~/components/common/heading.jsx";
import Text from "~/components/common/text.jsx";
import Img from "~/components/common/img.jsx";
import { ArticleWrap } from "./articles.jsx";
import styles from "./home.module.css";
import sectionStyles from "~/styles/home-section.module.css";

export default (props) => {
  return (
    <>
      <Hero />
      <Social />
      <Articles textHeading="Curated" textSubheading="For the best consumption">
        {props.articlesCurated.map((article) => (
          <ArticleWrap key={article.slug} article={article} />
        ))}
      </Articles>
      <Articles textHeading="Recent" textSubheading="These are top of mind">
        {props.articlesRecent.map((article) => (
          <ArticleWrap key={article.slug} article={article} />
        ))}
      </Articles>
      <Engagements />
    </>
  );
};

const Hero = (props) => (
  <div className={styles.hero}>
    <div className={styles.heroImageWrap}>
      <Img
        className={styles.heroImage}
        src="/avatar.png"
        avif="./avatar.avif"
        alt="An image of Jacob Bolda trying to look decent."
      />
    </div>
    <div>
      <div className={styles.heroContentWrap}>
        <main className={styles.heroMain}>
          <div className={styles.heroTextWrap}>
            <Heading as="h3">Hi, I am</Heading>
            <Heading as="h1">Jacob Bolda</Heading>
            <Heading as="h2">Senior Software Engineer</Heading>
            <Text>
              Senior Software Engineer built on the foundation of a classically
              trained Structural Engineer. Masters degree in Structural
              Engineering from the Milwaukee School of Engineering and life long
              tech enthusiast. Expertise in nodejs and windows and avid open
              source-er.
            </Text>
          </div>
        </main>
      </div>
    </div>
  </div>
);

const Articles = ({ children, textHeading, textSubheading }) => (
  <div className={sectionStyles.section}>
    <div className={sectionStyles.inner}>
      <div className={sectionStyles.header}>
        <Heading as="h2">{textHeading}</Heading>
        <Text>{textSubheading}</Text>
      </div>
      <div className={sectionStyles.grid}>
        {children.map((child) => (
          <div key={child.key} className={styles.sectionCard}>
            {child}
          </div>
        ))}
      </div>
    </div>
  </div>
);
