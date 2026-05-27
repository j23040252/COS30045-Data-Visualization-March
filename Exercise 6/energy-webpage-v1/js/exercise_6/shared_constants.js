//take it from exercise 5 shared_constants.js
const margin = { top: 50, right: 10, bottom: 50, left: 70 };
const width = 900;
const height = 350;
const innerWidth = width - margin.left - margin.right;
const innerHeight = height - margin.top - margin.bottom;

/* Make the colours accessible globally */
const barColor = "#ce8f23";
/* Per-technology colours for filtered states */
const ledColor = "#EBA746";    // warm amber for LED
const lcdColor = "#3CB371";    // medium sea green for LCD
const oledColor = "#4A90E2";   // clear blue for OLED
const allColor = "#7D6744";    // neutral brown for All
const bodyBackgroundColor = "#fffaf0";

// set up the scales
const xScale = d3.scaleLinear();
const yScale = d3.scaleLinear();

// color scale mapping screen technology to colors
const colorScale = d3.scaleOrdinal()
	.domain(["LED", "LCD", "OLED", "all"])
	.range([ledColor, lcdColor, oledColor, allColor]);
