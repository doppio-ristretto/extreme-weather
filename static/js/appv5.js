url = "http://127.0.0.1:5000/data";

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
                console.log(datalatlon);
                datalatlon2 = datalatlon[1].coordinates;
                console.log(dataslatlon2);
                datalatlon2.forEach((rowlatlon, k) => {
                    lat = rowlatlon.geometry.coordinates[0][0][0][0].lat;
                    lon = rowlatlon.geometry.coordinates[0][0][0][0].lon;
                    coordinates.forEach((rowlatlon2, l) => {
                        lat.push(rowlatlon2);
                        lon.push(rowlatlon2);
                    })
                })
                console.log(lat, lon);
            })
            
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