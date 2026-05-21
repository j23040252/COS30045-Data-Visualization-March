const binGenerator = d3.bin()
    .value(d => d.energyConsumption);

const drawHistogram = (data) => {
    const section = d3.select("#histogram");

    // create svg container
    const svg = section
        .append("svg")
        .attr("viewBox", `0 0 ${width} ${height}`)
        .style("width", "100%")
        .style("height", "auto");

    // create chart group and move to top left
    const chart = svg
        .append("g")
        .attr("transform", `translate(${margin.left}, ${margin.top})`);

    const bins = binGenerator(data); //get the data and sort it into several ranges

    // configure scales now that bins are available
    updateScales(bins);

    const bars = chart
        .selectAll("rect")
        .data(bins)  //if it got 10 ranges, it will create 10 rects for the 10 ranges
        .join("rect") 
        .attr("x", d => xScale(d.x0)) ////d.x0 is the starting number of the range, then pass it to the xScale to get its position;
        .attr("y", d => yScale(d.length))
        .attr("width", d => xScale(d.x1) - xScale(d.x0))  //d.x1 is the ending number of that range
        .attr("height", d => innerHeight - yScale(d.length))
        .attr("fill", barColor)
        .attr("stroke", bodyBackgroundColor)
        .attr("stroke-width", 2);

    bars.append("title").text(d => `Frequency: ${d.length}`);

    chart
        .append("g")
        .attr("class", "x-axis")
        .attr("transform", `translate(0, ${innerHeight})`)
        .call(d3.axisBottom(xScale))
        .selectAll("text")
        .style("font-size", "11px");

    chart
        .append("g")
        .attr("class", "y-axis")
        .call(d3.axisLeft(yScale).ticks(5))
        .selectAll("text")
        .style("font-size", "11px");

    chart
        .append("text")
        .attr("x", innerWidth / 2)
        .attr("y", innerHeight + 40)
        .attr("text-anchor", "middle")
        .style("font-size", "12px")
        .text("Energy Consumption (kWh/year)");

    chart
        .append("text")
        .attr("transform", "rotate(-90)")
        .attr("x", -innerHeight / 2)
        .attr("y", -50)
        .attr("text-anchor", "middle")
        .style("font-size", "12px")
        .text("Frequency");
}