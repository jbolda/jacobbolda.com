import Heading from "./heading.jsx";
import Text from "./text.jsx";
import List from "./list.jsx";
import Link from "./link.jsx";

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
  pre: ({ children, className, ...rest }) => (
    <pre className={className + " w-full grid justify-items-center"} {...rest}>
      {children}
    </pre>
  ),
  code: ({ children }) => (
    <code className="py-3 px-2 w-full md:w-3/4 lg:w-2/3 xl:w-1/2">
      {children}
    </code>
  ),
};

export { components };
export default components;
