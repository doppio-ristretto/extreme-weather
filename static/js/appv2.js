url = "http://127.0.0.1:5000/data";

zones = [];
lat = [];
lon = [];
d3.json(url), function(main) {
    d3.json(main.affectedZones), function(sub) {
        var zones = main.affectedZones;
        var lat = sub.geometry.coordinates[0];
        var lon = sub.geometry.coordinates[1];

        zones.push(main)
        lat.push(sub)
        lon.push(sub)
    };
    console.log(lat, lon);
};
    //console.log(zones);
    


// d3.selectAll("body").append("div").text("test");