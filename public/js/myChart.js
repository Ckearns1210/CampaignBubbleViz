//https://github.com/chriswhong/bubblecharge/blob/master/index.html, https://github.com/vlandham/bubble_cloud were of great help
//inspiration: http://www.nytimes.com/interactive/2012/02/13/us/politics/2013-budget-proposal-graphic.html?_r=0

var myChart = (function(d3) {

  //Prepare viz div
  var margin = {
      top: 0,
      right: 0,
      bottom: 0,
      left: 0
    },
    layout_gravity = -0.01,
    force = d3.layout.force(),
    circle,
    nodes = [];
    width = $(window).width() - margin.left - margin.right,
    height = $(window).height() - margin.top - margin.bottom,
    n = 6,
    m = 1,
    padding = 6,
    radius = d3.scale.sqrt().range([0, 12]),
    // color = d3.scale.category10().domain(d3.range(m)),
    x = d3.scale.ordinal().domain(d3.range(m)).rangePoints([0, width], 1),
    center = {
      x: width / 1.8,
      y: height / 2.0
    },

    unique_centers = {
      true: {
        x: width / 2.2,
        y: height / 2.0
      },
      false: {
        x: 1.5 * width / 2.2,
        y: height / 2.0
      }
    },
    damper = .1;
  //Initialize Tooltip Caged d3 Tooltip
  tip = d3.tip().attr('class', 'd3-tip').html(function(d) {
    return d;
  });


  var d3DataReady = function(data) {
    tip = d3.tip()
      .attr('class', 'd3-tip')
      .html(function(d) {
        return "<span>" + "Recipient Name: " + toTitleCase(d.occ) + "<br>" + "<br>"+ "Amount Paid: " + "$" + numberWithCommas(d.contributors) + "</span>"
      })
      .direction('nw')
      .offset([0, 3])

    var max_amount = d3.max(data, function(d) {
        return parseInt(d.count, 10);
      }),
      radius_scale = d3.scale.pow()
      .exponent(0.55)
      .domain([0, max_amount])
      .range([3, 100])


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
        x: parseInt(Math.random() * 10),
        y: parseInt(Math.random() * 10)
      }
      nodes.push(node);
    });

    var svg = d3.select("#viz")
      .append("svg")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
      .attr("viewBox", "0 0 " + width + " " + height)
      .call(tip)

    circle = svg.selectAll("circle")
      .data(nodes).enter().append("circle")
      .attr("r", function(d) {
        return d.radius;
      })
      .attr("class", function(d) {
        return "occupation " + d.occ;
      }).style("fill", function(d) {
        if (d.unique == false) {
          return '#FD7B46';
        } else {
          return '#036F91'
        }
      }).call(force.drag)
      .on('mouseover', tip.show)
      .on('mouseout', tip.hide)

    circle.transition().duration(2000).attr("r", function(d) {
      return d.radius;
    })
  };

  function charge(d) {
    return -Math.pow(d.charge, 2.0) / 8;
  };

  function start() {
    force = d3.layout.force()
      .nodes(nodes)
      .size([width, height]);
  }

  function display_all() {
    force.gravity(layout_gravity)
      .charge(charge)
      .on("tick", function(e) {
        circle.each(move_center(e.alpha))
          .attr("cx", function(d) {
            return d.x;
          })
          .attr("cy", function(d) {
            return d.y;
          });
      })
    force.start();
  }

  function display_unique() {
    force.gravity(layout_gravity)
      .charge(charge)
      .on("tick", function(e) {
        circle.each(move_unique(e.alpha))
          .attr("cx", function(d) {
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

  var toggler = {};
  toggler.init = function(_data) {
    d3DataReady(_data);
    start();
  }

  toggler.display_all = display_all;
  toggler.display_unique = display_unique;

  toggler.toggle_unique = function(view) {
    if (view == 'unique') {
      display_unique();
    } else {
      display_all();
    }
  }
  return toggler;
})(d3)
