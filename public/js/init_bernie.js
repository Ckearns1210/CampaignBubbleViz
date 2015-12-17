var findUniques = function() {
  //Concatonate all three arrays
  var all = sortedBernie.concat(sortedHillary).concat(sortedTrump).concat(sortedCruz);
  //flatten array of objects
  var count = all.reduce(function(ret, el) {
    ret[el.occ] = (ret[el.occ] || 0) + 1;
    return ret;
  }, {});
//check for unique and change boolean if unique
  all.forEach(function(el) {
    el.unique = count[el.occ] === 1;
  });
  //push into 3 new arrays
  all.forEach(function(item) {
    if (item.name === "trump") {
      sortedBooleanedTrump.push(item)
    } else if (item.name === "hillary") {
      sortedBooleanedHillary.push(item)
    } else if (item.name === "cruz") {
      sortedBooleanCruz.push(item)
    } else {
      sortedBooleanedBernie.push(item)
    }
  })
  myChart.init(sortedBooleanedBernie);
  myChart.toggle_unique('all');
}
