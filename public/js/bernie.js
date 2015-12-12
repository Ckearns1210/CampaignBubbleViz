
//global variable to store occupation object when CSV is parsed
var occupationCounts = {}
//load in csv, parse it for occuptions and count number of unique
d3.csv("/bernie_contributors_all.csv")
  .row(function(d) {
    //extraction of occupation name
    //build the data counts
    var current = d.contbr_occupation
    if (current) {
      occupationCounts[current] = (current in occupationCounts) ? occupationCounts[current] + 1 : 1
    }
  })
  .get(function(err, result) {
      // transform the data
    if (err) throw err
//make into array of objects with key/value pairs in JSON format
    var _occKeys = Object.keys(occupationCounts).map(key => {
      return {
        occ: key,
        count: occupationCounts[key]
      }
    })

    //when DATA is ready, THEN call function to create chart(d3.csv is asynch so this is a must)
    var sorted = _.sortBy(_occKeys, function(o) { return o.count}).slice(Math.max(_occKeys.length - 500, 1));
    d3DataReady(sorted)
  })

//Utility function
  function toTitleCase(str)
  {
      return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
  }

//https://github.com/chriswhong/bubblecharge/blob/master/index.html, https://github.com/vlandham/bubble_cloud were of great help
//inspiration: http://www.nytimes.com/interactive/2012/02/13/us/politics/2013-budget-proposal-graphic.html?_r=0

//Prepare viz div
var margin = {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0
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
    damper = .1;
    //Initialize Tooltip Caged d3 Tooltip
    tip = d3.tip().attr('class', 'd3-tip').html(function(d) { return d; });


    var d3DataReady = function(data) {

    var tip = d3.tip()
      .attr('class', 'd3-tip')
      .html(function(d) { return "<span>" + toTitleCase(d.occ) + ", "  + d.contributors + " contributors" + "</span>" })
      .direction('nw')
      .offset([0, 3])

    var max_amount = d3.max(data, function(d) {
            return parseInt(d.count);
        }),
        radius_scale = d3.scale.pow()
          .exponent(0.5)
          .domain([0,max_amount])
          .range([3, 100]),
        nodes = [];


    data.forEach(function(d, i) {
        var node;
        node = {
            id: i,
            occ: d.occ,
            radius: radius_scale(d.count),
            charge: radius_scale(d.count),
            name: d.occ,
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
      .size([width, height])
      .gravity(.1)
      .charge(charge)
      .on("tick", tick)
      .start();


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
      .attr("class",function(d){
        return "occupation" + d.occ;
      }).style("fill", function(d) {
        return d.color;
      }).call(force.drag)
      .on('mouseover', tip.show)
      .on('mouseout', tip.hide)

    //pull to center on tick
    function tick(e) {
            circle.attr("cx", function(d) {
                return d.x + (center.x - d.x) * (damper + 0.02) *
                    e.alpha;
            }).attr("cy", function(d) {
                return d.y + (center.y - d.y) * (damper + 0.02) *
                    e.alpha;
            });



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
} //end d3DataReady
