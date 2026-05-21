/* Configure scales based on computed bins. Call this after bins are generated. */
function updateScales(bins) {
    const maxEng = bins[bins.length - 1].x1; // upper bound of the last bin
    const binsMaxLength = d3.max(bins, d => d.length); // Get the maximum length of the bins

    xScale
        .domain([0, maxEng])
        .range([0, innerWidth]);

    yScale
        .domain([0, binsMaxLength])
        .range([innerHeight, 0])
        .nice(); // Use the nice() method to round the y-axis values
}

