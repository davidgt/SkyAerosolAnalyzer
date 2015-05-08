/*

Sky Aerosol Analyzer 
Aeronet Data visualization

by Carlos Villanueva @carvilsi
carvilsi@gmail.com

MIT license 2015
*/

$(document).ready(function () {


    var date = new Date('2013-01-25'); //    YYYY-MM-DD
    var minDate = new Date('1993-06-17'); //    first day records: 1993-06-17
    var maxDate = new Date('2015-02-10'); //    last day records: 2015-02-10

    var loo;

//    var ip = "178.32.221.212"; // ip of server with skyAerosol API (localhost only for development porpuses)
    var ip = "localhost"; // ip local for developing porpuses or running this stuff on your local deploy
    var port = "1337"; // port of server with skyAerosol API

    var dta; // to store data

    // init the map

    var map = new Datamap({
        element: document.getElementById('container'),
        responsive: false,
//                        width: 900,
//                        heiht: 500,
        fills: {
            level0: '#B0B0B0', // no data
            level1: '#BFFF00',
            level2: '#FFFF00',
            level3: '#FF9E00',
            level4: '#F50000',
        },
        bubblesConfig: {
            borderWidth: 2,
            borderColor: '#000000',
            popupOnHover: true,
            popupTemplate: function (geography, data) {
                return '&lt;div class="hoverinfo"&gt;&lt;strong&gt;' + data.name + '&lt;/strong&gt;&lt;/div&gt;';
            },
            fillOpacity: 0.75,
            highlightOnHover: true,
            highlightFillColor: '#FC8D59',
            highlightBorderColor: 'rgba(250, 15, 160, 0.2)',
            highlightBorderWidth: 3,
            highlightFillOpacity: 0.85
        },
        geographyConfig: {
            hideAntarctica: false,
            borderWidth: 1,
            borderColor: '#606060',
            highlightOnHover: false,
            popupOnHover: false
//            borderColor: '#FFFFFF'
        }
    });



    $(window).on('resize', function () {
        map.resize();
    });

    function drawPoints(data, date) {
        var datos = [];
        for (var i = 0; i < data.length; i++) {
            var dato = {};
            data[i].longitude = data[i].long;
            data[i].latitude = data[i].lat;
            data[i].radius = "10";
            var ang = data[i]['870-440AngstromParam.[AOTExt]-Total'];
            data[i].fillKey = ang != 'N/A' ? ang < 0.5 ? 'level1' :
                ang >= 0.5 && ang < 1 ? 'level2' : ang >= 1 && ang < 1.5 ? 'level3' : 'level4' : 'level0';
        }
        map.bubbles(data, {
            popupTemplate: function (geo, data) {
                dta = data;
            }
        });
        $('#date').text(date).trigger('change');
    }

    //    Init the map with data of this day: "25:01:2013" --> 2004

    function init() {
        date = new Date('2013-04-14'); //    YYYY-MM-DD
        $.get('http://' + ip + ':' + port + '/days?where={"Date(dd-mm-yyyy)":%20"14:04:2013"}',
            function (data) {
                drawPoints(data, '2013-04-14');
            }).fail(function () {
            console.error('algo fue mal :S');
        });
        
    }

    init();

    /**
    tooltip activation
    */

    $('[data-toggle="tooltip"]').tooltip();


    //    format the date as we need to make the request to server

    function dateDBFormat() {
        var myDay = ('0' + date.getDate()).slice(-2) + ':' +
            ('0' + (date.getMonth() + 1)).slice(-2) + ':' + date.getFullYear();
        //        console.log(myDay);
        return myDay;
    }

    //    format the date for pressentation

    function dateGUIFormat() {
        return date.getFullYear() + '-' + ('0' + (date.getMonth() + 1)).slice(-2) + '-' + ('0' + date.getDate()).slice(-2);
    }

    function callData(myDay) {
        $.get('http://' + ip + ':' + port + '/days?where={"Date(dd-mm-yyyy)":%20"' + myDay + '"}',
            function (data) {
                drawPoints(data, dateGUIFormat());
            }).fail(function () {
            console.error('algo fue mal :S');
        });
    }

    //    one day less

    $('#less').on('click', function () {
        date.setDate(date.getDate() - 1);
        testDates();
        var myDay = dateDBFormat();
        callData(myDay);
    });

    //    one day more

    $('#more').on('click', function () {
        date.setDate(date.getDate() + 1);
        testDates();
        var myDay = dateDBFormat();
        callData(myDay);
    });

    //    one month less

    $('#lessMonth').on('click', function () {
        date.setMonth(date.getMonth() - 1);
        testDates();
        var myDay = dateDBFormat();
        callData(myDay);
    });

    //    one motnh more

    $('#moreMonth').on('click', function () {
        date.setMonth(date.getMonth() + 1);
        testDates();
        var myDay = dateDBFormat();
        callData(myDay);
    });

    //    one year less

    $('#lessYear').on('click', function () {
        date.setFullYear(date.getFullYear() - 1);
        testDates();
        var myDay = dateDBFormat();
        callData(myDay);
    });

    //    one year more

    $('#moreYear').on('click', function () {
        date.setFullYear(date.getFullYear() + 1);
        testDates();
        var myDay = dateDBFormat();
        callData(myDay);
    });

   
    function testDates() {
   
        if (date < minDate) {
            console.log('me paso de la fecha abajo');
            $('#no-data').modal('show');
        }
        if (date > maxDate) {
            console.log('me paso de la fecha arriba');
            $('#no-data').modal('show');
        }
    }
    
    $('#no-data').on('hidden.bs.modal', function (e) {
        init();
    })

    $('button.btn').on('click', function () {
        if ($('#stop').is(':visible')) {
            stop();
            init();
        }
    });

    $('#stop').hide();

    $('#play').on('click', function () {
        $('#stop').show();
        $('#play').hide();
        date = minDate;
        loo = setInterval(function () {
            date.setDate(date.getDate() + 1);
            var myDay = dateDBFormat();
            callData(myDay);
        }, 750);
    });

    $('#stop').on('click', function () {
        stop();
    });

    function stop() {
        $('#play').show();
        $('#stop').hide();
        clearInterval(loo);
    };

    $(map.svg[0][0]).on('mouseover', '.bubbles', function (e) {
        //    $(map.svg[0][0]).on('click', '.bubbles', function (e) {

        var dt = e.target.__data__;
        
        var arrayValues = new Array;

        $.map(dt, function (value, index) {
            arrayValues.push(value);
        });

        var arrayKeys = Object.keys(dt);
        var dataValues = new Array;
        var dataKeys = new Array;
        var dataValuesH = new Array;
        var dataKeysH = new Array;
        var dataValuesH1 = new Array;
        var dataKeysH1 = new Array;
        

        // filtering first certain not interesting values
        // then filtering string stuff
        // catching only numbers
        // get the values > 50 and 
        // then < 50 to visualize with another chart

        for (var i = 10; i <= arrayValues.length - 9; i++) {
            if (typeof arrayValues[i] !== "string") {
                if (typeof arrayValues[i] === "number") {
                    if (arrayValues[i] > 20) {
                        dataValues.push(arrayValues[i]);
                        dataKeys.push(arrayKeys[i]);
                    } else {
                        if (arrayValues[i] > 0 && arrayValues[i] < 1) {
                            dataValuesH.push(arrayValues[i]);
                            dataKeysH.push(arrayKeys[i]);
                        }
                        if (arrayValues[i] >= 1 && arrayValues[i] < 20) {
                            if (arrayValues[i] !== arrayValues[i+1]){
                                dataValuesH1.push(arrayValues[i]);
                                dataKeysH1.push(arrayKeys[i]);    
                            }
                            
                        }
                    }
                }
            }
        }

        var dataBar = {};
        dataBar.values = dataValues;
        dataBar.labels = dataKeys;

        var dataBarH = {};
        dataBarH.values = dataValuesH;
        dataBarH.labels = dataKeysH;

        var dataBarH1 = {};
        dataBarH1.values = dataValuesH1;
        dataBarH1.labels = dataKeysH1;
        
        var locales = {
            location: dt.Locations,
            lat: dt.lat,
            long: dt.long,
            elev: dt.elev,
            author: dt.PI,
            param: dt['870-440AngstromParam.[AOTExt]-Total']
        }

        drawVertical(dataBar);
        drawVertical1(dataBarH1);
        drawHorizontal(dataBarH);
        drawLocationAndCreator(locales);
    });

    $(map.svg[0][0]).on('mouseout', '.bubbles', function (e) {
        d3.select("#chart").remove();
        d3.select("#chart1").remove();
        d3.select("#chart2").remove();
        d3.select("#legendLocation").remove();
    });

    function drawVertical(data) {

        var chartWidth = 300,
            barHeight = 12,
            groupHeight = barHeight,
            gapBetweenGroups = 2,
            spaceForLabels = 150,
            spaceForLegend = 150;

        // Color scale
        var color = d3.scale.category20();
        var chartHeight = barHeight * data.labels.length + gapBetweenGroups * data.labels.length;

        var x = d3.scale.linear()
            .domain([0, d3.max(data.values)])
            .range([0, chartWidth]);

        var y = d3.scale.linear()
            .range([chartHeight + gapBetweenGroups, 0]);

        var yAxis = d3.svg.axis()
            .scale(y)
            .tickFormat('')
            .tickSize(0)
            .orient("right");

        // Specify the chart area and dimensions
        var chart = d3.select("svg.datamap")
            .append("g")
            .attr("id", "chart");

        // Create bars
        var bar = chart.selectAll("g")
            .data(data.values)
            .enter().append("g")
            .attr("transform", function (d, i) {
                return "translate(" + (spaceForLabels + 20) + "," + (150 + i * barHeight + gapBetweenGroups * (0.5 + Math.floor(i / data.values.length))) + ")";
            });

        // Create rectangles of the correct width
        bar.append("rect")
            .attr("fill", function (d, i) {
                return color(i % data.values.length);
            })
            .attr("class", "bar")
            .attr("width", x)
            .attr("height", barHeight - 1);

        // Add text label in bar
        bar.append("text")
            .attr("x", function (d) {
                return x(d) - 3;
            })
            .attr("y", barHeight / 2)
            .attr("fill", "red")
            .attr("dy", ".35em")
            .text(function (d) {
                return d;
            });

        // Draw labels
        bar.append("text")
            .attr("class", "label")
            .attr("x", function (d) {
                return -10;
            })
            .attr("y", groupHeight / 2)
            .attr("dy", ".35em")
            .text(function (d, i) {
                return data.labels[i]
            });


        chart.append("g")
            .attr("class", "y axis")
            .attr("transform", "translate(" + (spaceForLabels + 20) + ", " + (-gapBetweenGroups / 2 + 150) + ")")
            .call(yAxis);

        chart.style("opacity", .8);
    }
    
    function drawVertical1(data) {

        var chartWidth = 300,
            barHeight = 12,
            groupHeight = barHeight,
            gapBetweenGroups = 2,
            spaceForLabels = 150,
            spaceForLegend = 150;

        // Color scale
        var color = d3.scale.category20();
        var chartHeight = barHeight * data.labels.length + gapBetweenGroups * data.labels.length;

        var x = d3.scale.linear()
            .domain([0, d3.max(data.values)])
            .range([0, chartWidth]);

        var y = d3.scale.linear()
            .range([chartHeight + gapBetweenGroups, 0]);

        var yAxis = d3.svg.axis()
            .scale(y)
            .tickFormat('')
            .tickSize(0)
            .orient("right");

        // Specify the chart area and dimensions
        var chart = d3.select("svg.datamap")
            .append("g")
            .attr("id", "chart2");

        // Create bars
        var bar = chart.selectAll("g")
            .data(data.values)
            .enter().append("g")
            .attr("transform", function (d, i) {
                return "translate(" + (spaceForLabels + 20 + 600) + "," + (150 + i * barHeight + gapBetweenGroups * (0.5 + Math.floor(i / data.values.length))) + ")";
            });

        // Create rectangles of the correct width
        bar.append("rect")
            .attr("fill", function (d, i) {
                return color(i % data.values.length);
            })
            .attr("class", "bar")
            .attr("width", x)
            .attr("height", barHeight - 1);

        // Add text label in bar
        bar.append("text")
            .attr("x", function (d) {
                return x(d) - 3;
            })
            .attr("y", barHeight / 2)
            .attr("fill", "red")
            .attr("dy", ".35em")
            .text(function (d) {
                return d;
            });

        // Draw labels
        bar.append("text")
            .attr("class", "label")
            .attr("x", function (d) {
                return -10;
            })
            .attr("y", groupHeight / 2)
            .attr("dy", ".35em")
            .text(function (d, i) {
                return data.labels[i]
            });


        chart.append("g")
            .attr("class", "y axis")
            .attr("transform", "translate(" + (spaceForLabels + 20 + 600) + ", " + (-gapBetweenGroups / 2 + 150) + ")")
            .call(yAxis);

        chart.style("opacity", .8);
    }
    
    function drawLocationAndCreator(data) {
        var legend = d3.select("svg.datamap")
                    .append("g")
                    .attr("id", "legendLocation");        
        
        legend.append("text")
                .attr("x",450)
                .attr("y",45)
                .text("Location: " + data.location);
                
        legend.append("text")
                .attr("x",450)
                .attr("y",70)
                .text("Latitude: " + data.lat + "º");
        
        legend.append("text")
                .attr("x",450)
                .attr("y",95)
                .text("Longitude: " + data.long + "º");
                
        legend.append("text")
                .attr("x",30)
                .attr("y",130)
                .text("Principal Investigator(s): " + data.author);
        
        legend.append("text")
                .attr("x",650)
                .attr("y",45)
                .text("870-440AngstromParam.[AOTExt]-Total: " + data.param);
        
        legend.append("text")
                .attr("x",650)
                .attr("y",70)
                .text("Altitude: " + data.elev + " m");
    }


    function drawHorizontal(data) {

        var color = d3.scale.category20();

        var width = 900,
            height = 100;

        var y = d3.scale.linear()
            .range([height, 0]);

        var x = d3.scale.linear()
            .range([0, width], .1);

        var chart = d3.select("svg.datamap")
                    .append("g")
                    .attr("id", "chart1");
        
        y.domain([0, d3.max(data.values, function (d) {
            return d;
        })]);

        var barWidth = width / data.values.length;

        var bar = chart.selectAll("g")
            .data(data.values)
            .enter().append("g")
            .attr("transform", function (d, i) {
                return "translate(" + i * (barWidth + 4) + ",0)";
            });

        bar.append("rect")
            .attr("fill", function (d, i) {
                return color(i % data.values.length);
            })
            .attr("y", function (d) {
                return y(d);
            })
            .attr("height", function (d) {
                return height - y(d);
            })
            .attr("width", barWidth);

                    bar.append("text")
                        .attr("x", (barWidth) / 2)
                        .attr("y", function (d) {
                            return y(d) + 3;
                        })
                        .attr("dy", ".75em")
                        .attr("style", "fill: white; writing-mode: tb; glyph-orientation-vertical: 0;letter-spacing: -2px")
                        .text(function (d) {
                            return d;
                        });

        bar.append("text")
            .attr("x", barWidth / 2)
            .attr("y", function (d) {
                return height;
            })
            .attr("dy", ".75em")
            .attr("style", "fill: white; writing-mode: tb; glyph-orientation-vertical: 0;letter-spacing: -2px")
            .text(function (d, i) {
                return data.labels[i];
            });
        
        // possition
        chart.attr("transform", "translate(15,300)");

        chart.style("opacity", .8);
    }

    map.legend();
    
    
    addMoreThingsToLegend();
    
    function addMoreThingsToLegend() {
        var legend = d3.select(".datamaps-legend")
                    .append("g")
                    .attr("id", "legendText");
        legend.append("text")
                .html("870-440AngstromParam.[AOTExt]-Total <br/>");
        legend.append("text")
                .html("level0 N/A     level1 < 0.5     level2 [0.5,1]     level3 [1,1.5]     level4 > 1.5");
    }
})