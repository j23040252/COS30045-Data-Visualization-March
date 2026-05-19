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
const colorScaleDonut = d3.scaleOrdinal(); //map categorical values to colors

const defineScalesDonut = data => {
  colorScaleDonut //Configure the input (Screen_Technology) and output (color) of the color scale
    .domain(data.map(d => d.Screen_Technology)) 
    .range(d3.schemeCategory10); //map each screen technology to a color from schemeCategory10
};

// // ===== BAR CHART SCALES =====
// const xScaleBar = d3.scaleBand();
// const yScaleBar = d3.scaleLinear();

// const defineScalesBar = data => {
//   xScaleBar.domain(data.map(d => d.Screen_Technology)).range([0, innerWidth]).padding(0.2);
//   yScaleBar.domain([0, d3.max(data, d => d.Energy_Consumption)]).range([innerHeight, 0]).nice();
// };

// // ===== LINE CHART SCALES =====
// const xScaleLine = d3.scaleLinear();
// const yScaleLine = d3.scaleLinear();

// const defineScalesLine = data => {
//   xScaleLine.domain(d3.extent(data, d => d.Year)).range([0, innerWidth]);
//   yScaleLine.domain([0, d3.max(data, d => 
//     Math.max(d.Queensland, d.New_South_Wales, d.Victoria, d.South_Australia, d.Tasmania, d.Snowy)
//   )]).range([innerHeight, 0]).nice();
// };