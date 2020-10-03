url = "http://127.0.0.1:5000/data";

zones = [];


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
})

zones.forEach((row, index) => {
    var test = d3.select("body")
    test.append("div").text(zones[index])
})
d3.select("body").append("div").text("test");

