import React from "react";
import Highlight, { defaultProps } from "prism-react-renderer";
import prismTheme from "prism-react-renderer/themes/nightOwl";
import Pre from "../components/pre";
import { Flex, Box, Heading, Text, Link } from "theme-ui";

const mdxComponents = ({ heading, text }) => {
  const headings = ["h1", "h2", "h3", "h4", "h5", "h6"];
  const body = ["p", "span", "div", "ol"];

  return {
    ...headings.reduce(
      (components, h) => ({
        ...components,
        [h]: props => (
          <Box
            sx={{
              marginX: ["2.5%", "12.5%", "30%"],
              width: ["95%", "75%", "40%"]
            }}
          >
            <Heading
              as={h}
              {...props}
              sx={{
                marginBottom: 0,
                variant: heading
              }}
            />
          </Box>
        )
      }),
      {}
    ),
    ...body.reduce(
      (components, b) => ({
        ...components,
        [b]: props => (
          <Box
            sx={{
              marginX: ["2.5%", "12.5%", "30%"],
              width: ["95%", "75%", "40%"]
            }}
          >
            <Text
              as={b}
              {...props}
              sx={{
                padding: 2,
                variant: text
              }}
            />
          </Box>
        )
      }),
      {}
    )
  };
};

const headingTextStandards = {
  fontFamily: "heading",
  fontWeight: "heading",
  lineHeight: "heading"
};

const bodyTextStandards = {
  fontFamily: "body",
  fontWeight: "body",
  lineHeight: "body"
};

export default {
  initialColorModeName: "light",
  useCustomProperties: true, // true is default
  // ^ prevents FOUC aka flash of unstyled content
  useColorSchemeMediaQuery: true, // turns on dark mode if set in browser
  breakpoints: ["40em", "56em", "70em"],
  space: [0, 2, 4, 8, 12, 16, 20, 24, 28, 32, 36, 40],
  fonts: {
    body: "Proza Libre, system-ui, sans-serif",
    heading: "Cormorant Garamond, serif",
    monospace: "Menlo, monospace"
  },
  fontSizes: [12, 14, 16, 24, 32, 48, 64, 96, 128],
  fontWeights: {
    body: 400,
    heading: 700,
    bold: 700
  },
  lineHeights: {
    body: 1.98,
    heading: 1.47
  },
  colors: {
    text: "#000000",
    textAlwaysLight: "#F4F4F4",
    background: "#F4F4F4",
    primary: "#52777D",
    secondary: "#192C3B",
    muted: "#9EBBA9",
    terminal: "#192C3B",
    modes: {
      dark: {
        text: "#F3FBF1",
        textAlwaysLight: "#F3FBF1",
        background: "#192C3B",
        primary: "#52777D",
        secondary: "#9EBBA9",
        muted: "#000000",
        terminal: "#192C3B"
      }
    }
  },
  messages: {
    primary: {
      backgroundColor: "background",
      borderLeftColor: "secondary"
    }
  },
  jboldaGatsbyTheme: {
    layout: {
      heading: {
        ...headingTextStandards,
        color: "text"
      },
      text: {
        ...bodyTextStandards,
        color: "text"
      },
      link: {
        ...bodyTextStandards,
        color: "primary"
      },
      footer: {
        paddingY: 11
      }
    },
    homepage: {
      landing: {
        container: {
          paddingBottom: 11
        },
        heading: {
          ...headingTextStandards,
          color: "text"
        },
        text: {
          ...bodyTextStandards,
          color: "text"
        },
        link: {
          ...bodyTextStandards,
          color: "primary"
        }
      },
      about: {
        container: { paddingY: 11, backgroundColor: "primary" },
        heading: {
          ...headingTextStandards,
          color: "textAlwaysLight"
        },
        text: {
          ...bodyTextStandards,
          color: "textAlwaysLight"
        },
        link: {
          ...bodyTextStandards,
          color: "muted"
        }
      },
      engagements: {
        container: { paddingY: 11 },
        heading: {
          ...headingTextStandards,
          color: "text"
        },
        text: {
          ...bodyTextStandards,
          color: "text"
        },
        link: {
          ...bodyTextStandards,
          color: "primary"
        },
        components: {
          a: ({ children, href }) => (
            <Link
              href={href}
              sx={{ variant: "jboldaGatsbyTheme.homepage.engagements.link" }}
            >
              <Text
                sx={{ variant: "jboldaGatsbyTheme.homepage.engagements.text" }}
              >
                {children}
              </Text>
            </Link>
          )
        }
      },
      articles: {
        container: { paddingY: 11, backgroundColor: "primary" },
        heading: {
          ...headingTextStandards,
          color: "textAlwaysLight"
        },
        text: {
          ...bodyTextStandards,
          color: "textAlwaysLight"
        },
        link: {
          ...bodyTextStandards,
          color: "muted"
        }
      }
    },
    articles: {
      list: {
        heading: {
          ...headingTextStandards,
          color: "text"
        },
        text: {
          ...bodyTextStandards,
          color: "text"
        },
        link: {
          ...bodyTextStandards,
          color: "primary"
        }
      },
      article: {
        content: {
          width: ["100%", "100%", "100%"],
          padding: 0
        },
        footer: { width: ["95%", "75%", "40%"] },
        heading: {
          ...headingTextStandards,
          color: "text"
        },
        text: {
          ...bodyTextStandards,
          color: "text"
        },
        link: {
          ...bodyTextStandards,
          color: "primary"
        },
        components: {
          ...mdxComponents({
            heading: "jboldaGatsbyTheme.articles.article.heading",
            text: "jboldaGatsbyTheme.articles.article.text"
          }),
          pre: ({
            children,
            className = children.props ? children.props.className : ``
          }) => {
            const language = className
              ? className.replace(/language-/, "")
              : "none";

            return (
              <Highlight
                Prism={defaultProps.Prism}
                code={children.props.children}
                language={language}
                theme={prismTheme}
              >
                {({
                  className,
                  style,
                  tokens,
                  getLineProps,
                  getTokenProps
                }) => (
                  <Flex
                    sx={{
                      py: 4,
                      backgroundColor: "terminal",
                      width: ["100%", "100%", "100%"],
                      overflow: "auto hidden"
                    }}
                  >
                    <Pre
                      className={className}
                      sx={{
                        ...style,
                        backgroundColor: "inherit",
                        ...(tokens.reduce((lineChars, line) => {
                          return Math.max(
                            lineChars,
                            line.reduce(
                              (pieceChars, piece) =>
                                pieceChars + piece.content.length,
                              0
                            )
                          );
                        }, 0) > 100
                          ? {
                              paddingLeft: ["2.5%", "12.5%", "20%"],
                              width: ["95%", "75%", "60%"]
                            }
                          : {
                              paddingLeft: ["2.5%", "12.5%", "30%"],
                              width: ["95%", "75%", "40%"]
                            })
                      }}
                    >
                      {tokens.map((line, i) => (
                        <div {...getLineProps({ line, key: i })}>
                          {line.map((token, key) => (
                            <span {...getTokenProps({ token, key })} />
                          ))}
                        </div>
                      ))}
                    </Pre>
                  </Flex>
                )}
              </Highlight>
            );
          }
        }
      }
    }
  },
  text: {
    heading: {
      ...headingTextStandards,
      letterSpacing: "heading",
      my: 4
    },
    body: {
      ...bodyTextStandards,
      letterSpacing: "body"
    }
  },
  styles: {
    root: {
      ...bodyTextStandards
    },
    h1: {
      color: "text",
      ...headingTextStandards,
      fontSize: 5
    },
    h2: {
      color: "text",
      ...headingTextStandards,
      fontSize: 4
    },
    h3: {
      color: "text",
      ...headingTextStandards,
      fontSize: 3
    },
    h4: {
      color: "text",
      ...headingTextStandards,
      fontSize: 2
    },
    h5: {
      color: "text",
      ...headingTextStandards,
      fontSize: 1
    },
    h6: {
      color: "text",
      ...headingTextStandards,
      fontSize: 0
    },
    p: {
      color: "text",
      ...bodyTextStandards
    },
    span: {
      color: "text",
      ...bodyTextStandards
    },
    a: {
      color: "primary",
      ...bodyTextStandards
    },
    pre: {
      fontFamily: "monospace",
      overflowX: "auto",
      code: {
        color: "inherit"
      }
    },
    code: {
      fontFamily: "monospace",
      fontSize: "inherit"
    },
    table: {
      width: "100%",
      borderCollapse: "separate",
      borderSpacing: 0
    },
    th: {
      textAlign: "left",
      borderBottomStyle: "solid"
    },
    td: {
      textAlign: "left",
      borderBottomStyle: "solid"
    },
    img: {
      maxWidth: "100%"
    }
  }
};
