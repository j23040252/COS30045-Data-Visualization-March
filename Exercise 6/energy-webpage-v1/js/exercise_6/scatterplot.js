const createScatterPlot = data => {
	//defines x and y fields for the scatter plot as a constant
	const X_FIELD = "star";
	const Y_FIELD = "energyConsumption";

	//call xScale and yScale
	defineScalesScatter(data);

	//Create SVG container 
	const section = d3.select("#scatterplot");
	const svg = section
		.append("svg")
		.attr("viewBox", `0 0 ${width} ${height}`)
		.style("width", "100%") 
		.style("height", "auto")

	//Create a group to store chart and move it (margin.left, margin.top)
	const chart = svg
		.append("g")
		.attr("class", "scatterplot-chart")
		.attr("transform", `translate(${margin.left}, ${margin.top})`); //move the chart to top left corner of the svg

	chart
		.append("g")
		.attr("class", "x-axis")
		.attr("transform", `translate(0, ${innerHeight})`) //x-axis is moved to bottom: margin.top + innerHeight
		.call(d3.axisBottom(xScale));

	// add legend for screen technologies near top-right of chart
	// position it at top right corner
	const legendDomain = colorScale.domain().filter(d => d !== "all"); //exclude 'all' since we no need this legend for scatterplot
	const legendScale = d3.scaleOrdinal()
		.domain(legendDomain)
		.range(legendDomain.map(d => colorScale(d)));  //assign same colours for the legend as the scatterplot data points

	createHorizontalLegend(chart, legendScale, 500, 25, 110);

	chart
		.append("g")
		.attr("class", "y-axis")
		.call(d3.axisLeft(yScale));

	chart
		.append("text")
		.attr("x", innerWidth / 2)
		.attr("y", innerHeight + 40)
		.attr("text-anchor", "middle")
		.style("font-family", "sans-serif")
		.style("font-size", "12px")
		.text("Star Rating");

	chart
		.append("text")
		.attr("transform", "rotate(-90)")
		.attr("x", -innerHeight / 2)
		.attr("y", -55)
		.attr("text-anchor", "middle")
		.style("font-family", "sans-serif")
		.style("font-size", "12px")
		.text("Energy Consumption (kWh/year)");

	chart
		.selectAll("circle")
		.data(data)
		.join("circle")
		.attr("cx", d => xScale(d[X_FIELD])) //pass the x field to xScale to get its x-coordinate
		.attr("cy", d => yScale(d[Y_FIELD])) //pass the y field to yScale to get its y-coordinate
		.attr("r", 4)
		.attr("fill", d => colorScale(d.screenTech))
		.attr("opacity", 0)
		.call(sel => sel.transition().duration(700)
			.attr("r", 4)
			.attr("opacity", 0.75)
		)
};
