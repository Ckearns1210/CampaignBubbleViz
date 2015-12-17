$(document).ready(function() {
  dataTrump();
  dataHillary();
  dataBernie();
  dataCruz();
  chartMaker();
  $('.modal-trigger').leanModal();
  $('.all').addClass('active');
  $('.unique').click(function() {
    $('.all').removeClass('active');
    myChart.toggle_unique('unique')
    $('.unique').addClass('active');
  })
  $('.all').click(function() {
      $('.unique').removeClass('active');
      myChart.toggle_unique('all')
      $('.all').addClass('active');
    })
});
