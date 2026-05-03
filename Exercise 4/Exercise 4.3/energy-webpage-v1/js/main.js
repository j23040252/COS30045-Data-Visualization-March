//Exercise 4.3
// Create a SVG container with viewbox attribute
// -> viewbox is like a drawing area
// ->Visualisation will display inside the viewbox
// any elements that exceed the viewbox boundaries will not be displayed
const svg = d3.select(".responsive-svg-container")
    .append("svg")
      .attr("viewBox", "0 0 1200 1600")
      .style("border", "1px solid black");

// for svg Element,append a rectangle:
// ->position (x,y) = (10,10)
// size:  width = 414 and height = 16
// fill color: blue
svg
  .append("rect")
    .attr("x", 10)
    .attr("y", 10)
    .attr("width", 414)
    .attr("height", 16)
    .attr("fill", "blue");

//Exercise 4.4
// After get the csv from knime csv writer 
//I install extension "Live Server" in VS code -> run the index.html with live server -> see the data is printed in console log (F12-> console).

// d3.csv("data/data.csv", d => {
//   console.log(d); 
// }
// );

//I use the data from knime csv writer
// -> column inside the file : Brand_Reg and count
// get it using GroupBy node in knime
// convert the count column to number using +d.count
//display data in console log to verify result
// d3.csv("data/data.csv", d => {
//   return {
//     brand: d.Brand_Reg,
//     count: +d.count  //=> converts to number
//   };

// }).then(data => {
//   console.log(data);
// });

//get length of data, max, min and array for min and max (using extent function)
// d3.csv("data/data.csv", d => {
//   return {
//     brand: d.Brand_Reg,
//     count: +d.count
//   };

// }).then(data => {
//   console.log(data);
//   console.log(data.length);
//   console.log(d3.max(data, d => d.count));
//   console.log(d3.min(data, d => d.count));
//   console.log(d3.extent(data, d => d.count)); //=> array with min and max
// }); 

// Sort data in descending order based on count 
//Logic: if b>a, return positive value -> b will be placed before a
d3.csv("data/data.csv", d => {
  return {
    brand: d.Brand_Reg,
    count: +d.count
  };
}).then(data => {
  data.sort((a, b) => b.count - a.count);
  console.log(data);

  createBarChart(data);
});

//Exercise 4.5
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
//   .selectAll("rect")
//   .data(data)
//   .join("rect")
//   .attr("class", d => {  //Assign class to each rectangle based on count value --> Style the rectangles using css
//     console.log(d);  //=> eg. {brand: "Brand A", count: 100}
//      return `bar bar-${d.count}`;   //=> class = "bar bar-100" for count 100, "bar bar-200" for count 200
//    })
//   };

//Set x,y position, width and height of each rectangle
const createBarChart = data => {
  const barHeight = 20; 
  const spacing = 5; // space between bars
  svg
    .selectAll("rect")
    .data(data)
    .join("rect")
      .attr("class", d => {
        console.log(d);
        return "bar";
      })
      .attr("width", d => d.count) //width of bar = count value
      .attr("height", barHeight) 
      .attr("x", 10)
      .attr("y", (d, i) => (barHeight + spacing) * i)  //position of bar = index * (bar height + spacing) , so is 0 for first bar, 1 for second bar, etc.
      .attr("fill", "steelblue"); //fill colour of bar
};


//Exercise 4.6
