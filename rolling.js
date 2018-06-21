// GROUP 2 PROJECT 2 LINE CHART

// var canvas = d3.select("#rolling")
//     .append("svg")
//     .attr("width", 500)
//     .attr("height", 500)
//     .append("g");

var myPlace = document.getElementById("selectCuisine").value;

function getCuisine(myPlace) {
    d3.json("ROLLING.json", function runLine(data) {

        // Reverse the array (thanks Plotly)
        // data = data.reverse();

        // Dropdown condition
        var x_value = [];
        var y_value = [];
        var food = [];
        var stroke = [];

        if (myPlace == "american") {
            x_value = data.map(row => row.Am_date)
            y_value = data.map(row => row.Am_roll)
            food = "American"
            stroke = "#330066"
        }
        else if (myPlace == "asian") {
            x_value = data.map(row => row.As_date)
            y_value = data.map(row => row.As_roll)
            food = "Asian"
            stroke = "#990066"
        }
        else if (myPlace == "bakerycafe") {
            x_value = data.map(row => row.BC_date)
            y_value = data.map(row => row.BC_roll)
            food = "BakeryCafe"
            stroke = "#CC3333"
        }
        else if (myPlace == "french") {
            x_value = data.map(row => row.Fr_date)
            y_value = data.map(row => row.Fr_roll)
            food = "French"
            stroke = "#FF3300"
        }
        else if (myPlace == "italian") {
            x_value = data.map(row => row.It_date)
            y_value = data.map(row => row.It_roll)
            food = "Italian"
            stroke = "#FF6600"
        }
        else if (myPlace == "mediterranean") {
            x_value = data.map(row => row.Me_date)
            y_value = data.map(row => row.Me_roll)
            food = "Mediterranean"
            stroke = "#FF9900"
        }
        else if (myPlace == "mexican") {
            x_value = data.map(row => row.Mx_date)
            y_value = data.map(row => row.Mx_roll)
            food = "Mexican"
            stroke = "#FFCC00"
        }
        else if (myPlace == "other") {
            x_value = data.map(row => row.Ot_date)
            y_value = data.map(row => row.Ot_roll)
            food = "Other"
            stroke = "#99CC00"
        }

        // Trace for the data
        var trace = {
            type: "scatter",
            mode: "markers", 
            x: x_value,
            y: y_value,
            text: food,
            marker: {
                color: stroke
            },
        };

        // FORMAT THE DATA
        var data = [trace];

        // FORMAT THE LAYOUT
        var layout = {
            autosize: false,
            width: 500,
            height: 500,
            margin: {
                r: 5,
                l: 50,
                t: 5,
                b: 25,
                pad: 7
            },
            yaxis: {
                title: "Rolling Average Score"
            }
        };

        Plotly.newPlot("rolling", data, layout)
    })
};