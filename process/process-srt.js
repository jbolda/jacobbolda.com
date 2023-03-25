import visit from "unist-util-visit";
import webvttParser from "webvtt-parser";

const toVTT = (utf8str) =>
  utf8str
    .replace(/\{\\([ibu])\}/g, "</$1>")
    .replace(/\{\\([ibu])1\}/g, "<$1>")
    .replace(/\{([ibu])\}/g, "<$1>")
    .replace(/\{\/([ibu])\}/g, "</$1>")
    .replace(/(\d\d:\d\d:\d\d),(\d\d\d)/g, "$1.$2")
    .concat("\r\n\r\n");

const cueToComponent = (cue) => {
  return {
    type: "mdxJsxFlowElement",
    name: "ClickToSeek",
    attributes: [
      { type: "mdxJsxAttribute", name: "timing", value: cue.startTime },
    ],
    children: [
      {
        type: "mdxJsxFlowElement",
        name: "ClickText",
        attributes: [
          { type: "mdxJsxAttribute", name: "player", value: "player" },
          { type: "mdxJsxAttribute", name: "text", value: cue.text },
        ],
        // children: [
        //   {
        //     type: "paragraph",
        //     children: [{ type: "text", value: cue.text }],
        //   },
        // ],
      },
    ],
  };
};

export const subtitlePlugin = (srtText) => {
  try {
    const text = toVTT(srtText);

    const { WebVTTParser } = webvttParser;
    const parser = new WebVTTParser();
    const vttTree = parser.parse(text, "metadata");

    return vttTree.cues.map((cue) => cueToComponent(cue));
  } catch (e) {
    // console.error(e.message);
  }
};

// subtitlePlugin();

function processSubtitles() {
  return async (tree) => {
    // const { default: removePosition } = await import(
    //   "unist-util-remove-position"
    // );
    visit(tree, "code", (node, index, parent) => {
      if (node.lang === "srt") {
        const componentTree = subtitlePlugin(node.value);

        node.type = "text";
        delete node.lang;
        node.value = "";
        node.attributes = [];
        node.children = componentTree;
        console.log(componentTree);

        const nextNode = {
          type: "mdxJsxFlowElement",
          attributes: [],
          children: componentTree,
        };
        parent.children.splice(index, 0, nextNode);
      }
    });
  };
}

export { processSubtitles };
