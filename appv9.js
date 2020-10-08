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

var mapStyle = {
    color: "black",
    fillColor: "red",
    fillOpacity: 0.5,
    weight: 1.5
  };
  


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
          L.geoJson(datalatlon,{
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
          }).addTo(myMap);
        })
      })
    })
  });



