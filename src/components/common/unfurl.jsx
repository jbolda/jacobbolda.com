import { Helmet } from "react-helmet";

const embedParams = ({ title, subtitle }) => encodeURIComponent(`${title}`);

export default ({ title, subtitle, meta }) => {
  const ogImage = `/social/${embedParams({ title, subtitle })}`;
  const fullURL =
    meta && meta.slug
      ? `https://www.jacobbolda.com/${meta.slug}`
      : "https://www.jacobbolda.com/";
  return (
    <Helmet>
      <meta name="image" content={ogImage} />

      <meta name="og:url" content={fullURL} />
      <meta name="og:title" content={title} />
      <meta name="og:description" content={subtitle} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="675" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" value={fullURL} />
      <meta name="twitter:site" content="@jacobbolda" />
      <meta name="twitter:creator" content="@jacobbolda" />
      <meta name="twitter:title" value={title} />
      <meta name="twitter:description" value={subtitle} />
      <meta name="twitter:image" content={ogImage} />
    </Helmet>
  );
};
