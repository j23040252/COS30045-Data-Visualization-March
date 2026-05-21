// ===== SCATTER PLOT SCALES =====
const xScale = d3.scaleLinear();
const yScale = d3.scaleLinear();

const defineScalesScatter = data => {
  xScale
    .domain([0, d3.max(data, d => d.Star2)])
    .range([0, innerWidth])
    .nice();
  yScale
    .domain([0, d3.max(data, d => d.Energy_Consumption)])
    .range([innerHeight, 0])
    .nice();
};

// ===== DONUT CHART SCALES =====
//donut chart no need x and y scale becuase it don't use x and y coordinate
//it used angle (size of the slice) and colour (differentiate the slices) 
const colorScaleDonut = d3.scaleOrdinal(); //map categorical values to colors

const defineScalesDonut = data => {
  colorScaleDonut //Configure the input (Screen_Technology) and output (color) of the color scale
    .domain(data.map(d => d.Screen_Technology)) 
    .range(d3.schemeCategory10); //map each screen technology to a color from schemeCategory10
};

// ===== BAR CHART SCALES =====
const xScaleBar = d3.scaleBand(); //function for categorical data
const yScaleBar = d3.scaleLinear(); //function for numerical data

const defineScalesBar = data => {
  xScaleBar
    .domain(data.map(d => d.Screen_Technology))
    .range([0, innerWidth]) //set the bar limited from 0 to innerWidth (pixels)
    .padding(0.2); //add spacing between bars, 20% of the bandwidth on each side

  yScaleBar
    .domain([0, d3.max(data, d => d.Energy_Consumption)])
    .range([innerHeight, 0]) //The range is reversed because y=0 is at the top in SVG
    .nice(); //round up the values , so no decimal for the ticks on y-axis
};

// ===== LINE CHART SCALES =====
//xScale and yScale are linear because x and y are numerical
const xScaleLine = d3.scaleLinear();
const yScaleLine = d3.scaleLinear();
const colorScaleLine = d3.scaleOrdinal(); //link each state (categorical) to a colour

const defineScalesLine = data => {
  // x: years
  xScaleLine
    .domain(d3.extent(data, d => d.Year)) //extent: get the min and max of the years in array
    .range([0, innerWidth]);

  // use Math.max tofind max for all state columns
  // then use d3.max to get the highest value among them
  const maxY = d3.max(data, d =>
    Math.max(d.Queensland, d.New_South_Wales, d.Victoria, d.South_Australia, d.Tasmania, d.Snowy)
  );

  yScaleLine
    .domain([0, maxY])
    .range([innerHeight, 0]) //innerHeight is bottom, 0 is top of the chart
    .nice(); //value not have decimal

  // I set the range of the colour scale to be used 
  // Once this colourScaleLine is called in line_chart.js, it will map each state to a colour from schemeCategory10
  colorScaleLine.range(d3.schemeCategory10);
};