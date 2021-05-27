let searchHistory = [];
let lastCitySearched = "";

let getCityWeater = function(city) {
  let apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=ce39e7239416ad754359ca762d28521a&units=imperial";

  fetch(apiUrl)
  .then(function(response) {
    // response success
    if (response.ok) {
      response.json().then(function(data) {
        displayWeather(data);
      });
      // request failed
    }else {
      alert("Error: " + response.statusText);
    }

  })

  .catch(function(error) {
    alert("Unable to connect to OpenWeather App");
  })

};

