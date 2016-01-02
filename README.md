# 2016 Presidential Primary Campaign Finance Expenditure Visualization

## Data was sourced from the Federal Elections Commission and is freely available.

# Authors:
[ckearns1210](https://github.com/ckearns1210)

## Instructions

To Use:

(requires a local node environment with npm)

1. Clone the repo.

2. Install the packages: `npm install`

3.  Install bower components `bower install`

4. Launch: `node server.js`

5. Visit in your browser: [Localhost:3000](http://Localhost:3000)

## Technologies, Dependencies, Packages Used

### Dependencies

- node
- morgan
- body-parser
- ejs
- express

### Packages & Libraries

- D3
- Chartist
- Materialize CSS Framework
- D3-tip
- JQuery
- Underscore

## Known Issues

The data, which only needs to be parsed once, is parsed in a seperate Node application using Javascript and D3, and manually saved to files.  If I was to build a similar application, with a static data source that may need to be updated or have candidates added to it, I would approach the data parsing in a different way.  As it stands, the d3 parse and get methods employed to parse the CSV use XMLHttpRequest, tying them to the DOM.  If these methods were replaced with a Node CSV parse module, a simple command line program could be implemented to parse the data and save it using Node's FS, making it more modular, and easier to convert to a server side implementation if a live data source became available. 

## Contributing

You can contribute in several ways:

## Bug Reports:

Who likes bugs? Provide a detailed report of any bugs you encounter and open an issue on our repo's issues section

## Documentation:

Like fixing typos or adding to documentation? We encourage you to fork our project project, make your changes, and submit a pull request. Extra sets of eyes and fresh perspectives are wanted and welcome.

## Fixes:

See a problem that you have a solution for? You're more than welcome to make a fix and submit it as a pull request.



Code released for entertainment and educational purposes.

Please contact authors for additional usage.

![alt tag](https://github.com/Ckearns1210/CampaignBubbleViz/blob/master/screenshots/Screen%20Shot%202016-01-02%20at%203.36.58%20PM.png?raw=true)
![alt tag](https://github.com/Ckearns1210/CampaignBubbleViz/blob/master/screenshots/Screen%20Shot%202016-01-02%20at%203.37.06%20PM.png?raw=true)
