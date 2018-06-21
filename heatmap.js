// GROUP 2 PROJECT 2 - HEATMAP
// var canvas = d3.select("#heatmap")
//     .append("svg")
//     .attr("width", 500)
//     .attr("height", 500)
//     .append("g");

// Transposed from HEAT.json << PANDAS DATAFRAME
var boros = ["BRONX", "BROOKLYN", "MANHATTAN", "QUEENS", "STATEN_ISLAND"]; // boros
var cuisines = ["American","Asian","BakeryCafe","French","Italian","Mediterranean","Mexican","Other"]; // cuisines
var meanscore = [[17.5, 18.1, 18.4, 16.9, 19.4], [16.7, 20.2, 22.0, 19.9, 20.4], [17.1, 17.5, 16.8, 16.5, 16.8], [10.6, 18.1, 18.4, 16.9, null], [19.1, 18.6, 19.2, 18.0, 20.6], [23.1, 18.4, 18.2, 16.7, 19.8], [21.0, 21.2, 20.0, 20.2, 19.8], [17.9, 20.5, 18.8, 18.7, 18.3]]; // data

var colorScale = [
    [0, "#99CC00"],
    [1, "#990066"]
];

var data = [{
    x: boros,
    y: cuisines,
    z: meanscore,
    type: "heatmap",
    colorscale: colorScale,
    showscale: true
}];

// data = data.reverse;

var layout = {
    width: 500,
    height: 500,
    xaxis: {
        ticks: "",
        side: "top",
        tickangle: 45
    },
    yaxis: {
        ticks: "",
        ticksuffix: " ",
        autosize: true
    },
    margin: {
        r: 5,
        l: 100,
        t: 100,
        b: 5,
        pad: 7
    },
    annotations: []
};

// Make data labels for each matrix value (y:cuisines, x:boros)
for (var i = 0; i < cuisines.length; i++) {
    for (var j = 0; j < boros.length; j++) {
        var datapoint = meanscore[i][j];
        var label = {
            xref: 'x1',
            yref: 'y1',
            x: boros[j],
            y: cuisines[i],
            text: meanscore[i][j],
            showarrow: false,
            font: {
                color: "#FFFFFF"
            }

        };
        layout.annotations.push(label);
    }
}

Plotly.newPlot("heatmap", data, layout);
