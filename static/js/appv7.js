url = "http://127.0.0.1:5000/data";
url2 = "http://127.0.0.1:5000/data2";



function insertMap(alertLayer, fireLayer) {

  // Adding tile layer
  var streetmap = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    tileSize: 512,
    maxZoom: 18,
    zoomOffset: -1,
    id: "mapbox/streets-v11",
    accessToken: API_KEY
  });
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
  //set base layers
  var baseMaps = {
    "Street Map": streetmap,
    "Dark Map": darkmap,
    "Light Map": lightmap,
    "Satellite Map": satellite,
    "Outdoor Map": outdoor
  };
  //set overlay maps
  var overlayMaps = {
    "Alerts": alertLayer,
    "Active Fire": fireLayer
  };
  //initial map settings
  var myMap = L.map("map", {
      center: [37.09, -75.71],
      center: [53.5, -98.35],
      zoom:4,
      maxZoom: 7,
      layers: [streetmap,fireLayer,alertLayer]
  });
  //add clickable layers
  L.control.layers(baseMaps, overlayMaps, {
    collapsed: false
  }).addTo(myMap);

}


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
      console.log(eventtype)
      

    activeZones.forEach(row2=>{
      d3.json(row2).then(datalatlon =>{
        var alertLayer = L.geoJson(datalatlon,{
          onEachFeature: function(feature,layer){
            layer.on({
                mouseover: function(event) {
                  layer = event.target;
                  layer.setStyle({
                    fillOpacity: 0.9
                  });
                  },
                mouseout: function(event) {
                  layer = event.target;
                  layer.setStyle({
                    fillOpacity: 0.5
                  });
                  },
                click: function(event){
                    myMap.fitBounds(event.target.getBounds());             
            }
          })  
              layer.bindPopup(eventtype);           
          } 
        })
        d3.json(url2).then(data2=> {
          console.log(data2);
            var fireLayer = L.geoJson(data2, {
              style: function(feature) {
                return {
                    color: "red"
                };
              }
          })
          insertMap(alertLayer,fireLayer)
        })
      })
    })
  })
});

