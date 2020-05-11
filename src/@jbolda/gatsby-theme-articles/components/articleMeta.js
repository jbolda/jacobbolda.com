import React from "react";
import { Box, Text } from "theme-ui";

const ArticleMeta = ({ article }) =>
  !article.timeToRead ? null : (
    <Box
      sx={{
        textAlign: "right",
        width: ["95%", "85%", "50%"],
        padding: 3,
        variant: "jboldaGatsbyTheme.articles.article.content",
      }}
    >
      <Text as="p" sx={{ fontSize: 1, marginX: ["2.5%", "12.5%", "30%"] }}>
        {article.timeToRead} min read
      </Text>
    </Box>
  );

export default ArticleMeta;
