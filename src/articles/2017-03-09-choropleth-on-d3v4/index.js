import React from 'react';
import { findDOMNode } from 'react-dom';
// import ChoroplethText from './_choropleth.md';
var d3 = require('d3');
import BlogPostChrome from '../../components/BlogPostChrome';

exports.data = {
    title: 'Choropleth on d3v4',
    written: '2017-03-09',
    updated: '2017-04-28',
    layoutType: 'post',
    path: '/choropleth-on-d3v4/',
    category: 'data science',
    description: 'Things about the choropleth.'
}

class choroplethBase extends React.Component {
    constructor(props) {
      super(props);
    }


    componentDidMount() {
      this.d3Node = d3.select('div#states');
      let measurements = {
        width: this.d3Node._groups[0][0].clientWidth,
        height: this.d3Node._groups[0][0].clientHeight
      }
      let space = graph.setup(this.d3Node, measurements);

      /*
       we begin drawing here, grab the data and use it to draw
      */

      d3.queue()
        .defer(d3.json, stateDataURL)
        .defer(d3.csv,statisticsDataURL)
        .awaitAll(function(error, results) {
          let states = results[0].states;
          let stats = results[1];
          let mergedData = mergeData(states, 'abbrev', stats, 'Abbreviation')
          graph.draw(space, mergedData, measurements);
        });
    }

    componentWillUnmount () {
        d3.select('svg').remove();
    }

    render() {
        let data = this.props.data.markdownRemark;
        let html = data.html;
        let frontmatter = this.props.data.jsFrontmatter.data;

        return (
            <BlogPostChrome {...frontmatter}>
              <div className='section'>
                <div className='container'>
                  <div id='tooltip'></div>
                  <div id='states'></div>
                </div>
              </div>
              <div className='section'>
                <div className='container'>
                  <div className="content" dangerouslySetInnerHTML={{ __html: html }} />
                </div>
              </div>
            </BlogPostChrome>
        );
    }
}

export default choroplethBase;

var graph = {}; // we namespace our d3 graph into setup and draw

var stateDataURL = 'https://gist.githubusercontent.com/jbolda/52cd5926e9241d26489ec82fa2bddf37/raw/f409b82e51072ea23746325eff7aa85b7ef4ebbd/states.json';
var statisticsDataURL = 'https://gist.githubusercontent.com/jbolda/52cd5926e9241d26489ec82fa2bddf37/raw/f409b82e51072ea23746325eff7aa85b7ef4ebbd/stats.csv';

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
/*
our data expects an array of objects
each object is expected to have:
name: tooltip - the full name of the state
abbrev: mergeData - used as the key to merge the json and csv
low: tooltip, color domain
high: tooltip, color domain
average: tooltip, path fill
*/
  let color = d3.scaleQuantize()
                .range(["rgb(237,248,233)",
                        "rgb(186,228,179)",
                        "rgb(116,196,118)",
                        "rgb(49,163,84)",
                        "rgb(0,109,44)"]);

    color.domain([
          d3.min(data, function(d) { return d.low; }),
          d3.max(data, function(d) { return d.high; })
    ]);

  let scaleFactor = measurements.width / 950;

  let states = svg.selectAll('path.states')
                      .data(data);

  let drawStates = states.enter().append('path')
                      .attr('class', 'state')
                      .attr('id', d => d.abbrev)
                      .attr('stroke', 'gray')
                      .attr('d', d => d.path)
                      .attr('transform', 'scale('+scaleFactor+')')
                      .style('fill', d => color(d.average))
                      .on('mouseover', mouseOver)
                      .on('mouseout', mouseOut);
}


let tooltipHtml = (d) => {
  return '<h4>'+d.name+'</h4><table>'+
    '<tr><td>Low</td><td>'+(d.low)+'</td></tr>'+
    '<tr><td>High</td><td>'+(d.high)+'</td></tr>'+
    '<tr><td>Avg</td><td>'+(d.average)+'</td></tr>'+
    '</table>';
}

let mouseOver = (d) => {
  let tooltip = d3.select('#tooltip')
      .html(tooltipHtml(d))
      .style('opacity', .9)
      .style('left', (d3.event.pageX) + 'px')
      .style('top', (d3.event.pageY - 28) + 'px');

  tooltip.transition().duration(200)
}

let mouseOut = () => {
    d3.select('#tooltip')
      .transition().duration(500)
      .style('opacity', 0);
}

function scale (scaleFactor,width,height) {
    return d3.geoTransform({
        point: function(x, y) {
            this.stream.point( (x - width/2) * scaleFactor + width/2 , (y - height/2) * scaleFactor + height/2);
        }
    });
    }

let mergeData = (d1, d1key, d2, d2key) => {
  let data = [];
  d1.forEach((s1) => {
    d2.forEach((s2) => {
      if (s1[d1key] === s2[d2key]) {
        data.push(Object.assign({}, s1, s2))
      }
    })
  })

  return data;
};

export const pageQuery = graphql`
query choroplethOnD3v4($slug: String!) {
  markdownRemark(fields: { slug: { eq: "/2017-03-09-choropleth-on-d3v4/_choropleth/" }}) {
    html
  }
	jsFrontmatter(fields: {slug: {eq: $slug}}) {
		...JSBlogPost_data
  }
}
`
