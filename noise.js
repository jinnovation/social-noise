"use strict";

var colorScheme = {
  bg: d3.rgb(14,255,0),
  text: [
    d3.rgb(255,238,0),
    d3.rgb(238,51,34),
    d3.rgb(0,119,238)
  ]
};

var fontSize = {
  min: 20,
  max: 40
};

function randRange(min, max) {
  return min + Math.floor(Math.random() * (max - min + 1));
}

(function () {
  var hashtagsFile       = "hashtags.txt"; // TODO: pull from Twitter API

  var entryPointSelector = "body";

  var margin             = { top: 30, right: 20, bottom: 30, left: 20 };
  var width              = 960 - margin.left - margin.right;
  var height             = 480 - margin.top - margin.bottom;

  var hashtagData;
  var hashtagText;

  var svg = d3.select(entryPointSelector)
    .append("svg")
    .attr("width", width)
    .attr("height", height)
    .attr("style", "background-color: " + colorScheme.bg + ";")
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
      .attr("font-size", function () {
        return randRange(fontSize.min, fontSize.max);
      })
      .attr("fill", function () {
        var randIndex = Math.floor(Math.random() * colorScheme.text.length);
        return colorScheme.text[randIndex];
      });
  }
})();
