
// variables for the button and input elements
var buttonEl = document.querySelector(".search-form button");
var inputVal = document.querySelector(".search-form input");
var msg = document.querySelector(".search-form msg");

const apiKey = "d69bf099c1a64c27c56575e55d93e3ef";
  
buttonEl.addEventListener("submit", e => {
    e.preventDefault();
    const listItems = list.querySelectorAll(".ajax-container .cities");
    const inputVal = input.value;
});

    //ajax
    const apiUrl = "api.openweathermap.org/data/2.5/weather?q=Nashville&appid=d69bf099c1a64c27c56575e55d93e3ef";

  

   fetch(apiUrl).then(response => {
       response.json()
       .then(data => {
           const { main, name, sys, weather } = data;
           const icon = "http://openweathermap.org/img/wn/10d@2x.png";

           const li = document.createElement("li");

           li.classList.add("city");
           const markup = `
           <h2 class="city-name" data-name="${name},${sys.country}">
             <span>${name}</span>
             <sup>${sys.country}</sup>
           </h2>
           <div class="city-temp">${Math.round(main.temp)}<sup>°C</sup></div>
           <figure>
             <img class="city-icon" src=${icon} alt=${weather[0]["main"]}>
           </figure>`;

           li.innerHTML = markup;
           list.appendChild(li);
       })
       .catch((error) => {
                alert("Unable to find city info");
              });
   });
     








