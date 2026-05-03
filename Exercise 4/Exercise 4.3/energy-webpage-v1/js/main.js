// Create a SVG container with viewbox attribute
// -> viewbox is like a drawing area
// ->Visualisation will display inside the viewbox
// any elements that exceed the viewbox boundaries will not be displayed
const svg = d3.select(".responsive-svg-container")
    .append("svg")
      .attr("viewBox", "0 0 1200 1600")
      .style("border", "1px solid black");

// for svg Element,append a rectangle:
// ->position (x,y) = (10,10)
// size:  width = 414 and height = 16
// fill color: blue
svg
  .append("rect")
    .attr("x", 10)
    .attr("y", 10)
    .attr("width", 414)
    .attr("height", 16)
    .attr("fill", "blue");