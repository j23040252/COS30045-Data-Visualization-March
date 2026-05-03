d3.select("h1")
  .style("color", "green");

d3.select("div")
  .append("p")
    .text("Purchasing a low energy consumption TV will help with your energy bills!");

// The rect elements are added, but only visible if use F12 to see 
// d3.select("svg")
//   .append("rect");

//By adding attributes and styles, rect element are visible.
d3.select("svg")
  .append("rect")
   .attr("x", 50)
   .attr("y", 50)
   .attr("width", 100)
   .attr("height", 30)
   .style("fill", "green");