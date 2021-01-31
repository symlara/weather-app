
// variables for the button and input elements
var buttonEl = document.querySelector(".search-form button");
var inputValEl = document.querySelector(".search-form input");
var citysearchItemEl = document.querySelector("cityItemsContainer");


 
buttonEl.addEventListener("submit", e => {
    let inputVal = input.value;
    e.preventDefault();
    searchForecast(inpurVal)
    renderList(inputVal)
});


var searchForecast = function() {   
    var apiUrl = "api.openweathermap.org/data/2.5/weather?q=Nashville&appid=d69bf099c1a64c27c56575e55d93e3ef";

    fetch(apiUrl).then(function(response) {

        if(response.ok) {
            response.json().then(function(data) {
                const {main, name, sys, weather } = data;
                const icon = `https://openweathermap.org/img/wn/${
        weather[0]["icon"]
      }@2x.png`;
                displayCities(data.items);
                console.log(data);
            });
        }
    })
    .catch(function(error) {
        alert("Unable to connect.");
    });
};

const li = document.createElement("li");
li.classList.add("city");
const markup = <h2 class="city-names" data-name="${name},${sys.country}">
<span>${name}</span>
<sup>${sys.country}</sup>
</h2>