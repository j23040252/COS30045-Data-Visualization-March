//Exercise 4.3
// Create a SVG container with viewbox attribute
// -> viewbox is like a drawing area
// ->Visualisation will display inside the viewbox
// any elements that exceed the viewbox boundaries will not be displayed
const svg = d3.select(".responsive-svg-container")
    .append("svg")
      .attr("viewBox", "0 0 500 1600") 
      .style("border", "1px solid black");

// for svg Element,append a sample rectangle:
// ->position (x,y) = (10,10)
// size:  width = 414 and height = 16
// fill color: blue
// svg
//   .append("rect")
//     .attr("x", 10)
//     .attr("y", 10)
//     .attr("width", 414)
//     .attr("height", 16)
//     .attr("fill", "blue");

//Exercise 4.4 
// After get the csv from knime csv writer 
//I install extension "Live Server" in VS code -> run the index.html with live server -> see the data is printed in console log (F12-> console).

//Where the data come from?
// 1. I use the data from knime csv writer
//   -> column inside the file : Brand_Reg and count
//       -get it using GroupBy node in knime

//Step 1: Load csv + print data in console log
// d3.csv("data/data.csv", d => {
//   console.log(d); //found that data type (d.count) is string
// }
// );

//Step 2: Convert count to number + print data in console log to verify
// d3.csv("data/data.csv", d => {
//   return {
//     brand: d.Brand_Reg,
//     count: +d.count  //=> converts to number
//   };

// }).then(data => {
//   console.log(data);  //verify the count is number now
// });

//Step 3: Get length of data, max, min and array for min and max (using extent function)
// d3.csv("data/data.csv", d => {
//   return {
//     brand: d.Brand_Reg,
//     count: +d.count
//   };

// }).then(data => {
//   console.log(data);
//   console.log(data.length); //number of rows
//   console.log(d3.max(data, d => d.count));  //max value of count
//   console.log(d3.min(data, d => d.count)); //min value of count
//   console.log(d3.extent(data, d => d.count)); //=> create a array with min and max
// }); 

// Step 4: Sort data in descending order based on count 
//Logic: if b>a, return positive value -> b will be placed before a
d3.csv("data/data.csv", d => {
  return {
    brand: d.Brand_Reg,
    count: +d.count
  };
}).then(data => {
  data.sort((a, b) => b.count - a.count); //After the data is loaded, the sort() method reorders the entire data array in descending order based on the count value.
  console.log(data);

  createBarChart(data);
});

//Exercise 4.5
//Why I separate the codefrom exercise 4.5 and 4.6 : 
// To easily compare the difference between the two exercises because 
//   -->Exercise 4.5 is create bar chart without scaling
//   -->Exercise 4.6 is create bar chart with scaling

// Select all rect elements in svg and connect data to it,
// then create a rectangle for each data point using join method
// const createBarChart = data => {
// svg
//  .selectAll("rect")
//  .data(data)
//  .join("rect")
// };

// Add class to each rectangle based on count value
// const createBarChart = data => {
// svg
//   .selectAll("rect") //select all rectangles in svg
//   .data(data) 
//   .join("rect") //compare data & existing rect elements, if data > existing rect, create new rect; if data < existing rect, remove extra rect; 
//   .attr("class", d => {  //Assign class to each rectangle based on count value --> Style the rectangles using css
//     console.log(d);  
//      return `bar bar-${d.count}`;   //=> class = "bar bar-100" for count 100, "bar bar-200" for count 200
//    })
//   };

//Set x,y position, width and height of each rectangle
//Assign
// const createBarChart = data => {
//   const barHeight = 20; 
//   const spacing = 5; // space between bars
//   svg
//     .selectAll("rect")
//     .data(data)
//     .join("rect")
//       .attr("class", d => {
//         console.log(d);
//         return "bar"; //assign class "bar" to all rectangles
//       })
//       .attr("width", d => d.count) //width of bar = count value
//       .attr("height", barHeight) 
//       .attr("x", 10)
//       .attr("y", (d, i) => (barHeight + spacing) * i)  //i = index (row number), start from 0, so first bar i=0
//       .attr("fill", "steelblue"); //fill colour of bar
// };

// Exercise 4.6 and 4.7
const createBarChart = data => {
    // Logic for X-Axis (Linear Scale)
    // viewBox width : 500 and x starts at 70, available width = 500-70 (starting point) - 50 (right margin) = 380
    //50 px is for right , need put label 

    //What it does:
    //By setting input domain and output range, each count value is mapped to a pixel width..
    const xScale = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.count)]) //here set the input range (0 to max count value)
      .range([0, 380]); //link value (count) to pixel value (width of bar)

    const yScale = d3.scaleBand()
      .domain(data.map(d => d.brand)) //input range: array of brand names
      .range([0, 1600]) //0 to viewbox height
      .paddingInner(0.2); //pixel for each bar: 20% for spacing, 80% for bar thickness

    // 3. Render the Bars
    svg
      .selectAll("rect")
      .data(data)
      .join("rect")
        .attr("class", "bar")
        .attr("x", 70) // x-axis starting point
        .attr("y", d => yScale(d.brand)) // function call: get y coordinate for each brand 
        .attr("width", d => xScale(d.count)) // get the x coordinate for each count value
        .attr("height", yScale.bandwidth()) // return the bar height for each brand from yScale ; How to get it: total height/number of brands * 0.8
        .attr("fill", "steelblue");

    const barAndLabel = svg
      .selectAll("g")
      .data(data)
      .join("g")
      .attr("transform", d => `translate(0, ${yScale(d.brand)})`); //move the group to (x=0,the y position of each bar)

  // barAndLabel
  //   .append("rect")

  //brand label
  barAndLabel
    .append("text")
    .text(d => d.brand) //insert brand name as text
    .attr("x", 65)
    .attr("y", 10)
    .attr("text-anchor", "end") //The text’s right edge is fixed at 65. If text gets longer, it extends to the left.
    .style("font-family", "sans-serif")
    .style("font-size", "5px");

  // count label
  barAndLabel
    .append("text")
    .text(d => d.count)
    .attr("x", d => 70 + xScale(d.count) + 4)  // x position: start of bar (70) + width of bar (xScale(d.count)) + 4px spacing
    .attr("y", 10)
    .style("font-family", "sans-serif")
    .style("font-size", "5px");
};




// Load a second dataset and create a separate bar chart 
d3.csv("data/tv_technology.csv", d => {
  return {
    Screen_Technology: d.Screen_Tech,
    count: +d.count
  };
}).then(data => {
  data.sort((a, b) => b.count - a.count);
  createSecondBarChart(data);
});

const svg2 = d3.select(".responsive-svg-container")
  .append("svg")
    .attr("viewBox", "0 0 500 500")  //reduce height because the data has fewer rows
    .style("border", "1px solid black")
    .style("margin-top", "12px");
    
const createSecondBarChart = data => {
  const xScale2 = d3.scaleLinear()
    .domain([0, d3.max(data, d => d.count)])
    .range([0, 380]);

  const yScale2 = d3.scaleBand()
    .domain(data.map(d => d.Screen_Technology))
    .range([0, 500]) //leave some space at bottom
    .paddingInner(0.2);

  svg2.selectAll("g")
    .data(data)
    .join("g")
    .attr("transform", d => `translate(0, ${yScale2(d.Screen_Technology)})`)
    .call(g => {
      g.append("rect")
        .attr("x", 70)
        .attr("y", 0)
        .attr("width", d => xScale2(d.count))
        .attr("height", yScale2.bandwidth())
        .attr("fill", "orange");

      g.append("text")
        .text(d => d.Screen_Technology)
        .attr("x", 65)
        .attr("y", 70)
        .attr("text-anchor", "end")
        .style("font-family", "sans-serif")
        .style("font-size", "11px");

      g.append("text")
        .text(d => d.count)
        .attr("x", d => 70 + xScale2(d.count) + 4)
        .attr("y", 70)
        .style("font-family", "sans-serif")
        .style("font-size", "10px");
    });
};



//Another Graph
