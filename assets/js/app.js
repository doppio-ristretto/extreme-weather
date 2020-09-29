url = "https://api.weather.gov/alerts/active?area=CA";

d3.json(url).then((data) => {
    console.log(data);
    data2 = data.features;
    // console.log(data2);
    console.log(data2.forEach((row, i) => {
        affectedZones = row.properties.affectedZones;
        // console.log(affectedZones);
        affectedZones.forEach((row, j) => {
            fires = row;
            console.log(`Zone: ${i}, fire #${j} ${fires}`);
        })
    }));
})