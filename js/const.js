var dsv = d3.dsv("\n", "text/plain");

var dimensions = {
  master: {
    height: 1080,
    width: 1920,
  },

  margin: {
    top: 30, 
    right: 20, 
    bottom: 30, 
    left: 20 
  }
}
var width  = dimensions.master.width - dimensions.margin.left - dimensions.margin.right;
var height = dimensions.master.height - dimensions.margin.top - dimensions.margin.bottom;

var colorScheme = {
  bg: d3.rgb(14,255,0),
  text: {
    values: [
      d3.rgb(255,238,0),
      d3.rgb(238,51,34),
      d3.rgb(0,119,238),
        d3.rgb(249, 14, 241),
        d3.rgb(255,255,255),
          d3.rgb(195,255,104)
    ],
    rand: function () {
      var randIndex = Math.floor(Math.random() 
          * colorScheme.text.values.length);
      return colorScheme.text.values[randIndex];
    }
  }
};

var font = {
  size: {
    max: Math.floor((height * width) / 7860),
    min: Math.floor((height * width) / 7860) / 3,
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
      var speed = transition.speed.min 
        + Math.floor(Math.random() 
            * (transition.speed.max - transition.speed.min));

      return speed;
    }
  }
}

var hashtagsFile = "hashtags.txt"; // TODO: pull from Twitter API

var entryPointSelector = "body";
