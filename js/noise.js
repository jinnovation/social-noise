"use strict";

(function () {
  var hashtagData;
  var hashtagText;

  var svg = d3.select(entryPointSelector)
    .append("svg")
    .attr("width", "100%")
    .attr("height", "100%");

  svg.attr("style", "background-color: " + colorScheme.bg + ";");

  var textGroup = svg.append("g")
    .attr("id", "hashtags")
    .attr("class", "container")

  var titleGroup = svg.append("g")
    .attr("id", "title");

  titleGroup.append("rect")
    .attr("x", (width/2) - (width / 3 / 2))
    .attr("y", (height/2) - (height / 3 / 2))
    .attr("width", width / 3)
    .attr("height", height / 3)
    .attr("fill", d3.rgb(255,255,255))
    .attr("fill-opacity", 0.6);
  // TODO: append title text and author text to title card

  dsv(hashtagsFile, function (error, data) {
    hashtagData = data;

    hashtagText = textGroup.selectAll("text")
      .data(hashtagData)
      .enter()
      .append("text")
      .attr("class", "hashtag")
      .text(function (d) { return d.tag; });

    hashtagText
      .attr("x", function (d) { return Math.floor(Math.random() * width); })
      .attr("y", function (d) { return Math.floor(Math.random() * height); });

    // TODO: randomize periodically
    hashtagText.attr("font-family", function () {
      return font.faces[Math.floor(Math.random() * font.faces.length)];
    });

    // TODO: randomize periodically
    hashtagText.attr("font-size", font.size.rand);

    hashtagText.attr("fill", colorScheme.text.rand);

    update();
  });

  function update() {
    hashtagText.transition()
      .each(hashtagTransition);

    function hashtagTransition () {
      var text = d3.select(this);

      (function repeat() {
        text.transition()
          .delay(function () { return Math.floor(Math.random() * 200); })
          .duration(transition.speed.rand)
          .attr("x", function () { return Math.floor(Math.random() * width); })
          .attr("y", function () { return Math.floor(Math.random() * height); })
          .attr("fill", colorScheme.text.rand)
          // FIXME: implement different duration for fill and position
          // FIXME: implement efficient transition for font size
          .each("end", repeat);

        // TODO: randomly push hashtag elements to front 
      })();
    }
  }
})();
