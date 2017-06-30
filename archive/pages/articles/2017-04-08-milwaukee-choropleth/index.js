import React from 'react';
import { findDOMNode } from 'react-dom';
// import ChoroplethText from './_choropleth.md';
var d3 = require('d3');
// import './style.scss';
// import 'static/css/highlight.css';
// import rawData from './_info.geojson';

exports.data = {
    title: 'Milwaukee Choropleth',
    written: '',
    updated: '',
    path: 'milwaukee-choropleth',
    category: 'data science',
    description: 'Things about the choropleth.'
}

class milwaukeeCountyChoropleth extends React.Component {
    constructor(props) {
      super(props);
    }


    componentDidMount() {
      this.d3Node = d3.select('div#county');
      let measurements = {
        width: this.d3Node._groups[0][0].clientWidth,
        height: this.d3Node._groups[0][0].clientHeight
      }

      let space = graph.setup(this.d3Node, measurements);

      /*
       we begin drawing here, grab the data and use it to draw
      */

      // graph.draw(space, rawData, measurements)

      // d3.queue()
      //   .defer(d3.json, stateDataURL)
      //   .defer(d3.csv,statisticsDataURL)
      //   .awaitAll(function(error, results) {
      //     graph.draw(space, mergedData, measurements);
      //   });
    }

    componentWillUnmount () {
        d3.select('svg').remove();
    }

    render() {
        // const {route, children} = this.props;
        // const post = route
// console.log(this)
// console.log(ChoroplethText)
        // let layout, template

        // layout = post.layout

        return (
            <div className=''>
              <div className='section'>
                <div className='container'>
                  <div id='tooltip'></div>
                  <div id='county'></div>
                </div>
              </div>
              <div className='section'>
                <div className='container'>

                </div>
              </div>
            </div>
        );
    }
}

milwaukeeCountyChoropleth.propTypes = {
    post: React.PropTypes.object,
    pages: React.PropTypes.array,
}

export default milwaukeeCountyChoropleth;

var graph = {}; // we namespace our d3 graph into setup and draw

graph.setup = (selection, measurements) => {
// the path string is drawn expecting:
  // a width of 950px
  // a height of 600px
  // which gives an aspect ratio of 1.6

  let svg = selection.append('svg')
    .attr('width', measurements.width)
    .attr('height', measurements.width / 1.6);

  return svg;
}

graph.draw = (svg, data, measurements) => {


  // let tile = d3.tile()
  //   .size([measurements.width, measurements.height]);

  let projection = d3.geoMercator()
    .scale(25000)
    .center([-88, 44])
    .translate([measurements.width / 2, measurements.height / 2]);

  let path = d3.geoPath()
    .projection(projection);

  let color = d3.scaleLinear()
  //   .domain([1, 20])
    .clamp(true)
    .range(['#fff', 'rgb(0,109,44)']);

    color.domain([
          d3.min(data, function(d) { return d.low; }),
          d3.max(data, function(d) { return d.high; })
    ]);

  let g = svg.append('g');

  let features = data.features;

  let states = g.selectAll('path.states')
                      .data(features);

  // Update color scale domain based on data
  // color.domain([0, d3.max(features, nameLength)]);

  let drawStates = states.enter().append('path')
                      .attr('class', 'county')
                      // .attr('id', d => d.abbrev)
                      .attr('stroke', 'gray')
                      .attr('d', path)
                      .attr('vector-effect', 'non-scaling-stroke');
                      // .style('fill', d => color(d.average));
}






// // Set svg width & height
// let svg = d3.select('svg')
//   .attr('width', width)
//   .attr('height', height);

// // Add background
// svg.append('rect')
//   .attr('class', 'background')
//   .attr('width', width)
//   .attr('height', height)
//   .on('click', clicked);

// let g = svg.append('g');

// let effectLayer = g.append('g')
//   .classed('effect-layer', true);

// let mapLayer = g.append('g')
//   .classed('map-layer', true);

// let dummyText = g.append('text')
//   .classed('dummy-text', true)
//   .attr('x', 10)
//   .attr('y', 30)
//   .style('opacity', 0);

// let bigText = g.append('text')
//   .classed('big-text', true)
//   .attr('x', 20)
//   .attr('y', 45);

// // Load map data
// d3.json('colombia.geo.json', function(error, mapData) {
//   let features = mapData.features;

//   // Update color scale domain based on data
//   color.domain([0, d3.max(features, nameLength)]);

//   // Draw each province as a path
//   mapLayer.selectAll('path')
//       .data(features)
//     .enter().append('path')
//       .attr('d', path)
//       .attr('vector-effect', 'non-scaling-stroke')
//       .style('fill', fillFn)
//       .on('mouseover', mouseover)
//       .on('mouseout', mouseout)
//       .on('click', clicked);
// });