

var margin = {top: 20, right: 20, bottom: 30, left: 50},
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

var parseDate = d3.time.format("%d-%b-%y").parse;

var x = d3.time.scale()
    .range([0, width]);

var y = d3.scale.linear()
    .range([height, 0]);

var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom");

var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left")
    .tickFormat(function(d) {
        return d.toFixed(1)+"%";
    })


var line = d3.svg.line()
    .x(function(d) { return x(d.date); })
    .y(function(d) { return y(d.unemployment_rate); });

    // type of scale, range of values, and domain - the values that are in the data set)

var svg = d3.select(".chart").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

d3.json("js/unemployment.json", function(error, data) {
  data.forEach(function(d) {
    d.date = parseDate(d.date);
  

  });

  x.domain(d3.extent(data, function(d) { return d.date; }));
  y.domain(d3.extent(data, function(d) { return d.unemployment_rate; }));

  //domain and extent means the highest and lowest value

  svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis);

  svg.append("g")
      .attr("class", "y axis")
      .call(yAxis)
    .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .text("Unemployment Rate");

  svg.append("path")
      .datum(data)
      .attr("class", "line")
      .attr("d", line);

  svg.selectAll(".dot")
  .data(data)
  .enter()
  .append("circle")
  .attr("cx", function(d) {
    return x(d.date);
  })
  .attr("cy", function(d) {
      return y(d.unemployment_rate);
  })
  .attr("r", 3)
  .on("mouseover", function(d) {
    var dispDate = moment(d.date).format("MM Dd YY");
    $(".tt").html(
      "<div class='date'>"+dispDate+"</div>"+
      "<div class='val'>"+d.unemployment_rate+"</div>"

      )

    $(".tt").show();

})

  .on("mouseout", function(d) {
    $(".tt").hide();
  })
  .on("mousemove", function(d) {
    var pos = d3.mouse(this);
    

    $(".tt").css({
        "left" : left + "px",
        "top " : top + "px"
    })

  })

});