var chartDiv = document.getElementById("chart");
var svg = d3.select(chartDiv).append("svg");


var defs = svg.append("defs");

//Filter for the outside glow of the stars
var filter = defs.append('filter').attr('id', 'glow'),
  feGaussianBlur = filter.append('feGaussianBlur').attr('stdDeviation','2').attr('result','coloredBlur'),
  feMerge = filter.append('feMerge');
  feMerge.append('feMergeNode').attr('in','coloredBlur');
  feMerge.append('feMergeNode').attr('in','SourceGraphic');


var colors = ["#FB1108","#FD150B","#FA7806","#FBE426","#FCFB8F","#F3F5E7","#C7E4EA","#ABD6E6","#9AD2E1","#42A1C1","#1C5FA5", "#172484"];
var sponseesNumber = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20];
var colorScale = d3.scaleLinear()
    .domain(sponseesNumber)
    .range(colors);

var redraw = function(graph) {
// Extract the width and height that was computed by CSS.
  var width = chartDiv.clientWidth;
  var height = chartDiv.clientHeight;

  // Use the extracted size to set the size of an SVG element.
  svg
    .attr("width", width)
    .attr("height", height)
    .call(d3.zoom().on("zoom", zoom));

  function zoom() {
    link.attr("transform", d3.event.transform);
    node.attr("transform", d3.event.transform);
  }

  var simulation = d3.forceSimulation()
      .force("link", d3.forceLink().id(function(d) { return d.id; }))
      .force("charge", d3.forceManyBody())
      .force("center", d3.forceCenter(width / 2, height / 2));

    var link = svg.append("g")
        .attr("class", "links")
      .selectAll("line")
      .data(graph.links)
      .enter().append("line")
        .style("filter", "url(#glow)")
        .style("fill", function(d, i){return "url(#gradCenter-" + i + ")";})
        .attr("stroke-width", function(d) { return 1; });



    var node = svg.selectAll(".node")
        .data(graph.nodes)
        .enter().append("g")
        .attr("class", "node");

    node.append("title")
        .text((d) => d.id);

    node.append("circle")
        .style("filter", "url(#glow)")
        .style("fill", function(d, i){return "url(#gradCenter-" + i + ")";})
        .attr("r", function(d) {return d.value*3})

    node.append("text")
        .attr("dy", ".3em")
        .style("text-anchor", "middle")
        .text(function(d) { return d.id; })
    ;

    // var node = svg.append("g")
    //     .attr("class", "nodes")
    //   .selectAll("circle")
    //   .data(graph.nodes)
    //   .enter().append("circle")
        // .style("filter", "url(#glow)")
        // .style("fill", function(d, i){return "url(#gradCenter-" + i + ")";})
        // .attr("r", function(d) {return d.value})
    //     .call(d3.drag()
    //         .on("start", dragstarted)
    //         .on("drag", dragged)
    //         .on("end", dragended));

    //Create data based gradients for each star - based on center glow
    var gradientCenter = defs.selectAll(".gradientCenter")
      .data(graph.nodes).enter()
      .append("radialGradient")
      .attr("class", "gradientCenter")
      .attr('id', function(d, i){ return "gradCenter-"+i; })

    gradientCenter.append("stop")
      .attr("offset", "0%")
      .attr("stop-color", function(d) { return d3.rgb(colorScale(d.value)).brighter(1.75); });
    gradientCenter.append("stop")
      .attr("offset", "60%")
      .attr("stop-color", function(d) { return d3.rgb(colorScale(d.value)).brighter(0.7); });
    gradientCenter.append("stop")
      .attr("offset", "90%")
      .attr("stop-color", function(d) { return colorScale(d.value); }); 
    gradientCenter.append("stop")
      .attr("offset",  "110%")
      .attr("stop-color", function(d) { return d3.rgb(colorScale(d.value)).darker(0.5); });

    // node.append("title")
    //     .text(function(d) { return d.id; });

    simulation
        .nodes(graph.nodes)
        .on("tick", ticked);

    simulation.force("link")
        .links(graph.links);

    function ticked() {
      link
          .attr("x1", function(d) { return d.source.x; })
          .attr("y1", function(d) { return d.source.y; })
          .attr("x2", function(d) { return d.target.x; })
          .attr("y2", function(d) { return d.target.y; });

      node.select('circle')
          .attr("cx", function(d) { return d.x; })
          .attr("cy", function(d) { return d.y; });

      node.select('text')
        .attr("x", function(d) { return d.x; })
        .attr("y", function(d) { return d.y; });
    }

  function dragstarted(d) {
    if (!d3.event.active) simulation.alphaTarget(0.3).restart();
    d.fx = d.x;
    d.fy = d.y;
  }

  function dragged(d) {
    d.fx = d3.event.x;
    d.fy = d3.event.y;
  }

  function dragended(d) {
    if (!d3.event.active) simulation.alphaTarget(0);
    d.fx = null;
    d.fy = null;
  }
}

d3.json("data/sponsorship.json", function(error, graph) {
    if (error) throw error;
    redraw(graph);
})
