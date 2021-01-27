var weatherContainerEl = document.querySelector("#weather-container");
var weatherSearchEl = document.querySelector("#citySearch");

var getWeather = function(weather) {
    var apiUrl = "api.openweathermap.org/data/2.5/forecast?q=London,uk&callback=test&appid=d69bf099c1a64c27c56575e55d93e3ef";


    fetch(apiUrl)
    .then(function(reponse) {
        reponse.json().then(function(data) {
            displayWeather(data);
        })
    });
};

var displayWeather = function(temperature) {
    
}

