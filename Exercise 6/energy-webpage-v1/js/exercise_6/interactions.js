const populateFilters = (data) => {
// Make the filter options accessible globally */

const filters_screen = [
    { id: "all", label: "All", isActive: true },
    { id: "LED", label: "LED", isActive: false },
    { id: "LCD", label: "LCD", isActive: false },
    { id: "OLED", label: "OLED", isActive: false }
];

d3.select("#filters_screen")
    .selectAll(".filter")
    .data(filters_screen)
    .join("button")
        .attr("class", d => `filter ${d.id} ${d.isActive ? "active" : ""}`)
        .text(d => d.label)
        .on("click", (e, d) => {
            console.log("Clicked filter:", e);
            console.log("Clicked filter data:", d);
        if (!d.isActive) {
            // make sure button clicked is not already active
            filters_screen.forEach(filter => {
            filter.isActive = d.id === filter.id ? true : false;
        });
            
        // update the filter buttons based on which one was clicked
        d3.selectAll("#filters_screen .filter")
            .classed("active", filter => filter.id === d.id ? true : false);
        updateHistogram(d.id, data);
        }
    });

    const updateHistogram = (filterId, data) => {
        const updatedData = filterId === "all"
            ? data
            : data.filter(tv => tv.screenTech === filterId);

        // compute bins for updated data using the exposed bin generator
        const updatedBins = binGenerator(updatedData);

        updateScales(updatedBins);

        const bottomAxis = d3.axisBottom(xScale);
        const leftAxis = d3.axisLeft(yScale).ticks(5);

        const fillColor = filterId === "all"
            ? barColor
            : filterId === "OLED"
                ? oledColor
                : filterId === "LCD"
                    ? lcdColor
                    : filterId === "LED"
                        ? ledColor
                        : barColor;

        d3.select("#histogram")
            .selectAll("rect")
            .data(updatedBins)
            .join("rect")
            .attr("x", d => xScale(d.x0))
            .attr("y", d => yScale(d.length))
            .attr("width", d => xScale(d.x1) - xScale(d.x0))
            .attr("height", d => innerHeight - yScale(d.length))
            .attr("fill", fillColor)
            .attr("stroke", bodyBackgroundColor)
            .attr("stroke-width", 2);

        d3.select("#histogram .x-axis")
            .call(bottomAxis);

        d3.select("#histogram .y-axis")
            .call(leftAxis);
    };
}