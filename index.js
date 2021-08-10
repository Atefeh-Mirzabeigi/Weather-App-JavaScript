// let weather = {
//   paris: {
//     temp: 19.7,
//     humidity: 80,
//   },
//   tokyo: {
//     temp: 17.3,
//     humidity: 50,
//   },
//   lisbon: {
//     temp: 30.2,
//     humidity: 20,
//   },
//   "san francisco": {
//     temp: 20.9,
//     humidity: 100,
//   },
//   moscow: {
//     temp: -5,
//     humidity: 20,
//   },
// };

// // 1. ask for city
// //ask as prompt and keep it
// let askCity = prompt("Enter the city:").toLowerCase();
// //let result = 0;
// if (weather[askCity] !== undefined) {
//   alert(
//     `It is currently ${weather[askCity].temp}°C (${Math.round(
//       (weather[askCity].temp * 9) / 5 + 32
//     )} °F) in ${askCity} with a humidity of ${weather[askCity].humidity}%`
//   );
// } else {
//   alert(
//     `Sorry, we don't know the weather for this city, try going to https://www.google.com/search?q=weather+${askCity}`
//   );
// }
// console.log(weather[askCity]);
// console.log(Object.keys(weather));

// //2. search in cities by for loop

// // for (const city in weather) {
// //   //if the city that user enter is equal to one if the city inside the object show the result
// //   if (askCity === city) {
// //     //console.log(weather[city].temp);
// //     alert(
// //       `It is currently ${weather[city].temp}°C (${Math.round(
// //         (weather[city].temp * 9) / 5 + 32
// //       )} °F) in ${city} with a humidity of ${weather[city].humidity}%`
// //     );
// //     //else show an alert it is not exist
// //     result = 1;
// //   }
// // }
// // if (result == 0) {
// //   alert(
// //     `Sorry, we don't know the weather for this city, try going to https://www.google.com/search?q=weather+${askCity}`
// //   );
// // }

// challenge 1
//if sth is written on the input and sb click
// change the city-name

// challenge 2
//show the day of the week and time;
let date = new Date();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let minutes = date.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}
let hours = date.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
let showDate = (document.querySelector("#current-date").innerHTML = `${
  days[date.getDay()]
} <small>${hours}:${minutes}</small>`);

// challenge 3 bonus one :))
//if click on the celsius change the temperature to celsius
//if click on the fahrenheit change the temperature to fahrenheit

let apiUrl = "https://api.openweathermap.org/data/2.5/weather?";
let apiKey = "5ef18a61953b939c992cce84e77cc561";
function changeWeather(event) {
  event.preventDefault();
  let searchValue = document.querySelector("#search-input");
  if (searchValue.value) {
    document.querySelector("#city-name").innerHTML = searchValue.value;
    axios
      .get(`${apiUrl}q=${searchValue.value}&units=metric&appid=${apiKey}`)
      .then(showWeather);
  }
  function showCelsius(event) {
    event.preventDefault();
    if (searchValue.value) {
      axios
        .get(`${apiUrl}q=${searchValue.value}&units=metric&appid=${apiKey}`)
        .then(showWeather);
      celsiusLink.classList.add("active");
      fahrenheitLink.classList.remove("active");
    }
  }
  let celsiusLink = document
    .querySelector("#celsius-mode")
    .addEventListener("click", showCelsius);

  function showFahrenheit(event) {
    event.preventDefault();
    if (searchValue.value) {
      axios
        .get(`${apiUrl}q=${searchValue.value}&units=imperial&appid=${apiKey}`)
        .then(showWeather);
      celsiusLink.classList.remove("active");
      fahrenheitLink.classList.add("active");
    } else {
      document.querySelector("#temperature").innerHTML =
        (temperature * 9) / 5 + 32;
    }
  }
  let fahrenheitLink = document
    .querySelector("#fahrenheit-mode")
    .addEventListener("click", showFahrenheit);
}
let searchButton = document.querySelector("#search-btn");
searchButton.addEventListener("click", changeWeather);

function showWeather(response) {
  console.log(response.data);
  temperature = Math.round(response.data.main.temp);
  let max = Math.round(response.data.main.temp_max);
  let min = Math.round(response.data.main.temp_min);
  let humidity = Math.round(response.data.main.humidity);
  let wind = response.data.wind.speed;
  let status = response.data.weather[0].description;
  let weatherIcon = response.data.weather[0].icon;
  document.querySelector(".weather-status").innerHTML = status;
  document.querySelector("#temperature").innerHTML = temperature;
  document.querySelector("#current-day-temperature").innerHTML = `${max} |
  <small> ${min}</small>`;
  document.querySelector("#humidity").innerHTML = `Humidity: ${humidity}%`;
  document.querySelector("#windSpeed").innerHTML = `wind: ${wind}`;
  document
    .querySelector("#main-icon")
    .setAttribute(
      "src",
      `http://openweathermap.org/img/wn/${weatherIcon}@2x.png`
    );
  document.querySelector("#main-icon").setAttribute("alt", `status`);
}

let temperature = null;
function showLocation(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  axios
    .get(`${apiUrl}lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`)
    .then(showWeather);
}
let getCurrentLocation = navigator.geolocation.getCurrentPosition(showLocation);

let currentLocation = document.querySelector("#current-location");
currentLocation.addEventListener("click", showLocation);
