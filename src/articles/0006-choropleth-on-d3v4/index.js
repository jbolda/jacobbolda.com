import React from "react";
import { graphql } from "gatsby";
// import ChoroplethText from './_choropleth.md';
import * as d3 from "d3";
import BlogPost from "../../components/jsBlogPost";

// import stateDataURL from "./states.json"
// import statisticsDataURL from "./states_data.csv"

export const frontmatter = {
  title: "Choropleth on d3v4",
  written: "2017-03-09",
  updated: "2017-04-28",
  layoutType: "post",
  path: "/choropleth-on-d3v4/",
  category: "data science",
  description: "Things about the choropleth."
};

class choroplethBase extends React.Component {
  componentDidMount() {
    this.d3Node = d3.select("div#states");
    let measurements = {
      width: this.d3Node._groups[0][0].clientWidth,
      height: this.d3Node._groups[0][0].clientHeight
    };
    let space = graph.setup(this.d3Node, measurements);

    /*
       we begin drawing here, grab the data and use it to draw
      */

    d3.queue()
      .defer(
        d3.csv,
        `${window.location.protocol}//${window.location.host}${
          this.props.data.statedata.publicURL
        }`
      )
      .defer(
        d3.json,
        `${window.location.protocol}//${window.location.host}${
          this.props.data.stateshapes.publicURL
        }`
      )
      .awaitAll((error, results) => {
        if (error) {
          console.log(this.props.data.statedata.publicURL);
          console.log(this.props.data.stateshapes.publicURL);
          console.dir(error);
        } else {
          // console.log(results);
          let states = results[1].states;
          let stats = results[0];
          let mergedData = mergeData(states, "abbrev", stats, "Abbreviation");
          graph.draw(space, mergedData, measurements);
        }
      });
  }

  componentWillUnmount() {
    d3.select("svg").remove();
  }

  renderText() {
    return (
      <div
        className="content"
        dangerouslySetInnerHTML={{
          __html: this.props.data.markdownRemark.html
        }}
      />
    );
  }

  render() {
    return (
      <BlogPost
        componentBlocks={[
          {
            wrapper: "break-out",
            uniqueKey: "states",
            renderComponent: () => <div id="states" />
          },
          {
            wrapper: "break-out",
            uniqueKey: "tooltip",
            renderComponent: () => <div id="tooltip" />
          },
          {
            wrapper: "column",
            uniqueKey: "text-column",
            renderComponent: this.renderText.bind(this)
          }
        ]}
        {...this.props}
      />
    );
  }
}

export default choroplethBase;

var graph = {}; // we namespace our d3 graph into setup and draw

graph.setup = (selection, measurements) => {
  // the path string is drawn expecting:
  // a width of 950px
  // a height of 600px
  // which gives an aspect ratio of 1.6

  let svg = selection
    .append("svg")
    .attr("width", measurements.width)
    .attr("height", measurements.width / 1.6);

  return svg;
};

graph.draw = (svg, data, measurements) => {
  /*
our data expects an array of objects
each object is expected to have:
name: tooltip - the full name of the state
abbrev: mergeData - used as the key to merge the json and csv
low: tooltip, color domain
high: tooltip, color domain
average: tooltip, path fill
*/
  let color = d3
    .scaleQuantize()
    .range([
      "rgb(237,248,233)",
      "rgb(186,228,179)",
      "rgb(116,196,118)",
      "rgb(49,163,84)",
      "rgb(0,109,44)"
    ]);

  color.domain([
    d3.min(data, function(d) {
      return d.low;
    }),
    d3.max(data, function(d) {
      return d.high;
    })
  ]);

  let scaleFactor = measurements.width / 950;

  let states = svg.selectAll("path.states").data(data);

  states
    .enter()
    .append("path")
    .attr("class", "state")
    .attr("id", d => d.abbrev)
    .attr("stroke", "gray")
    .attr("d", d => d.path)
    .attr("transform", "scale(" + scaleFactor + ")")
    .style("fill", d => color(d.average))
    .on("mouseover", mouseOver)
    .on("mouseout", mouseOut);
};

let tooltipHtml = d => {
  return (
    "<h4>" +
    d.name +
    "</h4><table>" +
    "<tr><td>Low</td><td>" +
    d.low +
    "</td></tr>" +
    "<tr><td>High</td><td>" +
    d.high +
    "</td></tr>" +
    "<tr><td>Avg</td><td>" +
    d.average +
    "</td></tr>" +
    "</table>"
  );
};

let mouseOver = d => {
  let tooltip = d3
    .select("#tooltip")
    .html(tooltipHtml(d))
    .style("opacity", 0.9)
    .style("left", d3.event.pageX + "px")
    .style("top", d3.event.pageY - 28 + "px");

  tooltip.transition().duration(200);
};

let mouseOut = () => {
  d3.select("#tooltip")
    .transition()
    .duration(500)
    .style("opacity", 0);
};

// eslint-disable-next-line
function scale(scaleFactor, width, height) {
  return d3.geoTransform({
    point: function(x, y) {
      this.stream.point(
        (x - width / 2) * scaleFactor + width / 2,
        (y - height / 2) * scaleFactor + height / 2
      );
    }
  });
}

let mergeData = (d1, d1key, d2, d2key) => {
  let data = [];
  d1.forEach(s1 => {
    d2.forEach(s2 => {
      if (s1[d1key] === s2[d2key]) {
        data.push(Object.assign({}, s1, s2));
      }
    });
  });

  return data;
};

export const pageQuery = graphql`
  query choroplethOnD3v4($slug: String!) {
    markdownRemark(
      fields: { slug: { eq: "/2017-03-09-choropleth-on-d3v4/_choropleth/" } }
    ) {
      html
    }
    post: javascriptFrontmatter(fields: { slug: { eq: $slug } }) {
      ...JSBlogPost
    }
    stateshapes: file(
      relativePath: { eq: "2017-03-09-choropleth-on-d3v4/states.json" }
    ) {
      publicURL
    }
    statedata: file(
      relativePath: { eq: "2017-03-09-choropleth-on-d3v4/states_data.csv" }
    ) {
      publicURL
    }
  }
`;
