const createLineChart = data => {
  const section = d3.select("#line-chart");

  // create svg container
  const svg = section
    .append("svg")
    .attr("viewBox", `0 0 ${width + 40} ${height+30}`)
    .style("width", "100%")
    .style("height", "auto");

  const chart = svg
    .append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

  // states columns in the CSV
  //it was the header name, so need to declare a variable to store the states name
  // used to colour the lines and create legend
  const states = [
    "Queensland",
    "New_South_Wales",
    "Victoria",
    "South_Australia",
    "Tasmania",
    "Snowy"
  ];

  // pass data to xScaleLine and yScaleLine to define the scales rules (such as formula in math) for the line chart
  defineScalesLine(data);
  colorScaleLine.domain(states); // set the color scale domain = states, so each state will have a different colour

  //Why need series: 
  //1. raw data is used year as the row. 
  //2. Without series, the line shows the value of same state across different years
  
  //the series variable have two loops:
  //1. Outer loop: Loop between each state
  //2. Inner loop: Loop between each year for that state, and store the year and its corresponding value in an array of objects
  //Example: 
  // Queensland:
  //    { id: "Queensland",
  //  values: [
  //    { Year: 1998, value: 60 },
  //    { Year: 1999, value: 49 },
  //    { Year: 2000, value: 45 },
  // ...
  // ]
  // }
  const series = states.map(state => ({
    id: state,
    values: data.map(d => ({ Year: d.Year, value: d[state] }))
  }));

  // line generator, it will generate the path for the line based on the x and y values of the data points
  const lineGen = d3
    .line()
    .x(d => xScaleLine(d.Year))
    .y(d => yScaleLine(d.value)) 
    .curve(d3.curveMonotoneX); //curveMonotoneX: smooth the line, but it won't overshoot the data points

  let selectedState = null; //store the selected state for click-to-highlight interaction

  // draw the x-axis and y-axis
  chart
    .append("g")
    .attr("class", "x-axis")
    .attr("transform", `translate(0, ${innerHeight})`)
    .call(d3.axisBottom(xScaleLine).ticks(10).tickFormat(d3.format("d"))) //tick(10), d3 will try to achieve this. It is a suggestions; formatting: show years without comma (,)  
    .selectAll("text")
    .style("font-size", "11px");

  chart
    .append("g")
    .attr("class", "y-axis")
    .call(d3.axisLeft(yScaleLine).ticks(10))
    .selectAll("text")
    .style("font-size", "11px");

  // draw lines
  chart
    .selectAll("path.line")
    .data(series)
    .join("path")
    .attr("class", "line")
    .attr("fill", "none")
    .attr("stroke", d => colorScaleLine(d.id)) //d.id => get the state name , pass to colorScaleLine to get the colour for that state
    .attr("stroke-width", 2.8)
    .attr("d", d => lineGen(d.values)) //lineGen get the x and y coordinate, create the data points and draw the line
    ;

  // horizontal legend with consistent spacing between items
  createHorizontalLegend(chart, colorScaleLine, 0, innerHeight + 45, 150);

  // make legend items clickable: clicking a legend item selects/deselects the corresponding line
  chart
    .select(".legend")
    .selectAll("g")
    .style("cursor", "pointer") // change cursor to pointer when hover on legend items
    .on("click", function (event, d) {
      if (event.stopPropagation) event.stopPropagation();
      if (selectedState === d) {
        selectedState = null;
        chart.selectAll("path.line").attr("stroke-opacity", 1);
      } else {
        selectedState = d;
        chart
          .selectAll("path.line")
          .attr("stroke-opacity", line => (line.id === d ? 1 : 0.15));
      }
    });

  // x-axis label
  chart
    .append("text")
    .attr("x", innerWidth / 2)
    .attr("y", innerHeight + 40)
    .attr("text-anchor", "middle")
    .style("font-size", "12px")
    .text("Year");

  // y-axis label
  chart
    .append("text")
    .attr("transform", "rotate(-90)") 
    .attr("x", -innerHeight / 2)//after rotate, y control the horizontal position (left/right), why negative it -> so it start from bottom, /2 to make middle
    .attr("y", -50) //after rotate, x control the vertical position, negative to move it left, 0 is the y-axis
    .attr("text-anchor", "middle")
    .style("font-size", "12px")
    .text("Spot Price ($/MWh)");
};
