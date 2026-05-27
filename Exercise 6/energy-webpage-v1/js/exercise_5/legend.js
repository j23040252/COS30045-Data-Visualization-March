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

// Horizontal legend (left to right)
// x, y: the position of the legend, itemSpacing: the spacing between legend items
function createHorizontalLegend(container, scale, x, y, itemSpacing = 120) {
  const itemWidth = 12; //size of the color box in the legend

  //create container and move to the specified position (x, y)
  const legend = container
    .append("g")
    .attr("class", "legend")
    .attr("transform", `translate(${x}, ${y})`); 

  //create a group for each legend item with consistent spacing between items
  const item = legend
    .selectAll("g")
    .data(scale.domain())
    .join("g")
    .attr("transform", (d, i) => `translate(${i * itemSpacing}, 0)`); 

  //color box for each legend item 
  item
    .append("rect")
    .attr("width", itemWidth)
    .attr("height", itemWidth)
    .attr("fill", d => scale(d)); //get the colour from the function (colorScaleLine) for each state

  item
    .append("text")
    .attr("x", itemWidth + 6)
    .attr("y", itemWidth - 2)
    .style("font-size", "11px")
    .text(d => d.replace(/_/g, " ")); 
    // replace underscores with spaces since state names have underscores (eg. New_South_Wales)
}

