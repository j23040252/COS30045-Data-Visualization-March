const createScatterPlot = data => {
	//defines x and y fields for the scatter plot as a constant
	const X_FIELD = "Star2";
	const Y_FIELD = "Energy_Consumption";

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
		.attr("transform", `translate(${margin.left}, ${margin.top})`); //move the chart to top left corner of the svg

	chart
		.append("g")
		.attr("class", "x-axis")
		.attr("transform", `translate(0, ${innerHeight})`) //x-axis is moved to bottom: margin.top + innerHeight
		.call(d3.axisBottom(xScale));

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
		.attr("fill", "green")
		.attr("opacity", 0.75)
		.append("title")
		.text(d => `Star: ${d[X_FIELD]}, Energy: ${d[Y_FIELD]}`); //simple tooltip
};
