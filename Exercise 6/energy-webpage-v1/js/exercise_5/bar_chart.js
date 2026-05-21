const createBarChart = data => {
	const section = d3.select("#bar-chart");

    //create svg container
	const svg = section
		.append("svg")
		.attr("viewBox", `0 0 ${width} ${height}`)
		.style("width", "100%")
		.style("height", "auto");

    //create chart group and move to top left
	const chart = svg
		.append("g")
		.attr("transform", `translate(${margin.left}, ${margin.top})`);

	//Use the data to configure the scales rules (formula in math) for the bars
	defineScalesBar(data);

	// local color scale for bars - copy master scale and restrict domain to this data
	const colorScaleBar = colorScaleDonut.copy().domain(xScaleBar.domain());

	const bars = chart
		.selectAll("rect")
		.data(data)
		.join("rect") 
		.attr("x", d => xScaleBar(d.Screen_Technology)) //pass the screen technology to get the x-coordinate
		.attr("y", d => yScaleBar(d.Energy_Consumption)) //pass the energy consumption to get the y-coordinate
		.attr("width", xScaleBar.bandwidth()) //get the width of each bar 
		.attr("height", d => innerHeight - yScaleBar(d.Energy_Consumption)) //yScale is give value start from the top, so bar height = innerHeight - yScale value
		.attr("fill", d => colorScaleBar(d.Screen_Technology)) //use local copy of color scale 
		.append("title").text(d => `${d.Screen_Technology}: ${d.Energy_Consumption}`); //simple tooltip

	chart
		.append("g")
		.attr("class", "x-axis")
		.attr("transform", `translate(0, ${innerHeight})`) //innerHeight start from top, so its value is the last pixel of the chart
		.call(d3.axisBottom(xScaleBar)) //draw x-axis with xScaleBar
		.selectAll("text")
		.style("font-size", "11px");

	chart
		.append("g")
		.attr("class", "y-axis")
		.call(d3.axisLeft(yScaleBar).ticks(5)) //draw y-axis with yScaleBar
		.selectAll("text")
		.style("font-size", "11px");

	//Labels for x-axis
	chart
		.append("text")
		.attr("x", innerWidth / 2)
		.attr("y", innerHeight + 40)
		.attr("text-anchor", "middle") //text alignement: middle from left and right
		.style("font-size", "12px")
		.text("Screen Technology (For 55 inch TV only)");

	//Labels for y-axis
	chart
		.append("text")
		.attr("transform", "rotate(-90)") //become vertical
		//after rotate, y control the horizontal position (left/right), why negative it -> so it start from bottom, /2 to make middle
		.attr("x", -innerHeight / 2) 
		.attr("y", -50) //after rotate, x control the vertical position, negative to move it left, 0 is the y-axis
		.attr("text-anchor", "middle")
		.style("font-size", "12px")
		.text("Energy Consumption (kWh/year)");
};
