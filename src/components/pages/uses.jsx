import { Helmet } from "react-helmet";
import Heading from "~/components/common/heading.jsx";
import Text from "~/components/common/text.jsx";
import Link from "~/components/common/link.jsx";
import styles from "./uses.module.css";
import sectionStyles from "~/styles/content-section.module.css";
import unstyledLinkStyles from "~/styles/unstyled-link.module.css";

export default (props) => (
  <UsesSection>
    <Helmet>
      <meta
        property="description"
        content="These are all the things that I use. Cheers!"
      />
    </Helmet>
    {props.uses.map((thing) => (
      <UseWrap key={thing.title} thing={thing} />
    ))}
  </UsesSection>
);

export const UsesSection = ({ heading = "Uses", children }) => (
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

export const UseWrap = ({ thing }) => (
  <div>
    <Link href={thing.url} className={unstyledLinkStyles.link}>
      <Heading as="h3">{thing.title}</Heading>
      {!thing.subtitle ? null : <Text>{thing.subtitle}</Text>}
      <Text>{thing.description}</Text>
    </Link>
    <div className={styles.useCard}>
      <Link href={thing.url}>Check it out!</Link>
    </div>
  </div>
);
