function createBarChart() {

  var data = {
    labels: ["Trump", "Sanders", "Cruz", "Hillary"],

    series: [
      [5.6, 14, 12.6, 43.5]
    ]
  };
  var options = {
    seriesBarDistance: 10
  };

  var responsiveOptions = [
    ['screen and (max-width: 640px)', {
      seriesBarDistance: 5,
      axisX: {
        labelInterpolationFnc: function (value) {
          return value[0];
        }
      }
    }]
  ];

  new Chartist.Bar('.ct-chart', data, options, responsiveOptions);
}
  //trump 5654623.14
  //bernie 14088108.78
  //cruz 12593862.29
  //clinton 43457963.78
