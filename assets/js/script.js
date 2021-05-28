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
        $("#uv-data").css("background-color", "#bb301d")
      }else if (data.value < 11 && data.value >= 8) {
        $("#uv-data").css("background-color", "#f95901")
      }else if (data.value < 8 && data.value >= 6) {
        $("#uv-data").css("background-color", "#9c3f0c")
      }else if (data.value < 6 && data.value >= 3) {
      $("#uv-data").css("background-color", "#63597f")
      }else {
        $("#uv-data").css("background-color", "#2d3393")
      }

    })

  });

  fetch("https://api.openweathermap.org/data/2.5/forecast?q=" + weatherData.name + "&appid=d69bf099c1a64c27c56575e55d93e3ef&units=imperial")
  .then(function(response) {
    response.json().then(function(data) {

      $("#five-days").empty();

      for (i = 7; i <= data.list.length; i += 8){

        let fiveDayCard= `
        <div>
          <div class="card-body">
            <h4 class="card-title">` + dayjs(data.list[i].dt * 1000).format("MM/DD/YYYY") + `</h4>
            <img src="https://openweathermap.org/img/wn/` + data.list[i].weather[0].icon + `.png" alt="rain">
            <p class="card-text">Temp: `+ data.list[i].main.temp + `</p>
            <p class="card-text">Humidity: ` + data.list[i].main.humidity + `</p>
          </div>
        </div>
        `;

        $("#five-days").append(fiveDayCard);
      }
    })
  });

  // save last city searched
  lastCitySearched = weatherData.name;

  saveSearchHistory(weatherData.name);

};

//function that saves city search history to localStorage
let saveSearchHistory = function(city) {
  if(!searchHistory.includes(city)) {
    searchHistory.push(city);
    $("#search-history").append("<a href='#' class='list-group-item list-group-item-action' id='" + city + "'>" + city + "</a>")
  }
// saving array to localStorage
  localStorage.setItem("weatherSearchHistory", JSON.stringify(searchHistory));

  localStorage.setItem("lastCitySearched", JSON.stringify(lastCitySearched));

  loadSearchHistory();
};

let loadSearchHistory = function() {
  searchHistory = JSON.parse(localStorage.getItem("weatherSearchHistory"));
  lastCitySearched = JSON.parse(localStorage.getItem("lastCitySearched"));

  // if nothing in localStorage, create an empty searchHistory array and an empty lastCitySearched string
  if (!searchHistory) {
      searchHistory = []
  }

  if (!lastCitySearched) {
      lastCitySearched = ""
  }

  // clear any previous values from th search-history ul
  $("#search-history").empty();

  // for loop that will run through all the citys found in the array
  for(i = 0 ; i < searchHistory.length ;i++) {

      // add the city as a link, set it's id, and append it to the search-history ul
      $("#search-history").append("<a href='#' class='list-group-item list-group-item-action' id='" + searchHistory[i] + "'>" + searchHistory[i] + "</a>");
  }
};

// loads search history from localStorage
loadSearchHistory();

if(lastCitySearched != "") {
  getCityWeather(lastCitySearched);
}

$("#search-form").submit(searchSubmitHandler);
$("#search-history").on("click", function(e){
  let prevCity = $(e.target).closest("a").attr("id");

  getCityWeather(prevCity);
});