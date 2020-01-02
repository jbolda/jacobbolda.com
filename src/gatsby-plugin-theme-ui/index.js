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
  initialColorMode: "light",
  useCustomProperties: true, // true is default
  // ^ prevents FOUC aka flash of unstyled content
  useColorSchemeMediaQuery: true, // turns on dark mode if set in browser
  breakpoints: ["40em", "56em", "64em"],
  space: [0, 2, 4, 8, 12, 16, 20, 24, 28],
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
    background: "#F4F4F4",
    primary: "#52777D",
    secondary: "#192C3B",
    muted: "#9EBBA9",
    modes: {
      dark: {
        text: "#F3FBF1",
        background: "#192C3B",
        primary: "#52777D",
        secondary: "#9EBBA9",
        muted: "#000000"
      }
    }
  },
  jboldaGatsbyTheme: {
    homepage: {
      about: {
        container: {
          backgroundColor: "primary"
        },
        left: {
          /* add tokens here */
        },
        right: {
          /* add tokens here */
        },
        heading: {
          ...headingTextStandards,
          color: "#F3FBF1"
        },
        text: {
          ...bodyTextStandards,
          color: "#F3FBF1"
        },
        link: {
          ...bodyTextStandards,
          color: "muted"
        }
      },
      articles: {
        container: { backgroundColor: "primary" },
        each: {
          /* add tokens here */
        },
        heading: {
          ...headingTextStandards,
          color: "#F3FBF1"
        },
        text: {
          ...bodyTextStandards,
          color: "#F3FBF1"
        },
        link: {
          ...bodyTextStandards,
          color: "muted"
        }
      }
    }
  },
  text: {
    heading: {
      ...headingTextStandards,
      letterSpacing: "heading"
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
