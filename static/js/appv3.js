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
        })
    });
    console.log(zones);

    d3.json(data.affectedZones).then(datageometry => {
        console.log(datageometry);
        datageometry2 = datageometry[0].geometry;
        console.log(datasgeometry2);
        datageometry2.forEach((rowgeometry, k) => {
            type = rowgeometry.type;
            type.forEach((rowgeometry2, l) => {
                type.push(rowgeometry2);
            })
        })
        console.log(type);
    })
})

// d3.selectAll("body").append("div").text("test");