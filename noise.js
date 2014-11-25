"use strict";

(function () {
  var colorScheme = {
    bg: d3.rgb(14,255,0),
    text: [
      d3.rgb(255,238,0),
      d3.rgb(238,51,34),
      d3.rgb(0,119,238),
      d3.rgb(249, 14, 241),
      d3.rgb(255,255,255),
      d3.rgb(195,255,104)
    ]
  };

  var font = {
    size: {
      min: 20,
      max: 60,
      rand: function () {
        var size = font.size.min
          + Math.floor(Math.random() * (font.size.max - font.size.min));
        return size;
      }
    },
    faces: [
      "cursive",
      "fantasy",
      "monospace",
    ]
  };

  var transition = {
    speed: {
      min: 100,
      max: 800,
      rand: function () {
        var speed = transition.speed.min + Math.floor(Math.random() * (transition.speed.max - transition.speed.min));

        return speed;
      }
    }
  }

  var hashtagsFile       = "hashtags.txt"; // TODO: pull from Twitter API

  function randRange(min, max) {
    return min + Math.floor(Math.random() * (max - min + 1));
  }

  var entryPointSelector = "body";

  var margin             = { top: 30, right: 20, bottom: 30, left: 20 };
  var width              = 960 - margin.left - margin.right;
  var height             = 480 - margin.top - margin.bottom;

  var hashtagData;
  var hashtagText;

  var svg = d3.select(entryPointSelector)
    .append("svg")
    .attr("width", width)
    .attr("height", height);

  svg.attr("style", "background-color: " + colorScheme.bg + ";");

  svg
    .append("g")
    .attr("id", "hashtags")
    .attr("class", "container")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  var dsv = d3.dsv("\n", "text/plain");

  dsv(hashtagsFile, function (error, data) {
    hashtagData = data;

    update();
  })

  function getRandomFill () {
    var randIndex = Math.floor(Math.random() * colorScheme.text.length);
    return colorScheme.text[randIndex];
  }

  function update() {
    hashtagText = svg.selectAll("text")
      .data(hashtagData)
      .enter()
      .append("text")
      .attr("class", "hashtag")
      .text(function (d) { return d.tag; });

    hashtagText
      .attr("x", function (d) { return Math.random() * width; })
      .attr("y", function (d) { return Math.random() * height; });

    // TODO: randomize periodically
    hashtagText.attr("font-family", function () {
      return font.faces[Math.floor(Math.random() * font.faces.length)];
    });

    // TODO: randomize periodically
    hashtagText.attr("font-size", font.size.rand);

    hashtagText.attr("fill", getRandomFill);

    hashtagText.transition()
      .each(hashtagTransition);

    function hashtagTransition () {
      var text = d3.select(this);

      (function repeat() {
        text.transition()
          .delay(function () { return Math.floor(Math.random() * 10); })
          .duration(transition.speed.rand)
          .attr("x", function () { return Math.floor(Math.random() * width); })
          .attr("y", function () { return Math.floor(Math.random() * height); })
          .attr("fill", getRandomFill)
          // FIXME: implement different duration for fill and position
          // FIXME: implement efficient transition for font size
          .each("end", repeat);
      })();
    }
  }
})();
