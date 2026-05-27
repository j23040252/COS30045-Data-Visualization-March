function updateScales(bins) {
    const maxEng = bins[bins.length - 1].x1; // to get the maximum number for last range
    const binsMaxLength = d3.max(bins, d => d.length); // Get the maximum length of the bins

    xScale
        .domain([0, maxEng])
        .range([0, innerWidth]);

    yScale
        .domain([0, binsMaxLength])
        .range([innerHeight, 0])
        .nice(); // Use the nice() method to round the y-axis values
}


const defineScalesScatter = data => {
  xScale
    .domain([0, d3.max(data, d => d.star)])
    .range([0, innerWidth])
    .nice();
  yScale
    .domain([0, d3.max(data, d => d.energyConsumption)])
    .range([innerHeight, 0])
    .nice();
};