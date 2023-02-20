import { h, Fragment } from "preact";
import { Helmet } from "react-helmet";
import { ArticleSection, ArticleWrap } from "./articles.js";

export default (props) => (
  <>
    <Helmet>
      <meta
        property="description"
        content="These are all of my articles. Enjoy!"
      />
    </Helmet>
    <ArticleSection heading="Drafts">
      {props.drafts.map((article) => (
        <ArticleWrap article={article} />
      ))}
    </ArticleSection>
    <ArticleSection heading="Notes">
      {props.notes.map((article) => (
        <ArticleWrap article={article} />
      ))}
    </ArticleSection>
    <ArticleSection heading="Articles">
      {props.articles.map((article) => (
        <ArticleWrap article={article} />
      ))}
    </ArticleSection>
  </>
);
