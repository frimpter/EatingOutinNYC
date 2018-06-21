// GROUP 2 PROJECT 2 - SIDEWALK CHART


// Get the value of the dropdown list
var myFood = document.getElementById("selectViolation").value;

function getViolation(myFood) {
    d3.json("SWCHART.json", function runChart(data) {
        // console.log(data[0]); // Early data check

        // Reverse the array (thanks Plotly)
        // data = data.reverse();

        // Dropdown condition 
        var y_value = [];

        if (myFood == "mice") {
            y_value = data.map(row => row.MICE)
        } 
        else if (myFood == "rats") {
            y_value = data.map(row => row.RATS)
        }
        else if (myFood == "roaches") {
            y_value = data.map(row => row.ROACHES)
        }
        else if (myFood == "flies") {
            y_value = data.map(row => row.FLIES)
        }
        else if (myFood == "hand") {
            y_value = data.map(row => row.HANDS)
        } 
        else if (myFood == "sanitize") {
            y_value = data.map(row => row.SANITIZATION)
        }

        // Trace for the data
        var chart = {
            x: data.map(row => row.cuisine),
            y: y_value,
            text: data.map(row => row.cuisine),
            marker: {
                color: ["#330066", "#990066", "#CC3333", "#FF3300", "#FF6600", "#FF9900", "#FFCC00", "#99CC00"]
            },
            type: "bar"
        };

        // FORMAT THE DATA
        var data = [chart];

        // FORMAT THE LAYOUT
        var layout = {
            showlegend: false,
            autosize: true,
            margin: {
                r: 5,
                l: 75,
                t: 5,
                b: 100,
                pad: 7
            },
            xaxis: {
                tickangle: -45
            },
            yaxis: {
                title: "Proportion of All Violations (%)"
            }
        };

        Plotly.newPlot("swchart", data, layout)

    });
};

