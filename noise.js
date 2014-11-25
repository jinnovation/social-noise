"use strict";

(function () {
  var hashtagsFile       = "hashtags.txt"; // TODO: pull from Twitter API 

  var entryPointSelector = "body";

  var margin             = { top: 30, right: 20, bottom: 30, left: 20};
  var width              = 960 - margin.left - margin.right;
  var height = 480 - margin.top - margin.bottom;

  var hashtagData;
  var hashtagText;

  var svg = d3.select(entryPointSelector)
    .append("svg")
    .attr("width", width)
    .attr("height", height)
    .append("g")
    .attr("id", "hashtags")
    .attr("class", "container")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  var dsv = d3.dsv("\n", "text/plain");

  dsv(hashtagsFile, function (error, data) {
    hashtagData = data;

    update();
  })

  function update() {
    hashtagText = svg.selectAll("text")
      .data(hashtagData)
      .enter()
      .append("text")
      .attr("class", "hashtag")
      .text(function (d) { return d.tag; })
      .attr("x", function (d) { return Math.random() * width; })
      .attr("y", function (d) { return Math.random() * height;});

    hashtagText
      .attr("font-family", "sans-serif") // TODO: set font elsewhere
      .attr("font-size", "20px") // TODO: randomize 
      .attr("fill", "black"); // TODO: randomize 
  }
})();
