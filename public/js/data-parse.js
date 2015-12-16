function dataTrump() {

  //load in csv, parse it for occuptions and count number of unique
  d3.csv("/trump_expenditures_all.csv")
    .row(function(d) {

      //extraction of occupation name
      //build the data counts
      var current = d.recipient_nm
      var money = parseInt(d.disb_amt)
      if (isNaN(money) || money <= 0)  return
      if (current && money) {
        occupationCountsTrump[current] = (current in occupationCountsTrump) ? occupationCountsTrump[current] + money : money
      }
    })
    .get(function(err, result) {
        // transform the data
      if (err) throw err
        //make into array of objects with key/value pairs in JSON format
      var _occKeysTrump = Object.keys(occupationCountsTrump).map(key => {
          return {
            occ: key,
            count: occupationCountsTrump[key],
            unique: true,
            name: "trump"
          }
        })
        //put in order and take top 500
      sortedTrump = _.sortBy(_occKeysTrump, function(o) {
        return o.count
      });
    })
}

function dataBernie() {
  d3.csv("/bernie_expenditures_all.csv")
    .row(function(d) {
      //extraction of occupation name
      //build the data counts

      var current = d.recipient_nm
      var money = parseInt(d.disb_amt)
        if (isNaN(money) || money <= 0)  return
      if (current) {
        occupationCountsBernie[current] = (current in occupationCountsBernie) ? occupationCountsBernie[current] + money : money
      }
    })
    .get(function(err, result) {
      // transform the data
      if (err) throw err
        //make into array of objects with key/value pairs in JSON format
      var _occKeysBernie = Object.keys(occupationCountsBernie).map(key => {
        return {
          occ: key,
          count: occupationCountsBernie[key],
          unique: true,
          name: "bernie"
        }
      })


      //when DATA is ready, THEN call function to create chart(d3.csv is asynch so this is a must)
      sortedBernie = _.sortBy(_occKeysBernie, function(o) {
        return o.count
      });

    })
}

function dataHillary() {
  console.log('called hillary');
  d3.csv("/clinton_expenditures_all.csv")
    .row(function(d) {
      //extraction of occupation name
      //build the data counts
      var current = d.recipient_nm
      var money = parseInt(d.disb_amt)
    if (isNaN(money) || money <= 0)  return
      //Guard against 0 or negative numbers

      if (current) {
        occupationCountsHillary[current] = (current in occupationCountsHillary) ? occupationCountsHillary[current] + money : money
      }
    })
    .get(function(err, result) {
      console.log("got to get");
      // transform the data
      if (err) throw err
        //make into array of objects with key/value pairs in JSON format
      var _occKeysHillary = Object.keys(occupationCountsHillary).map(key => {
        return {
          occ: key,
          count: occupationCountsHillary[key],
          unique: true,
          name: "hillary"
        }
      })
      //when DATA is ready, THEN call function to create chart(d3.csv is asynch so this is a must)
      sortedHillary = _.sortBy(_occKeysHillary, function(o) {
        return o.count
      }).slice(Math.max(_occKeysHillary.length - 500, 1));

    })
}

function dataCruz() {
  d3.csv("/cruz_expenditures_all.csv")
    .row(function(d) {
      //extraction of occupation name
      //build the data counts
      var current = d.recipient_nm
      var money = parseInt(d.disb_amt)
    if (isNaN(money) || money <= 0)  return
      if (current) {
        occupationCountsCruz[current] = (current in occupationCountsCruz) ? occupationCountsCruz[current] + money : money
      }
    })
    .get(function(err, result) {
      // transform the data
      if (err) throw err
        //make into array of objects with key/value pairs in JSON format
      var _occKeysCruz = Object.keys(occupationCountsCruz).map(key => {
        return {
          occ: key,
          count: occupationCountsCruz[key],
          unique: true,
          name: "cruz"
        }
      })

      //when DATA is ready, THEN call function to create chart(d3.csv is asynch so this is a must)
      sortedCruz = _.sortBy(_occKeysCruz, function(o) {
        return o.count
      });
    })
}
