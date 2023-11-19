import React, { Fragment } from "react";
const relativeURL = "/article-components/";

export default class Choropleth extends React.Component {
  async componentDidMount() {
    graph.d3 = await import("https://cdn.skypack.dev/d3@4.13.0").catch((e) =>
      console.error(e)
    );

    this.d3Node = graph.d3.select("div#states");
    let measurements = {
      width: this.d3Node._groups[0][0].clientWidth,
      height: this.d3Node._groups[0][0].clientHeight,
    };
    let space = graph.setup(this.d3Node, measurements);

    /*
      we begin drawing here, grab the data and use it to draw
    */

    graph.d3
      .queue()
      .defer(graph.d3.csv, `${relativeURL}states_data.csv`)
      .defer(graph.d3.json, `${relativeURL}states.json`)
      .awaitAll((error, results) => {
        if (error) {
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
    graph.d3.select("svg").remove();
  }

  render() {
    return (
      <Fragment>
        <div id="states" />
        <div id="tooltip" />
      </Fragment>
    );
  }
}

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
  let color = graph.d3
    .scaleQuantize()
    .range([
      "rgb(237,248,233)",
      "rgb(186,228,179)",
      "rgb(116,196,118)",
      "rgb(49,163,84)",
      "rgb(0,109,44)",
    ]);

  color.domain([
    graph.d3.min(data, function (d) {
      return d.low;
    }),
    graph.d3.max(data, function (d) {
      return d.high;
    }),
  ]);

  let scaleFactor = measurements.width / 950;

  let states = svg.selectAll("path.states").data(data);

  states
    .enter()
    .append("path")
    .attr("class", "state")
    .attr("id", (d) => d.abbrev)
    .attr("stroke", "gray")
    .attr("d", (d) => d.path)
    .attr("transform", "scale(" + scaleFactor + ")")
    .style("fill", (d) => color(d.average))
    .on("mouseover", mouseOver)
    .on("mouseout", mouseOut);
};

let tooltipHtml = (d) => {
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

let mouseOver = (d) => {
  let tooltip = graph.d3.select("#tooltip");

  tooltip
    .html(tooltipHtml(d))
    .style("opacity", 0.9)
    .style("left", graph.d3.event.pageX + "px")
    .style("top", graph.d3.event.pageY - 28 + "px");

  tooltip.transition().duration(200);
};

let mouseOut = () => {
  graph.d3.select("#tooltip").transition().duration(500).style("opacity", 0);
};

// eslint-disable-next-line
function scale(scaleFactor, width, height) {
  return graph.d3.geoTransform({
    point: function (x, y) {
      this.stream.point(
        (x - width / 2) * scaleFactor + width / 2,
        (y - height / 2) * scaleFactor + height / 2
      );
    },
  });
}

let mergeData = (d1, d1key, d2, d2key) => {
  let data = [];
  d1.forEach((s1) => {
    d2.forEach((s2) => {
      if (s1[d1key] === s2[d2key]) {
        data.push(Object.assign({}, s1, s2));
      }
    });
  });

  return data;
};

/*
  .state{
    fill: none;
    stroke: #a9a9a9;
    stroke-width: 1;
  }
  .state:hover{
    fill-opacity:0.5;
  }
  #tooltip {
    position: absolute;
    text-align: center;
    padding: 20px;
    margin: 10px;
    font: 12px sans-serif;
    background: lightsteelblue;
    border: 1px;
    border-radius: 2px;
    pointer-events: none;
  }
  #tooltip h4{
    margin:0;
    font-size:14px;
  }
  #tooltip{
    background:rgba(0,0,0,0.9);
    border:1px solid grey;
    border-radius:5px;
    font-size:12px;
    width:auto;
    padding:4px;
    color:white;
    opacity:0;
  }
  #tooltip table{
    table-layout:fixed;
  }
  #tooltip tr td{
    padding:0;
    margin:0;
  }
  #tooltip tr td:nth-child(1){
    width:50px;
  }
  #tooltip tr td:nth-child(2){
    text-align:center;
  }
*/
