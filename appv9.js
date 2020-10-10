url = "http://127.0.0.1:5000/data";

var myMap = L.map("map", {
    center: [53.5, -98.35],
    zoom:4,
    maxZoom: 7
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

var geojson;

// var mapStyle = {
//     color: "blue",
//     fillColor: "lightblue",
//     fillOpacity: 0.5,
//     weight: 1.5
//   };
  
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
// var info = L.control({
//   position: "bottomright"
// });

// info.onAdd = function() {
//   var div = L.DomUtil.create("div", "legend");
//   return div;
// };
// info.addTo(myMap);

// var legend = L.control({position: "bottomright"})
// legend.onAdd = function(color){
//     document.querySelector(".legend").innerHTML +=
//       "<p> Unkown: " + chooseColor("Unkown") + "</p>"
    
// };
// legend.addTo(myMap);

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
            L.geoJson(datalatlon,{
              
              onEachFeature: function(feature,layer){
      
                  // console.log(d.properties.urgency)
                  function getColor(d) {
                    return d = "Future"  ? 'Blue' :
                           d = "Immediate"   ? 'Red' :
                           d = "Expected"   ? 'Green' :
                           d = "Unknown"   ? 'Black' :
                                          '#FFEDA0';
                }
                  // var legend = L.control({position: 'bottomright'});

                  // legend.onAdd = function (map) {
                  
                  //     var div = L.DomUtil.create('div', 'info legend'),
                  //     grades = ["Future", "Immediate", "Expected", "Unkown"],
                  //     labels = [];
                  
                  //     // loop through our density intervals and generate a label with a colored square for each interval
                  //     for (var i = 0; i < grades.length; i++) {
                  //         div.innerHTML +=
                  //         '<i style="background:' + getColor(grades[i] + 1) + '"></i> ' +
                  //         grades[i] + (grades[i + 1] ? + '<br>' : '+');
                  // }
                  
                  // return div;
                  // };
                  
                  // legend.addTo(myMap);   

                  
                
        

                  
                  layer.bindPopup("<h6>Event Type: " + d.properties.event + "</h6>" + "<h8> Severity: "+ d.properties.severity+ "</h8>"+"<br>"+ "<h8>"+"Urgency: "+ d.properties.urgency+ "</h8>"  + "<br>" + "<h8> Certainty: " + d.properties.certainty + "</h8>"+ "<br>"+ "<h8> Onset: "+d.properties.onset+ "</h8>"+ "<br>"+ "<h8> description: " +  +  "</h8>")

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
                        // layer.bindPopup(datalatlon);    
                        // console.log()
                            
                },
                  
                 style: mapStyle
                 
          }).addTo(myMap);
        })
        
      })
    })
  });
  var legend = L.control({ position: "bottomright" });
                  legend.onAdd = function() {
                    var div = L.DomUtil.create("div", "info legend");
                    var limits = ["Unkown", "Future", "Expected", "Immediate"];
                    var colors = ["grey", "Blue", "Green", "red"];
                    var labels = [];
                
                    // Add min & max
                    var legendInfo = "<h5>Urgency</h5>" +
                      "<div class=\"labels\">" +
                        "<div >" + limits[0] + "</div>" +
                        "<div >" + limits[1] + "</div>" +
                        "<div >" + limits[2] + "</div>" +
                        "<div >" + limits[3] + "</div>" +
                      "</div>";
                
                    div.innerHTML = legendInfo;
                
                    limits.forEach(function(limit, index) {
                      labels.push("<li style=\"background-color: " + colors[index] + "\"></li>");
                    });
                
                    div.innerHTML += "<ul>" + labels.join("") + "</ul>";
                    return div;
                  };
                
                  // Adding legend to the map
                  legend.addTo(myMap);



