var url = "https://api.weather.gov/alerts/active?area=CA"

d3.json(url).then(function(data){
    console.log(data)
});