let searchHistory = [];
let lastCitySearched = "";

let getCityWeather = function(city) {
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

let searchSubmitHandler = function(e) {
  e.preventDefault();

  let cityName = $("#input").val().trim();

  if(cityName) {
    getCityWeather(cityName);

    $("#input").val("");
  }else {
    alert('Please enter a city name here');
  }
};

let displayWeather = function(weatherData) {
  $("#city-name").text(weatherData.name + " (" + dayjs(weatherData.dt * 1000).format("MM/DD/YYYY") + ") ").append(`<img src="https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png"></img>`);
  $("#city-temp").text("Temperature: " + weatherData.main.temp.toFixed(1) + "°F");
  $("#city-humidity").text("Humidity: " + weatherData.main.humidity + "%");
  $("#city-wind").text("Wind Speed: " + weatherData.wind.speed.toFixed(1) + "mph");

  fetch("https://api.openweathermap.org/data/2.5/uvi?lat=" + weatherData.coord.lat + "&lon="+ weatherData.coord.lon + "&appid=d69bf099c1a64c27c56575e55d93e3ef")
  .then(function(response) {
    response.json().then(function(data) {

      // uv index values
      $("#uv-data").text(data.value);

      if(data.value >= 11) {
        $("#uv-data").css("background-color", "#220473")
      }else if (data.value < 11 && data.value >= 8) {
        $("#uv-data").css("background-color", "#5f40b4")
      }else if (data.value < 8 && data.value >= 6) {
        $("#uv-data").css("background-color", "#f95901")
      }else if (data.value < 6 && data.value >= 3) {
      $("#uv-data").css("background-color", "#63597f")
      }else {
        $("#uv-data").css("background-color", "#2d3393")
      }

    })

  });
  
}

