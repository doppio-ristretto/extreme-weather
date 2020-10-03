url = "http://localhost:27017/firezones";

zones = [];


d3.json(url).then((data) => {
    // console.log(data);
    data2 = data.features;
    // console.log(data2);
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
})

d3.selectAll("body").append("div").text("test");

