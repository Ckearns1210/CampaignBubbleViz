$(document).ready(function() {
  dataTrump();
  dataHillary();
  dataBernie();
  dataCruz();
  chartMaker()
  $('.unique').click(function() {
    myChart.toggle_unique('unique')
  })
  $('.all').click(function() {
      myChart.toggle_unique('all')
    })
});
