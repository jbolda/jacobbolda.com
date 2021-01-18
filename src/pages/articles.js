/* @jsx h */
import { h } from "preact";
import Heading from "./../components/heading.js";
import Text from "./../components/text.js";
import Link from "./../components/link.js";

export default (props) => (
  <ArticleSection>
    {props.articles.map((article) => (
      <ArticleWrap article={article} />
    ))}
  </ArticleSection>
);

const ArticleSection = ({ children }) => (
  <div class="pt-16 pb-20 px-4 sm:px-6 lg:pt-24 lg:pb-28 lg:px-8">
    <div class="relative max-w-lg mx-auto divide-y-2 divide-gray-200 lg:max-w-7xl">
      <div>
        <h2 class="text-3xl tracking-tight font-extrabold text-primary-900 sm:text-4xl">
          Articles
        </h2>
      </div>
      <div class="mt-6 pt-10 grid gap-16 lg:grid-cols-2 lg:gap-x-5 lg:gap-y-12">
        {children}
      </div>
    </div>
  </div>
);

export const ArticleWrap = ({ article }) => (
  <div>
    <div>
      {!article.keywords
        ? null
        : article.keywords.map((keyword) => <ArticleTag tag={keyword} />)}
    </div>
    <Link href={`/${article.meta.slug}/`} flair="none">
      <Heading as="h3">{article.meta.title}</Heading>
      <Text>{article.meta.description}</Text>
    </Link>
    <div class="mt-3">
      <Link href={`/${article.meta.slug}/`}>Read full story</Link>
    </div>
  </div>
);

const ArticleTag = ({ tag }) => (
  <Text
    as="span"
    class="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-pink-100 text-pink-800"
  >
    {tag}
  </Text>
);
