//the day of the week and time;
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

//Global variables
let apiUrl = "https://api.openweathermap.org/data/2.5/weather?";
let apiKey = "5ef18a61953b939c992cce84e77cc561";
let getCurrentLocation = navigator.geolocation.getCurrentPosition(showLocation);

// get cuttent Location and get call to api
function showLocation(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  axios
    .get(`${apiUrl}lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`)
    .then(showWeather);
}

let currentLocation = document.querySelector("#current-location");
currentLocation.addEventListener("click", showLocation);

// search engine and get call to api
function changeWeather(event) {
  event.preventDefault();
  let searchValue = document.querySelector("#search-input");
  if (searchValue.value) {
    document.querySelector("#city-name").innerHTML = searchValue.value;
    axios
      .get(`${apiUrl}q=${searchValue.value}&units=metric&appid=${apiKey}`)
      .then(showWeather);
  }

  let searchButton = document.querySelector("#search-btn");
  searchButton.addEventListener("submit", changeWeather);

  // change weather to celsius
  function showCelsius(event) {
    event.preventDefault();
    // axios
    //   .get(`${apiUrl}q=${searchValue.value}&units=metric&appid=${apiKey}`)
    //   .then(showWeather);
    document.querySelector("#temperature").innerHTML = temperature;
    celsiusLink.classList.add("active");
    fahrenheitLink.classList.remove("active");
  }
  let celsiusLink = document.querySelector("#celsius-mode");
  celsiusLink.addEventListener("click", showCelsius);

  // change weather to fahrenheit
  function showFahrenheit(event) {
    event.preventDefault();
    // axios
    //   .get(`${apiUrl}q=${searchValue.value}&units=imperial&appid=${apiKey}`)
    //   .then(showWeather);
    let fahrenheitTemp = (temperature * 9) / 5 + 32;
    document.querySelector("#temperature").innerHTML = fahrenheitTemp;
    celsiusLink.classList.remove("active");
    fahrenheitLink.classList.add("active");
  }
  let fahrenheitLink = document.querySelector("#fahrenheit-mode");
  fahrenheitLink.addEventListener("click", showFahrenheit);
}

// get response from api
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
