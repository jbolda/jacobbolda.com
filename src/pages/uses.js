import { h } from "preact";
import { Helmet } from "react-helmet";
import Heading from "./../components/heading.js";
import Text from "./../components/text.js";
import Link from "./../components/link.js";

export default (props) => (
  <UsesSection>
    <Helmet>
      <title>Uses</title>
      <meta
        property="description"
        content="These are all the things that I use. Cheers!"
      />
    </Helmet>
    {props.uses.map((thing) => (
      <UseWrap thing={thing} />
    ))}
  </UsesSection>
);

export const UsesSection = ({ heading = "Uses", children }) => (
  <div class="pt-16 pb-20 px-4 sm:px-6 lg:pt-24 lg:pb-28 lg:px-8">
    <div class="relative max-w-lg mx-auto divide-y-2 divide-gray-200 lg:max-w-7xl">
      <div>
        <h2 class="text-3xl tracking-tight font-extrabold text-primary-900 sm:text-4xl">
          {heading}
        </h2>
      </div>
      <div class="mt-6 pt-10 grid gap-16 lg:grid-cols-2 lg:gap-x-5 lg:gap-y-12">
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
    <Link href={thing.url} flair="none">
      <Heading as="h3">{thing.title}</Heading>
      {!thing.subtitle ? null : <Text>{thing.subtitle}</Text>}
      <Text>{thing.description}</Text>
    </Link>
    <div class="mt-3">
      <Link href={thing.url}>Check it out!</Link>
    </div>
  </div>
);
