url = "http://127.0.0.1:5000/data";

var myMap = L.map("map", {
    center: [34.0522, -118.2437],
    zoom: 8
  });

// Adding tile layer
L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
  tileSize: 512,
  maxZoom: 18,
  zoomOffset: -1,
  id: "mapbox/streets-v11",
  accessToken: API_KEY
}).addTo(myMap);


zones = [];
type = [];
lat = [];
lon = [];

d3.json(url).then(data => {
    console.log(data);
    data2 = data[0].features;
    console.log(data2);
    data2.forEach((row, i) => {
        activeZones = row.properties.affectedZones;
        // console.log(affectedZones);
        activeZones.forEach((row2, j) => {
            // console.log(`Active Fire: ${i}, Affected Zones: ${j} ${fires}`);
            // console.log(row2);
            zones.push(row2);
            console.log(row2);

            d3.json(row2).then(datalatlon => {
            /*    geojson = L.choropleth(datalatlon), {
                     // Define what  property in the features to use
                    valueProperty: "MHI2016",

                    // Set color scale
                    scale: ["#ffffb2", "#b10026"],

                    // Number of breaks in step range
                    steps: 10,

                    // q for quartile, e for equidistant, k for k-means
                    mode: "q",
                    style: {
                    // Border color
                    color: "#fff",
                    weight: 1,
                    fillOpacity: 0.8
                    },

                    // Binding a pop-up to each layer
                    onEachFeature: function(feature, layer) {
                    layer.bindPopup("test725");
                    }
                }.addTo(myMap);        
            */
                    console.log(datalatlon);
        }
            )
            
        })
    });
    console.log(zones);
/*
    d3.json(zones).then(datalatlon => {
        console.log(datalatlon);
        datalatlon2 = datalatlon[1].coordinates;
        console.log(dataslatlon2);
        datalatlon2.forEach((rowlatlon, k) => {
            lat = rowlatlon.lat;
            lon = rowlatlon.lon;
            coordinates.forEach((rowlatlon2, l) => {
                lat.push(rowlatlon2);
                lon.push(rowlatlon2);
            })
        })
        console.log(lat, lon);
    })
*/    
})
/*
d3.json(zones).then(datalatlon => {
    console.log(datalatlon);
    datalatlon2 = datalatlon[1].coordinates;
    console.log(dataslatlon2);
    datalatlon2.forEach((rowlatlon, k) => {
        lat = rowlatlon.lat;
        lon = rowlatlon.lon;
        coordinates.forEach((rowlatlon2, l) => {
            lat.push(rowlatlon2);
            lon.push(rowlatlon2);
        })
    })
    console.log(lat, lon);
})
*/
// d3.selectAll("body").append("div").text("test");