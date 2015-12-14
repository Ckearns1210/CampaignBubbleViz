$(document).ready(function() {
  dataTrump();
  dataHillary();
  dataBernie();

  var chartMaker = function() {
    if (_.isEmpty(sortedTrump) || _.isEmpty(sortedHillary) || _.isEmpty(sortedBernie)) {

      setTimeout(chartMaker, 100)
    } else {

      findUniques();
    }
  };
  chartMaker()
    //end on load
});
//global variables to store occupation object when CSV is parsed, the sortedArrays after they have been given new key values and sorted, and the final array with proper booleans for is Unique

var occupationCountsTrump = {}
var sortedTrump = [];
var sortedBooleanedTrump = [];

var occupationCountsHillary = {}
var sortedHillary = [];
var sortedBooleanedHillary = [];

var occupationCountsBernie = {}
var sortedBernie = [];
var sortedBooleanedBernie = [];

var findUniques = function() {
  //Concatonate all three arrays
  var all = sortedBernie.concat(sortedHillary).concat(sortedTrump);
  //reduce the array
  var count = all.reduce(function(ret, el) {
    ret[el.occ] = (ret[el.occ] || 0) + 1;
    return ret;
  }, {});

  //find uniques and change boolean
  all.forEach(function(el) {
    el.unique = count[el.occ] === 1;
  });
  //push into 3 new arrays

  all.forEach(function(item) {
    if (item.name === "trump") {
      sortedBooleanedTrump.push(item)
    } else if (item.name === "hillary") {
      sortedBooleanedHillary.push(item)
    } else {
      sortedBooleanedBernie.push(item)
    }
  })
  d3DataReady(sortedBooleanedTrump)
}


var dataTrump = function() {

  //load in csv, parse it for occuptions and count number of unique
  d3.csv("/trump_contributor_all.csv")
    .row(function(d) {
      //extraction of occupation name
      //build the data counts
      var current = d.contbr_occupation

      if (current) {
        occupationCountsTrump[current] = (current in occupationCountsTrump) ? occupationCountsTrump[current] + 1 : 1;
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
      }).slice(Math.max(_occKeysTrump.length - 500, 1));

    })
}

var dataBernie = function() {
  d3.csv("/bernie_contributors_all.csv")
    .row(function(d) {
      //extraction of occupation name
      //build the data counts
      var current = d.contbr_occupation
      if (current) {
        occupationCountsBernie[current] = (current in occupationCountsBernie) ? occupationCountsBernie[current] + 1 : 1
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
      }).slice(Math.max(_occKeysBernie.length - 500, 1));

    })
}

var dataHillary = function() {
  d3.csv("/clinton_contributors_all.csv")
    .row(function(d) {
      //extraction of occupation name
      //build the data counts
      var current = d.contbr_occupation
      if (current) {
        occupationCountsHillary[current] = (current in occupationCountsHillary) ? occupationCountsHillary[current] + 1 : 1
      }
    })
    .get(function(err, result) {
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



//Utility function
function toTitleCase(str) {
  return str.replace(/\w\S*/g, function(txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
}

var toggleColor = (function() {
  var currentColor = "#2C2C2C";

  return function() {
    $('circle').css('stroke', '#2C2C2C')
    currentColor = currentColor == "#2C2C2C" ? "red" : "#2C2C2C";
    d3.select(this).style("stroke", currentColor);
  }
})();


//Utility function
// function toTitleCase(str) {
//   return str.replace(/\w\S*/g, function(txt) {
//     return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
//   });
// }
//
// var toggleColor = (function() {
//   var currentColor = "#2C2C2C";
//
//   return function() {
//     $('circle').css('stroke', '#2C2C2C')
//     currentColor = currentColor == "#2C2C2C" ? "red" : "#2C2C2C";
//     d3.select(this).style("stroke", currentColor);
//   }
// })();

//https://github.com/chriswhong/bubblecharge/blob/master/index.html, https://github.com/vlandham/bubble_cloud were of great help
//inspiration: http://www.nytimes.com/interactive/2012/02/13/us/politics/2013-budget-proposal-graphic.html?_r=0

//Prepare viz div
var margin = {
    top: 200,
    right: 200,
    bottom: 200,
    left: 200
  },
  width = $('#viz').width() - margin.left - margin.right,
  height = $(window).height() - margin.top - margin.bottom,
  n = 6,
  m = 1,
  padding = 6,
  radius = d3.scale.sqrt().range([0, 12]),
  color = d3.scale.category10().domain(d3.range(m)),
  x = d3.scale.ordinal().domain(d3.range(m)).rangePoints([0, width], 1),
  center = {
    x: width / 2,
    y: height / 2
  },

  unique_centers = {
    true: {
      x: width / 3,
      y: height / 2
    },
    false: {
      x: 2 * width / 3,
      y: height / 2
    }
  },
  damper = .1;
//Initialize Tooltip Caged d3 Tooltip
tip = d3.tip().attr('class', 'd3-tip').html(function(d) {
  return d;
});


var d3DataReady = function(data) {
    var tip = d3.tip()
      .attr('class', 'd3-tip')
      .html(function(d) {
        return "<span>" + toTitleCase(d.occ) + ", " + d.contributors + " contributors" + "</span>"
      })
      .direction('nw')
      .offset([0, 3])

    var max_amount = d3.max(data, function(d) {
        return parseInt(d.count);
      }),
      radius_scale = d3.scale.pow()
      .exponent(0.55)
      .domain([0, max_amount])
      .range([3, 100]),
      nodes = [];


    data.forEach(function(d, i) {
      var node;
      node = {
        id: i,
        unique: d.unique,
        occ: d.occ,
        radius: radius_scale(d.count),
        charge: radius_scale(d.count),
        name: d.name,
        contributors: d.count,
        cx: Math.random() * 10,
        cy: Math.random() * 10
      }
      nodes.push(node);
    });

    var charge = function(d) {
      return -Math.pow(d.charge, 2.0) / 8;
    };


    var force = d3.layout.force()
      .nodes(nodes)
      .size([width, height]);
      display_unique();


    function display_all() {
      force.gravity(-.01)
        .charge(charge)
        .on("tick", function(e) {
          circle.each(move_center(e.alpha))
            .attr("cx", function(d) {

              return d.x
            })
            .attr("cy", function(d) {
              return d.y
            });
        })
      force.start();
    }

    function display_unique() {
      force.gravity(-.01)
        .charge(charge)
        .on("tick", function(e) {
          circle.each(move_unique(e.alpha))
          .attr("cx", function(d) {
            debugger;
            return d.x
        })
          .attr("cy", function(d) {
            return d.y
          })

    })
        force.start();
  }

    function move_center(e) {
      return function(d) {
        d.x = d.x + (center.x - d.x) * (damper + 0.02) * e;
        d.y = d.y + (center.y - d.y) * (damper + 0.02) * e;
      };
    }

    function move_unique(e) {
      return function(d) {
        var target = unique_centers[d.unique]
        d.x = d.x + (target.x - d.x) * (damper + 0.02) * e * 1.1;
        d.y = d.y + (target.y - d.y) * (damper + 0.02) * e * 1.1;
      }
    }
    // function tick2(e) {
    //   circle.attr("cx", function(d) {
    //     var target = unique_centers[d.unique]
    //     return d.x + (target.x - d.x) * (damper + 0.02) * e.alpha * 1.1;
    //   }).attr("cy", function(d) {
    //     var target = unique_centers[d.unique]
    //     return d.y + (target.y - d.y) * (damper + 0.02) * e.alpha * 1.1;
    //   });
    // }

    // console.log(charge)
    // var force = d3.layout.force()
    //   .nodes(nodes)
    //   .size([width, height])
    //   .gravity(.1)
    //   .charge(charge)
    //   .on("tick", tick)
    //   .start();
    //
    // function tick(e) {
    //   circle.attr("cx", function(d) {
    //     return d.x + (center.x - d.x) * (damper + 0.02) *
    //       e.alpha;
    //   }).attr("cy", function(d) {
    //     return d.y + (center.y - d.y) * (damper + 0.02) *
    //       e.alpha;
    //   });
    // }
    var svg = d3.select("#viz")
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
      .call(tip)

    var circle = svg.selectAll("circle")
      .data(nodes).enter().append("circle")
      .attr("r", function(d) {
        return d.radius;
      })
      .attr("class", function(d) {
        return "occupation " + d.occ;
      }).style("fill", function(d) {
        return d.color;
      }).call(force.drag)
      .on('mouseover', tip.show)
      .on('mouseout', tip.hide)
      .on('click', toggleColor)

    circle.transition().duration(2000).attr("r", function(d) {
      return d.radius;
    })




    // Move nodes toward cluster focus.

    function gravity(alpha) {
      return function(d) {
        d.y += (d.cy - d.y) * alpha;
        d.x += (d.cx - d.x) * alpha;
      };
    }
    // Resolve collisions between nodes.

    function collide(alpha) {
      var quadtree = d3.geom.quadtree(nodes);
      return function(d) {
        var r = d.radius + radius.domain()[1] + padding,
          nx1 = d.x - r,
          nx2 = d.x + r,
          ny1 = d.y - r,
          ny2 = d.y + r;
        quadtree.visit(function(quad, x1, y1, x2, y2) {
          if (quad.point && (quad.point !== d)) {
            var x = d.x - quad.point.x,
              y = d.y - quad.point.y,
              l = Math.sqrt(x * x + y * y),
              r = d.radius + quad.point.radius +
              (d.color !== quad.point.color) *
              padding;
            if (l < r) {
              l = (l - r) / l * alpha;
              d.x -= x *= l;
              d.y -= y *= l;
              quad.point.x += x;
              quad.point.y += y;
            }
          }
          return x1 > nx2 || x2 < nx1 || y1 > ny2 ||
            y2 < ny1;
        });
      };
    }
  } //end d3DataReady
