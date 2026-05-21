//no.1 Ex5_TV_energy - Scatter Plot
d3.csv("data/Exercise_5/Ex5_TV_energy.csv", d => {
  return {
    Energy_Consumption: +d.energy_consumpt,
    Star2: +d.star2
  };
}).then(data => {
  data.sort((a, b) => b.Star2 - a.Star2); //After the data is loaded, Sort the data in descending order
  console.log(data);

  createScatterPlot(data);
});

//no.2 Ex5_TV_energy_Allsizes_byScreenType - Donut Chart
d3.csv("data/Exercise_5/Ex5_TV_energy_Allsizes_byScreenType.csv", d => {
  return {
    Screen_Technology: d.Screen_Tech,
    Energy_Consumption: +d["Mean(Labelled energy consumption (kWh/year))"]
  };
}).then(data => {
  data.sort((a, b) => b.Energy_Consumption - a.Energy_Consumption); //After the data is loaded, the sort() method reorders the entire data array in descending order based on the energy consumption value.
  console.log(data);

  createDonutChart(data);
});

//no.3 Ex5_TV_energy_55inchtv_byScreenType - Bar Chart
d3.csv("data/Exercise_5/Ex5_TV_energy_55inchtv_byScreenType.csv", d => {
  return {
    Screen_Technology: d.Screen_Tech,
    Energy_Consumption: +d["Mean(Labelled energy consumption (kWh/year))"]
  };
}).then(data => {
  data.sort((a, b) => b.Energy_Consumption - a.Energy_Consumption); //After the data is loaded, the sort() method reorders the entire data array in descending order based on the energy consumption value.
  console.log(data);

  createBarChart(data);
});

//no.4 Ex5_ARE_Spot_Prices - Line Chart
d3.csv("data/Exercise_5/Ex5_ARE_Spot_Prices.csv", d => {
  return {
    Year: +d.Year,
    Queensland: +d["Queensland ($ per megawatt hour)"],
    New_South_Wales: +d["New South Wales ($ per megawatt hour)"],
    Victoria: +d["Victoria ($ per megawatt hour)"],
    South_Australia: +d["South Australia ($ per megawatt hour)"],
    Tasmania: +d["Tasmania ($ per megawatt hour)"],
    Snowy: +d["Snowy ($ per megawatt hour)"]

  };
}).then(data => {
  data.sort((a, b) => a.Year - b.Year);  //smaller year - larger year = negative result -> ascending order
  console.log(data);

  createLineChart(data);
});


