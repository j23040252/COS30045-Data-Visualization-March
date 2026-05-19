function createLegend(container, scale, x, y) {
  const spacing = 18;
  const itemWidth = 12;

  //Create a group for legend and move to the specified position
  const legend = container
    .append("g")
    .attr("class", "legend")
    .attr("transform", `translate(${x}, ${y})`);

  const item = legend
    .selectAll("g") //select all "g" elements in the legend group
    .data(scale.domain()) //pass in the 
    .join("g") //, and join to create a "g" for each unique value in the domain
    .attr("transform", (d, i) => `translate(0, ${i * spacing})`); //each items have vertical spacing of 18px

  item
    .append("rect")
    .attr("width", itemWidth)
    .attr("height", itemWidth)
    .attr("fill", d => scale(d)); //get the color from the scale (colorScaleDonut) for each screen technology

  item
    .append("text")
    .attr("x", itemWidth + 6)
    .attr("y", itemWidth - 2)
    .style("font-size", "11px")
    .text(d => d); //get the text from data
}

