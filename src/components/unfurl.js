import { h } from "preact";
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

/*
<>
  <Flex
    sx={{
      position: 'relative',
      background: "linear-gradient(#52777d, #192c3b)",
      color: 'white'
    }}
  >
    <Flex
      sx={{
        border: '5px solid',
        position: 'relative',
        width: '100%',
        overflow: 'hidden',
      }}
    >
      <Flex
        sx={{
          width: '50%',
          flexDirection: 'column',
          justifyContent: 'space-around',
          p: 5,
          pr: 0,
        }}
      >
        <Link
          href='https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=block'
          rel='stylesheet'
        />
        <Text
          sx={{
            lineHeight: 1.25,
            fontFamily: 'Inter',
            fontSize: 5,
            fontWeight: 700,
          }}
        >
          {query.title}
        </Text>
        <Text
          sx={{
            lineHeight: 1.5,
            fontFamily: 'Inter',
            fontSize: 3,
            fontWeight: 400,
          }}
        >
          {query.subtitle}
        </Text>
      </Flex>
      <Box
        sx={{
          width: `calc(50%)`,
          backgroundImage: `url(https://www.jacobbolda.com/avatar.png)`,
          backgroundSize: 'cover',
        }}
      />
    </Flex>
  </Flex>
</>

query:
{
"subtitle":"lesser boop the subtitle"
"title":"boop a title"
}
*/
