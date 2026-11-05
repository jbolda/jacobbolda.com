import Heading from "./heading.jsx";
import Text from "./text.jsx";
import List from "./list.jsx";
import Link from "./link.jsx";
import styles from "./mdxComponents.module.css";

const isMissingTitle = (children) =>
  !children ||
  (typeof children === "string" && children.trim() === "{props.title}");

const components = {
  p: ({ children }) => (
    <Text as="p" className={styles.mdxContent}>
      {children}
    </Text>
  ),
  h1: ({ children, ...props }) =>
    isMissingTitle(children) ? null : (
      <Heading as="h1" {...props} className={styles.mdxContent}>
        {children}
      </Heading>
    ),
  h2: (props) => <Heading as="h2" {...props} className={styles.mdxContent} />,
  h3: (props) => <Heading as="h3" {...props} className={styles.mdxContent} />,
  h4: (props) => <Heading as="h4" {...props} className={styles.mdxContent} />,
  h5: (props) => <Heading as="h5" {...props} className={styles.mdxContent} />,
  h6: (props) => <Heading as="h6" {...props} className={styles.mdxContent} />,
  blockquote: ({ children }) => (
    <blockquote className={styles.blockquote}>{children}</blockquote>
  ),
  ul: ({ children }) => (
    <List as="ul" className={styles.listFull}>
      {children}
    </List>
  ),
  ol: ({ children }) => (
    <List as="ol" className={styles.listFull}>
      {children}
    </List>
  ),
  li: ({ children }) => <List as="li">{children}</List>,
  table: ({ children }) => <table className={styles.table}>{children}</table>,
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
  pre: ({ children, className, ...rest }) => (
    <pre
      className={[styles.pre, className].filter(Boolean).join(" ")}
      {...rest}
    >
      {children}
    </pre>
  ),
  code: ({ children }) => <code className={styles.code}>{children}</code>,
};

export { components };
export default components;
