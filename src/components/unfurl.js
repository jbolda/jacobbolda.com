import { h } from "preact";
import { Helmet } from "react-helmet";

// https://cards.microlink.io/editor?preset=chrisbiscardi&p=2gThPD4KICA8RmxleAogICAgc3g9e3sKICAgICAgcG9zaXRpb246ICdyZWxhdGl2ZScsCiAgICAgIGJhY2tncm91bmQ6ICJsaW5lYXItZ3JhZGllbnQoIzUyNzc3ZCwgIzE5MmMzYikiLAogICAgICBjb2xvcjogJ3doaXRlJwogICAgfX0KICA-CiAgICA8RmxleAogICAgICBzeD17ewogICAgICAgIGJvcmRlcjogJzVweCBzb2xpZCcsCiAgICAgICAgcG9zaXRpb246ICdyZWxhdGl2ZScsCiAgICAgICAgd2lkdGg6ICcxMDAlJywKICAgICAgICBvdmVyZmxvdzogJ2hpZGRlbicsCiAgICAgIH19CiAgICA-CiAgICAgIDxGbGV4CiAgICAgICAgc3g9e3sKICAgICAgICAgIHdpZHRoOiAnNTAlJywKICAgICAgICAgIGZsZXhEaXJlY3Rpb246ICdjb2x1bW4nLAogICAgICAgICAganVzdGlmeUNvbnRlbnQ6ICdzcGFjZS1hcm91bmQnLAogICAgICAgICAgcDogNSwKICAgICAgICAgIHByOiAwLAogICAgICAgIH19CiAgICAgID4KICAgICAgICA8TGluawogICAgICAgICAgaHJlZj0naHR0cHM6Ly9mb250cy5nb29nbGVhcGlzLmNvbS9jc3MyP2ZhbWlseT1JbnRlcjp3Z2h0QDQwMDs3MDAmZGlzcGxheT1ibG9jaycKICAgICAgICAgIHJlbD0nc3R5bGVzaGVldCcKICAgICAgICAvPgogICAgICAgIDxUZXh0CiAgICAgICAgICBzeD17ewogICAgICAgICAgICBsaW5lSGVpZ2h0OiAxLjI1LAogICAgICAgICAgICBmb250RmFtaWx5OiAnSW50ZXInLAogICAgICAgICAgICBmb250U2l6ZTogNSwKICAgICAgICAgICAgZm9udFdlaWdodDogNzAwLAogICAgICAgICAgfX0KICAgICAgICA-CiAgICAgICAgICB7cXVlcnkudGl0bGV9CiAgICAgICAgPC9UZXh0PgogICAgICAgIDxUZXh0CiAgICAgICAgICBzeD17ewogICAgICAgICAgICBsaW5lSGVpZ2h0OiAxLjUsCiAgICAgICAgICAgIGZvbnRGYW1pbHk6ICdJbnRlcicsCiAgICAgICAgICAgIGZvbnRTaXplOiAzLAogICAgICAgICAgICBmb250V2VpZ2h0OiA0MDAsCiAgICAgICAgICB9fQogICAgICAgID4KICAgICAgICAgIHtxdWVyeS5zdWJ0aXRsZX0KICAgICAgICA8L1RleHQ-CiAgICAgIDwvRmxleD4KICAgICAgPEJveAogICAgICAgIHN4PXt7CiAgICAgICAgICB3aWR0aDogYGNhbGMoNTAlKWAsCiAgICAgICAgICBiYWNrZ3JvdW5kSW1hZ2U6IGB1cmwoaHR0cHM6Ly93d3cuamFjb2Jib2xkYS5jb20vYXZhdGFyLnBuZylgLAogICAgICAgICAgYmFja2dyb3VuZFNpemU6ICdjb3ZlcicsCiAgICAgICAgfX0KICAgICAgLz4KICAgIDwvRmxleD4KICA8L0ZsZXg-CjwvPg
const cardPreset = "chrisbiscardi";
const card =
  "2gThPD4KICA8RmxleAogICAgc3g9e3sKICAgICAgcG9zaXRpb246ICdyZWxhdGl2ZScsCiAgICAgIGJhY2tncm91bmQ6ICJsaW5lYXItZ3JhZGllbnQoIzUyNzc3ZCwgIzE5MmMzYikiLAogICAgICBjb2xvcjogJ3doaXRlJwogICAgfX0KICA-CiAgICA8RmxleAogICAgICBzeD17ewogICAgICAgIGJvcmRlcjogJzVweCBzb2xpZCcsCiAgICAgICAgcG9zaXRpb246ICdyZWxhdGl2ZScsCiAgICAgICAgd2lkdGg6ICcxMDAlJywKICAgICAgICBvdmVyZmxvdzogJ2hpZGRlbicsCiAgICAgIH19CiAgICA-CiAgICAgIDxGbGV4CiAgICAgICAgc3g9e3sKICAgICAgICAgIHdpZHRoOiAnNTAlJywKICAgICAgICAgIGZsZXhEaXJlY3Rpb246ICdjb2x1bW4nLAogICAgICAgICAganVzdGlmeUNvbnRlbnQ6ICdzcGFjZS1hcm91bmQnLAogICAgICAgICAgcDogNSwKICAgICAgICAgIHByOiAwLAogICAgICAgIH19CiAgICAgID4KICAgICAgICA8TGluawogICAgICAgICAgaHJlZj0naHR0cHM6Ly9mb250cy5nb29nbGVhcGlzLmNvbS9jc3MyP2ZhbWlseT1JbnRlcjp3Z2h0QDQwMDs3MDAmZGlzcGxheT1ibG9jaycKICAgICAgICAgIHJlbD0nc3R5bGVzaGVldCcKICAgICAgICAvPgogICAgICAgIDxUZXh0CiAgICAgICAgICBzeD17ewogICAgICAgICAgICBsaW5lSGVpZ2h0OiAxLjI1LAogICAgICAgICAgICBmb250RmFtaWx5OiAnSW50ZXInLAogICAgICAgICAgICBmb250U2l6ZTogNSwKICAgICAgICAgICAgZm9udFdlaWdodDogNzAwLAogICAgICAgICAgfX0KICAgICAgICA-CiAgICAgICAgICB7cXVlcnkudGl0bGV9CiAgICAgICAgPC9UZXh0PgogICAgICAgIDxUZXh0CiAgICAgICAgICBzeD17ewogICAgICAgICAgICBsaW5lSGVpZ2h0OiAxLjUsCiAgICAgICAgICAgIGZvbnRGYW1pbHk6ICdJbnRlcicsCiAgICAgICAgICAgIGZvbnRTaXplOiAzLAogICAgICAgICAgICBmb250V2VpZ2h0OiA0MDAsCiAgICAgICAgICB9fQogICAgICAgID4KICAgICAgICAgIHtxdWVyeS5zdWJ0aXRsZX0KICAgICAgICA8L1RleHQ-CiAgICAgIDwvRmxleD4KICAgICAgPEJveAogICAgICAgIHN4PXt7CiAgICAgICAgICB3aWR0aDogYGNhbGMoNTAlKWAsCiAgICAgICAgICBiYWNrZ3JvdW5kSW1hZ2U6IGB1cmwoaHR0cHM6Ly93d3cuamFjb2Jib2xkYS5jb20vYXZhdGFyLnBuZylgLAogICAgICAgICAgYmFja2dyb3VuZFNpemU6ICdjb3ZlcicsCiAgICAgICAgfX0KICAgICAgLz4KICAgIDwvRmxleD4KICA8L0ZsZXg-CjwvPg";
const embedParams = ({ title, subtitle }) =>
  encodeURIComponent(
    `?preset=${cardPreset}&p=${card}&subtitle=${subtitle}&title=${title}`
  );

export default ({ title, subtitle }) => (
  <Helmet>
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content={title} />
    <meta name="og:title" content={title} />
    <meta
      name="image"
      content={`https://i.microlink.io/https://cards.microlink.io/${embedParams(
        { title, subtitle }
      )}`}
    />
    <meta
      itemprop="image"
      content={`https://i.microlink.io/https://cards.microlink.io/${embedParams(
        { title, subtitle }
      )}`}
    />
    <meta
      name="twitter:image"
      content={`https://i.microlink.io/https://cards.microlink.io/${embedParams(
        { title, subtitle }
      )}`}
    />
    <meta
      property="og:image"
      content={`https://i.microlink.io/https://cards.microlink.io/${embedParams(
        { title, subtitle }
      )}`}
    />
  </Helmet>
);

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
