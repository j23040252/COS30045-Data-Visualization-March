const createDonutChart = data => {
	const section = d3.select("#donut-chart");
	//create svg container
	const svg = section
		.append("svg")
		.attr("viewBox", `0 0 ${width} ${height}`)
		.style("width", "100%")
		.style("height", "auto");
		
	//create a group to store the chart and move it (margin.left, margin.top)
	const chart = svg
		.append("g")
		.attr("transform", `translate(${margin.left}, ${margin.top})`);

	//get the smaller value from innerWidth or innerHeight , so chart is fit nicely --> get the diameter
	//divide by 2 to get the radius
	const radius = Math.min(innerWidth, innerHeight) / 2; 
	const center = chart
		.append("g")
		.attr("transform", `translate(${innerWidth / 2}, ${innerHeight / 2})`); //move the chart to the centre

	defineScalesDonut(data); //call colorScaleDonut ,send data to the function, result stored in colorScaleDonut

	//d3.pie : convert data to angles,pass in the energy consumption values, disable sorting
	const pie = d3.pie().value(d => d.Energy_Consumption).sort(null);
	//d3.arc : function to draw arcs, innerRadius: the radius of the hole in the middle, 
	//outerRadius: the radius of the entire circle
	//innerRadius is 55% of the radius to create a donut shape, outerRadius is the full radius
	const arc = d3.arc().innerRadius(radius * 0.55).outerRadius(radius);


	//at the center group, create g.arc group for each slices and assign class "arc"
	const arcs = center
		.selectAll("g.arc")
		.data(pie(data)) //pass the values to get the angles for each slice
		.join("g") 
		.attr("class", "arc");

	// add stroke for separation
	arcs
		.append("path") //append path to each arc group
		.attr("d", arc)	// use the arc function to draw the path
		.attr("fill", d => colorScaleDonut(d.data.Screen_Technology)) 	// fill with color from colorScaleDonut 
		.attr("stroke", "#fff") // add a white stroke for separation
		.attr("stroke-width", 1)
		.append("title")
		.text(d => `${d.data.Screen_Technology}: ${d.data.Energy_Consumption}`);

	// percentage labels on centroids
	arcs
		.append("text") //insert text element in each arc group
		.text(d => {
			d.percentage = (d.endAngle - d.startAngle) / (2 * Math.PI); //angle of the slice/ angle of whole circle
			return d3.format(".0%")(d.percentage); //formatting : no decimal + percentage sign
		})
		.attr("transform", d => {
			d.centroid = arc.centroid(d);  //calculate the centroid of each slice using arc.centroid() method
			return `translate(${d.centroid})`; //move the label to centroid
		})
		.attr("text-anchor", "middle") //align middle from top and bottom
		.attr("dominant-baseline", "middle") //align middle from left and right
		.attr("fill", "#fff")
		.style("font-size", "11px")
		.style("font-weight", 500)
		.attr("fill-opacity", d => (d.percentage < 0.04 ? 0 : 1)); //hide labels if the percentage < 4%

	createLegend(chart, colorScaleDonut, innerWidth - 140, 20);
};

