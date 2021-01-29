const form = document.querySelector(".search-form form");
const input = document.querySelector("search-form input");
const msg = document.querySelector(".search-form .msg");
const list = document.querySelector("locations-section cities");

// api key goes here
const apiKey = "d69bf099c1a64c27c56575e55d93e3ef";
 
form.addEventListener("submit", e => {
  e.preventDefault();
  let inputVal = input.value;

const listItems = list.querySelectorAll(".locations-section .city");
const listItemArray = Array.from(listItems);

if(listItemArray.length > 0) {
    const filteredArray = listItemArray.filter(el => {
        let content = "";

        if(inputVal.split(",")[1].legnth > 2) {
            inputVal = inputVal.split(",")[0];
            content = el
            .querySelector(".city-names span")
            .textContent.toUpperCase();
        }else {
            content = el.querySelector(".city-names").dataset.name.toUpperCase();
        }
    });
}

const url = `https://api.openweathermap.org/data/2.5/weather?q=${inputVal}&appid=${apiKey}&units=metric`;

fetch(Apiurl) 
.then(response => response.json())
.then(data => {
    const { main, name, sys , weather } = data;
    const icon = `https://s3-us-west-2.amazonaws.com/s.cdpn.io/162656/${
        weather[0]["icon"]
      }.svg`;

      const li = document.createElement("li");
      li.classList.add("city");
      const markup = `
      <h3 class="city-names data-name="${name},${sys.country}">
      <span>${name}</span>
      <sup>${sys.country}</sup>
      </h3>
      <div class="city-temp">${Math.round(main.temp)}<sup>°F</sup></div>
      <figure>
      <img class="city-icon" src="${icon}" alt="${
          weather[0]["description"]
      }">
      `;
      li.innerHTML = markup;
      list.appendChild(li);
})
.catch(() => {
    msg.textContent = "Please search for a city";
});

msg.textContent = "";
form.reset();
input.focus();

});



