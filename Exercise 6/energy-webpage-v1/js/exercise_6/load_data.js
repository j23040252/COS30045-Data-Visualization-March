//Load exercise 6 data and call the functions
d3.csv("data/Exercise_6/Ex6_TVdata.csv", d => ({
    brand: d.brand,
    model: d.model,
    screenSize: +d.screenSize, // Convert screenSize to a number 
    screenTech: d.screenTech,
    energyConsumption: +d.energyConsumption, // Convert energy Consumption to a number
    star: +d.star // Convert to number
})).then(data => {
    console.log(data);
    // Call functions after data is loaded
    drawHistogram(data);
    populateFilters (data);
    createScatterPlot(data);

    createTooltip();
    handleMouseEvents();
    
}).catch(error => {
    console.error("Error loading the CSV file:", error);
});
