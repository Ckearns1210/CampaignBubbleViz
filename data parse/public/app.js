console.log("i work")

$(document).ready(function() {
  dataTrump();
  dataHillary();
  dataBernie();
  dataCruz();
  chartMaker();
});


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

//Could be dried up very easily.

function dataTrump() {
  //Variable names need to be changed, still represent original DATA of occupations
  d3.csv("/trump_expenditures_all.csv")
    .row(function(d) {
      //Make one giant object with the keys as the recipient name and the values the amount (add amount each time)
      var current = d.recipient_nm
      var money = parseInt(d.disb_amt)
      //Guard against NaN and zeros and negatives
      if (isNaN(money) || money <= 0) return
      //Make singular objects with key values and add money
      if (current && money) {
        occupationCountsTrump[current] = (current in occupationCountsTrump) ? occupationCountsTrump[current] + money : money
      }
    })
    .get(function(err, result) {
      // transform the data
      if (err) throw err
        //make into array of objects with key/value pairs in JSON format, add unqiue boolean and candidate name
      var _occKeysTrump = Object.keys(occupationCountsTrump).map(function(key) {
          return {
            occ: key,
            count: occupationCountsTrump[key],
            unique: true,
            name: "trump"
          }
        })
        // sort array
      sortedTrump = _.sortBy(_occKeysTrump, function(o) {
        return o.count
      });
    })
}

function dataBernie() {
  d3.csv("/bernie_expenditures_all.csv")
    .row(function(d) {
      var current = d.recipient_nm
      var money = parseInt(d.disb_amt)
      if (isNaN(money) || money <= 0) return
      if (current) {
        occupationCountsBernie[current] = (current in occupationCountsBernie) ? occupationCountsBernie[current] + money : money
      }
    })
    .get(function(err, result) {
      // transform the data
      if (err) throw err
        //make into array of objects with key/value pairs in JSON format
      var _occKeysBernie = Object.keys(occupationCountsBernie).map(function(key) {
        return {
          occ: key,
          count: occupationCountsBernie[key],
          unique: true,
          name: "bernie"
        }
      })
      sortedBernie = _.sortBy(_occKeysBernie, function(o) {
        return o.count
      });
    })
}

function dataHillary() {
  console.log('called hillary');
  d3.csv("/clinton_expenditures_all.csv")
    .row(function(d) {
      var current = d.recipient_nm
      var money = parseInt(d.disb_amt)
      if (isNaN(money) || money <= 0) return
      if (current) {
        occupationCountsHillary[current] = (current in occupationCountsHillary) ? occupationCountsHillary[current] + money : money
      }
    })
    .get(function(err, result) {
      console.log("got to get");
      // transform the data
      if (err) throw err
        //make into array of objects with key/value pairs in JSON format
      var _occKeysHillary = Object.keys(occupationCountsHillary).map(function(key) {
          return {
            occ: key,
            count: occupationCountsHillary[key],
            unique: true,
            name: "hillary"
          }
        })
      sortedHillary = _.sortBy(_occKeysHillary, function(o) {
        return o.count
      }).slice(Math.max(_occKeysHillary.length - 400, 1));

    })
}

function dataCruz() {
  d3.csv("/cruz_expenditures_all.csv")
    .row(function(d) {
      //extraction of occupation name
      //build the data counts
      var current = d.recipient_nm
      var money = parseInt(d.disb_amt)
      if (isNaN(money) || money <= 0) return
      if (current) {
        occupationCountsCruz[current] = (current in occupationCountsCruz) ? occupationCountsCruz[current] + money : money
      }
    })
    .get(function(err, result) {
      if (err) throw err
      var _occKeysCruz = Object.keys(occupationCountsCruz).map(function(key) {
          return {
            occ: key,
            count: occupationCountsCruz[key],
            unique: true,
            name: "cruz"
          }
        })
      sortedCruz = _.sortBy(_occKeysCruz, function(o) {
        return o.count
      }).slice(Math.max(_occKeysCruz.length - 500, 1));
    })
}

var findUniques = function() {
  //Concatonate all three arrays
  var all = sortedBernie.concat(sortedHillary).concat(sortedTrump).concat(sortedCruz);
  //flatten array of objects
  var count = all.reduce(function(ret, el) {
    ret[el.expenditure] = (ret[el.expenditure] || 0) + 1;
    return ret;
  }, {});
//check for unique and change boolean if unique
  all.forEach(function(el) {
    el.unique = count[el.expenditure] === 1;
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
}

function chartMaker() {
  if (_.isEmpty(sortedTrump) || _.isEmpty(sortedHillary) || _.isEmpty(sortedBernie) || _.isEmpty(sortedCruz)) {
    setTimeout(chartMaker, 100)
    console.log("running recursion");
  } else {
    findUniques();
  }
};
