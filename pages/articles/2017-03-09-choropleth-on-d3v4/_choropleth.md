---
what: text for Choropleth on d3v4
---

Hello everyone!!! I am setting up a sort of quasi-blog that I can present various calculators. You may also find some productivity hacks and thoughts on my travels. I am a structural engineer by trade with an interest in finance, business and programming. Feel free to learn more about my story at my about page or contact me with any questions.

```javascript
var graph = {}; // we namespace our d3 into graph.setup and graph.draw

var stateDataURL = 'states.json';
var statisticsDataURL = 'stats.csv';

graph.setup = () => {
  let width = 1000;
  let height = 600;

  let svg = d3.select('div#states').append('svg')
    .attr('width', width)
    .attr('height', height);

  return svg;
}

graph.draw = (svg, data) => {
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

  let states = svg.selectAll('path.states')
                      .data(data);

  let drawStates = states.enter().append('path')
                      .attr('class', 'state')
                      .attr('id', d => d.abbrev)
                      .attr('stroke', 'gray')
                      .attr('d', d => d.path)
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

/*
 we begin drawing here, grab the data and use it to draw
*/
let space = graph.setup();

d3.queue()
  .defer(d3.json, stateDataURL)
  .defer(d3.csv,statisticsDataURL)
  .awaitAll(function(error, results) {
    let states = results[0].states;
    let stats = results[1];
    let mergedData = mergeData(states, 'abbrev', stats, 'Abbreviation')
    graph.draw(space, mergedData);
  });


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
};0
```
