url = "http://127.0.0.1:5000/data";
url2 = "http://127.0.0.1:5000/data2";

getData()

var alertLayers = L.layerGroup([]);

var myMap = L.map("map", {
    center: [53.5, -98.35],
    zoom:4,
    maxZoom: 7,
    layers: [alertLayers]
});




function insertMap(alertLayer, fireLayer) {

    // Adding tile layer
    var darkmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
      attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
      maxZoom: 18,
      id: "dark-v10",
      accessToken: API_KEY
    });
    var lightmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
      attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
      maxZoom: 18,
      id: "light-v10",
      accessToken: API_KEY
    });
    var satellite = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
      attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
      maxZoom: 18,
      id: "satellite-v9",
      accessToken: API_KEY
    });
    var outdoor = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
      attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
      maxZoom: 18,
      id: "outdoors-v11",
      accessToken: API_KEY
    });
    var streetmap = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
      attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
      tileSize: 512,
      maxZoom: 18,
      zoomOffset: -1,
      id: "mapbox/streets-v11",
      accessToken: API_KEY
    }).addTo(myMap);

    //set base layers
    var baseMaps = {
      "Street Map": streetmap,
      "Dark Map": darkmap,
      "Light Map": lightmap,
      "Satellite Map": satellite,
      "Outdoor Map": outdoor
    }

    //initial map settings

    //add clickable layers

    var overlayMaps = {
        "Alerts": alertLayer,
        "Fire Map": fireLayer
      };
    

    L.control.layers(baseMaps, overlayMaps, {
      collapsed: false
    }).addTo(myMap);

    // alertLayer.addTo(myMap);

    var legend = L.control({ position: "bottomright" });
        legend.onAdd = function() {
        var div = L.DomUtil.create("div", "info legend");
        var limits = ["Unkown", "Future", "Expected", "Immediate"];
        var colors = ["grey", "Blue", "Green", "red"];
        var labels = [];
        // Add min & max
        var legendInfo = "<h5>Urgency</h5>" +
            "<div class=\"labels\">" +
            "<div class='Unkown'>" + limits[0] + "</div>" +
                "<div class='Expected'>" + limits[2] + "</div>" +
            "<div class='Immediate'>" + limits[3] + "</div>" +
                "<div class='Future'>" + limits[1] + "</div>" +
            "</div>";
        div.innerHTML = legendInfo;
        div.innerHTML += "<ul>" + labels.join("") + "</ul>";
        return div;
        };
        legend.addTo(myMap);

    return myMap;
}


function chooseColor(urgency){
  switch (urgency){
    case "Unknown":
      return "Grey"
    case "Future":
      return "Blue";
    case "Expected":
      return "Green";
    case "Immediate":
      return "Red"
  }
}

function getData() {
    
    d3.json(url).then(data => {
        data2 = data[0].features;
        data2.forEach(d => {
            properties = d.properties
            activeZones = properties.affectedZones
            onset = properties.onset
            status = properties.status
            urgency = properties.urgency
            eventtype = properties.event
            severity = properties.severity
            headline = properties.headline
            description = properties.description
            instruction = properties.instruction
            parameters = properties.parameters
            // console.log(eventtype)
            // console.log(properties);
            // layer.bindPopup(eventtype); 
            var mapStyle = {
            color: "black",
            fillColor: chooseColor(d.properties.urgency),
            fillOpacity: 1,
            weight: .75,
            smoothFactor: 0
            };

            d.properties.affectedZones.map(row2=>{
                d3.json(row2).then(datalatlon =>{
                    //number of types
                    var alertLayer = L.geoJson(datalatlon
                        ,{
                    
                      onEachFeature: function(feature,layer){
                          function getColor(d) {
                            return d = "Future"  ? 'Blue' :
                                   d = "Immediate"   ? 'Red' :
                                   d = "Expected"   ? 'Green' :
                                   d = "Unknown"   ? 'Black' :
                                                  '#FFEDA0';
                        }                 
                          layer.bindPopup("<h6>Event Type: " + d.properties.event + "</h6>" + "<h8> Severity: "+ d.properties.severity+ "</h8>"+"<br>"+ "<h8>"+"Urgency: "+ d.properties.urgency+ "</h8>"  + "<br>" + "<h8> Certainty: " + d.properties.certainty + "</h8>"+ "<br>"+ "<h8> Onset: "+d.properties.onset+ "</h8>"+ "<br>"+ "<h8> headline: " + d.properties.headline +  "</h8>")

                          layer.on({
                              mouseover: function(event) {
                                layer = event.target;
                                layer.setStyle({

                                  fillColor: "white",
                                  fillOpacity: 0.9,
                            
                                  });
                                },
                              mouseout: function(event) {
                                layer = event.target;
                                layer.setStyle({
                                  fillColor: chooseColor(d.properties.urgency),
                                  fillOpacity: 1,    
                                  });
                                },
                              click: function(event){
                                  myMap.fitBounds(event.target.getBounds());          
                              } 
                            })       
                        },
                        
                        style: mapStyle         
                }
            )
            // console.log(alertLayer);
            alertLayers.addLayer(alertLayer);

            })   
        })
        })
    });
    var firelayers = L.layerGroup([]);
    d3.json(url2).then(data2=> {
          console.log(data2);
            firelayers.addLayer(L.geoJson(data2, {
              style: function(feature) {
                return {
                    color: "red"
                };
              }            
          }))
          insertMap(alertLayers, firelayers);
        })
}
