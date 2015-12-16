var occupationCountsTrump = {}
var sortedTrump = [];
var sortedBooleanedTrump = [];

var occupationCountsHillary = {}
var sortedHillary = [];
var sortedBooleanedHillary = [];

var occupationCountsBernie = {}
var sortedBernie = [];
var sortedBooleanedBernie = [];

var occupationCountsCruz = {}
var sortedCruz = [];
var sortedBooleanCruz = [];


function chartMaker() {
  if (_.isEmpty(sortedTrump) || _.isEmpty(sortedHillary) || _.isEmpty(sortedBernie) || _.isEmpty(sortedCruz)) {
    setTimeout(chartMaker, 100)
    console.log("running recursion");
  } else {
    findUniques();
  }
};

function toTitleCase(str) {
  return str.replace(/\w\S*/g, function(txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
}

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
