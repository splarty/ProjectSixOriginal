(function () {

                var formatter = d3.format("");
                var tickFormatter = function(d) {
                    return formatter(d);
                }
                var col = 'Debt';
                var sliderValue = 2007;
                var aa = [2, 2];
                var cnt = [1];
                var letter = 'Debt';

                var div = d3.select("#mainWrapper");
                var svg = div.append("svg").attr("id", "map13").attr("height", 500).attr("width", 960);
                var div = d3.select("svg").append("div").attr("class", "tooltip").style("opacity", 0);

                var debt = function() {
                    letter = 'Debt';
                    col = 'Debt';
                    var localV = valueIs();
                    colorMap13(localV, letter);
                    d3.select('#variableText').text(letterIs())
                }
                var business = function() {
                    letter = 'Business';
                    col = 'Business';
                    var localV = valueIs();
                    colorMap13(localV, letter);
                    d3.select('#variableText').text(letterIs())
                }
                var auto = function() {
                    letter = 'Auto';
                    col = 'Auto';
                    var localV = valueIs();
                    colorMap13(localV, letter);
                    d3.select('#variableText').text(letterIs())
                }
                var other = function() {
                    letter = 'Other/NA';
                    col = 'Other/NA';
                    var localV = valueIs();
                    colorMap13(localV, letter);
                    d3.select('#variableText').text(letterIs())
                }
                var axis = d3.svg.axis().orient("bottom").ticks(8).tickFormat(tickFormatter);
                d3.select('#slider4').call(d3.slider().axis(axis).on("slide", function(evt, value) {
                    var mapLetter = letterIs();
                    d3.select('#slider4text').text(value);
                    colorMap13(value, mapLetter);
                    sliderValue = value;
                    valueIs();
                }))
                function valueIs() {
                    console.log(sliderValue);
                    return sliderValue;
                }

                function letterIs() {
                    console.log('letter is: ' + letter);
                    return letter;
                }

                function colorMap13(sValue, z) {
                    var map;
                    var day_ = sValue;
                    var colorScheme = z;
                    if (colorScheme === 'Debt') {
                        map = d3.geomap.choropleth().geofile('d3-geomap/topojson/countries/USA.json').colors(colorbrewer.Reds[5]).projection(d3.geo.albersUsa).column(col).unitId('FIPS').scale(1000).legend(true);
                    } else if (colorScheme === 'Business') {
                        map = d3.geomap.choropleth().geofile('d3-geomap/topojson/countries/USA.json').colors(colorbrewer.Greens[5]).projection(d3.geo.albersUsa).column(col).unitId('FIPS').scale(1000).legend(true);
                    } else if (colorScheme === 'Auto') {
                        map = d3.geomap.choropleth().geofile('d3-geomap/topojson/countries/USA.json').colors(colorbrewer.Blues[5]).projection(d3.geo.albersUsa).column(col).unitId('FIPS').scale(1000).legend(true);
                    } else if (colorScheme === 'Other/NA') {
                        map = d3.geomap.choropleth().geofile('d3-geomap/topojson/countries/USA.json').colors(colorbrewer.Purples[5]).projection(d3.geo.albersUsa).column(col).unitId('FIPS').scale(1000).legend(true);
                    }

                    d3.csv('data/ListingCategory2007.csv', function(error, data) {
                        var newD = [];
                        var dataArray = [];
                        for (var i = 2007; i < 2015; i++) {
                            var newD = [];
                            for (var prop in data) {
                                if (data[prop].Year === i.toString()) {
                                    console.log(data[prop]);
                                    newD.push(data[prop]);
                                }
                            }
                            dataArray[i] = newD;
                            console.log(newD);
                        };

                        d3.select("#map13").datum(dataArray[day_]).call(map.draw, map);

                    });
                }

                function colorMapStart() {
                    var map;
                    map = d3.geomap.choropleth().geofile('d3-geomap/topojson/countries/USA.json').colors(colorbrewer.Reds[5]).projection(d3.geo.albersUsa).column(col).unitId('FIPS').scale(1000).legend(true);
                    d3.csv('data/ListingCategory2007.csv', function(error, data) {
                        var newD = [];
                        var dataArray = [];
                        for (var i = 2007; i < 2015; i++) {
                            var newD = [];
                            for (var prop in data) {
                                if (data[prop].Year === i.toString()) {
                                    newD.push(data[prop]);
                                }
                            }
                            dataArray[i] = newD;
                        };
                        console.log(dataArray);
                        console.log(dataArray[2007]);

                        d3.select("#map13").datum(dataArray[2007]).call(map.draw, map);
                    });

                }

                colorMapStart();
})();