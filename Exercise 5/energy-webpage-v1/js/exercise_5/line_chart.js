const createLineChart = data => {
  const section = d3.select("#line-chart");

  const svg = section
    .append("svg")
    .attr("viewBox", `0 0 ${width} ${height}`)
    .style("width", "100%")
    .style("height", "auto");

  const chart = svg
    .append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

  // states columns in the CSV
  const states = [
    "Queensland",
    "New_South_Wales",
    "Victoria",
    "South_Australia",
    "Tasmania",
    "Snowy"
  ];

  // prepare scales
  defineScalesLine(data);
  colorScaleLine.domain(states);

  // transform data into series per state
  const series = states.map(state => ({
    id: state,
    values: data.map(d => ({ Year: d.Year, value: d[state] }))
  }));

  // line generator
  const lineGen = d3
    .line()
    .x(d => xScaleLine(d.Year))
    .y(d => yScaleLine(d.value))
    .curve(d3.curveMonotoneX);

  // axes
  chart
    .append("g")
    .attr("transform", `translate(0, ${innerHeight})`)
    .call(d3.axisBottom(xScaleLine).ticks(10).tickFormat(d3.format("d")))
    .selectAll("text")
    .style("font-size", "11px");

  chart
    .append("g")
    .call(d3.axisLeft(yScaleLine).ticks(6))
    .selectAll("text")
    .style("font-size", "11px");

  // draw lines
  chart
    .selectAll("path.line")
    .data(series)
    .join("path")
    .attr("class", "line")
    .attr("fill", "none")
    .attr("stroke", d => colorScaleLine(d.id))
    .attr("stroke-width", 2)
    .attr("d", d => lineGen(d.values));

  // legend
  createLegend(chart, colorScaleLine, innerWidth - 160, 10);

  // axis labels
  chart
    .append("text")
    .attr("x", innerWidth / 2)
    .attr("y", innerHeight + 40)
    .attr("text-anchor", "middle")
    .style("font-size", "12px")
    .text("Year");

  chart
    .append("text")
    .attr("transform", "rotate(-90)")
    .attr("x", -innerHeight / 2)
    .attr("y", -50)
    .attr("text-anchor", "middle")
    .style("font-size", "12px")
    .text("Spot Price ($/MWh)");
};
