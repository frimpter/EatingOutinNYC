// GROUP 2 PROJECT 2 MAP-2 LOGIC


/////////////////////////////////////////////
// MAP OF RESTAURANTS WITH OUTDOOR SEATING //
/////////////////////////////////////////////

// Make the canvas to fit in the div
var canvas = d3.select("#map")
    .append("svg:svg")
    .attr("width", 300)
    .attr("height", 400);

// Make the tile layer
// JF MapBox token: pk.eyJ1IjoiZnJpbXB0ZXIiLCJhIjoiY2podjQ5cXVwMHZkMzN2cnZyYnRtYmFleSJ9.hSiLEjkBIMFB4DOkbVMbMQ
var MapBox = "https://api.mapbox.com/styles/v1/mapbox/outdoors-v10/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiZnJpbXB0ZXIiLCJhIjoiY2podjQ5cXVwMHZkMzN2cnZyYnRtYmFleSJ9.hSiLEjkBIMFB4DOkbVMbMQ";

// Make tile layer for the background
var map = L.tileLayer (MapBox, {
    attribution: "Map data &copy; <a href=\"https://data.cityofnewyork.us/Health/DOHMH-New-York-City-Restaurant-Inspection-Results/xx67-kt59/data\">NYC OpenData</a>, Imagery by Group 2 © <a href=\"http://mapbox.com\">Mapbox</a>",
    maxZoom: 20
});

// Initialize LayerGroups
var layers = {
    American: new L.LayerGroup(),
    Asian: new L.LayerGroup(),
    BakeryCafe: new L.LayerGroup(),
    French: new L.LayerGroup(),
    Italian: new L.LayerGroup(),
    Mediterranean: new L.LayerGroup(),
    Mexican: new L.LayerGroup(),
    Other: new L.LayerGroup()
};

// Make the map object with layers
var myMap = L.map ("map", {
    center: [40.76520144280567, -73.95275115966797],
    zoom: 12,
    layers: [
        layers.American,
        layers.Asian,
        layers.BakeryCafe,
        layers.French,
        layers.Italian,
        layers.Mediterranean,
        layers.Mexican,
        layers.Other
    ]
});

// Add map tile layer to the map
map.addTo(myMap);

// Create an overlay object to add to the layer control
var overlays = {
    "American": layers.American,
    "Asian": layers.Asian,
    "BakeryCafe": layers.BakeryCafe,
    "French": layers.French,
    "Italian": layers.Italian,
    "Mediterranean": layers.Mediterranean,
    "Mexican": layers.Mexican,
    "Other": layers.Other
}


// Make a control for the layers and add overlay layers
L.control.layers(null, overlays).addTo(myMap);


// Make an object for the layer group icons
var icons = {
    American: L.ExtraMarkers.icon({
        icon: 'fas fa-map-marker-alt fa-lg',
        iconColor: '#330066'
    }),
    Asian: L.ExtraMarkers.icon({
        icon: 'fas fa-map-marker-alt fa-lg',
        iconColor: '#990066'
    }),
    BakeryCafe: L.ExtraMarkers.icon({
        icon: 'fas fa-coffee fa-lg',
        iconColor: '#CC3333'
    }),
    French: L.ExtraMarkers.icon({
        icon: 'fas fa-wine-glass fa-lg',
        iconColor: '#FF3300'
    }),
    Italian: L.ExtraMarkers.icon({
        icon: 'fas fa-map-marker-alt fa-lg',
        iconColor: '#FF6600'
    }),
    Mediterranean: L.ExtraMarkers.icon({
        icon: 'fas fa-map-marker-alt fa-lg',
        iconColor: '#FF9900'
    }),
    Mexican: L.ExtraMarkers.icon({
        icon: 'fas fa-map-marker-alt fa-lg',
        iconColor: '#FFCC00'
    }),
    Other: L.ExtraMarkers.icon({
        icon: 'fas fa-map-marker-alt fa-lg',
        iconColor: '#99CC00'
    })
};


// Load restaurant data and create markers
d3.json("SIDEWALK.json", function createMarkers(data) {
    
    // Initialize an object to hold the appropriate layers and icons for the layer group
    var cuisineCode;

    // Loop through restaurants and assign information
    for (var i = 0; i < data.length; i++) {

        // Make an object to point to each restaurant's data
        var restaurant = data[i]; 

        if (restaurant.CUISINE == "American") {
            cuisineCode = "American";
        }
        else if (restaurant.CUISINE == "Asian" || restaurant.CUISINE == "Chinese" || restaurant.CUISINE == "Korean" || restaurant.CUISINE == "Japanese" || restaurant.CUISINE == "Thai" || restaurant.CUISINE == "Indian") {
            cuisineCode = "Asian";
        }
        else if (restaurant.CUISINE == "Bakery" || restaurant.CUISINE == "Donuts" || restaurant.CUISINE == "Cafe/Coffee/Tea") { 
            cuisineCode = "BakeryCafe";
        }
        else if (restaurant.CUISINE == "French") {
            cuisineCode = "French";
        }
        else if (restaurant.CUISINE == "Italian" || restaurant.CUISINE == "Pizza" || restaurant.CUISINE == "Pizza/Italian") {
            cuisineCode = "Italian";            
        }
        else if (restaurant.CUISINE == "Mediterranean" || restaurant.CUISINE == "Greek") {
            cuisineCode = "Mediterranean";
        }
        else if (restaurant.CUISINE == "Mexican" || restaurant.CUISINE == "Spanish" || restaurant.CUISINE == "Latin") {
            cuisineCode = "Mexican";
        }
        else {
            cuisineCode = "Other";
        };

        // Make a new marker for the restaurant with the right color
        var newMarker = L.marker([restaurant.LATITUDE, restaurant.LONGITUDE], {
            icon: icons[cuisineCode]
        });

        // Add the marker to the right layer
        newMarker.addTo(layers[cuisineCode])

        // Bind the popup to the marker
        newMarker.bindPopup("<b>" + restaurant.DBA + "</b><br>Cuisine: " + restaurant.CUISINE + "<br>Latest Grade: " + restaurant.GRADE + "<br>Seating Type: " + restaurant.SWC_TYPE);

    };

});
