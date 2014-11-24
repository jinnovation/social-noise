"use strict";

(function () {

  var hashtagsFile = "hashtags.txt";

  var entryPointSelector = "body";

  var margin    = {top: 30, right: 20, bottom: 30, left: 20};
  var width     = 960 - margin.left - margin.right;

  var svg = d3.select(entryPointSelector)
    .append("svg")
    .attr("width", width)
    .attr("height", "1000");

  var dsv = d3.dsv("\n", "text/plain");

  var hashtags;
  dsv(hashtagsFile, function (error, data) {
    hashtags = data;

    update();
  })

  function update() {
    svg.selectAll("text")
      .data(hashtags)
      .enter()
      .append("text")
      .attr("x", margin.left)
      .attr("y", margin.top)
      .text(function (d) { return d.tag; })
      .attr("font-family", "sans-serif")
      .attr("font-size", "20px")
      .attr("fill", "black");
  }
})();
