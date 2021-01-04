/* @jsx h */
import { h } from "preact";
import { MDXProvider } from "@mdx-js/preact";

export default (props) => (
  <MDXProvider>
    <ArticleSection>
      {props.articles.map((article) => (
        <ArticleWrap article={article} />
      ))}
    </ArticleSection>
  </MDXProvider>
);

const ArticleSection = ({ children }) => (
  <div class="bg-white pt-16 pb-20 px-4 sm:px-6 lg:pt-24 lg:pb-28 lg:px-8">
    <div class="relative max-w-lg mx-auto divide-y-2 divide-gray-200 lg:max-w-7xl">
      <div>
        <h2 class="text-3xl tracking-tight font-extrabold text-gray-900 sm:text-4xl">
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
    <a href={article.meta.slug} class="mt-2 block">
      <p class="text-xl font-semibold text-gray-900">{article.meta.title}</p>
      <p class="mt-3 text-base text-gray-500">{article.meta.description}</p>
    </a>
    <div class="mt-3">
      <a
        href={article.meta.slug}
        class="text-base font-semibold text-indigo-600 hover:text-indigo-500"
      >
        Read full story
      </a>
    </div>
  </div>
);

const ArticleTag = ({ tag }) => (
  <span class="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-pink-100 text-pink-800">
    {tag}
  </span>
);
