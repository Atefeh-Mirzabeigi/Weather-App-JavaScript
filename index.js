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
let apiUrl = "https://api.openweathermap.org/data/2.5/";
let apiKey = "5ef18a61953b939c992cce84e77cc561";

// forecast section
function displayForecast(response) {
  console.log(response.data.daily);
  let forecastElement = document.querySelector("#forecast");

  //format the time we get from api
  function formatTime(dailyTime) {
    let date = new Date(dailyTime * 1000);
    let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    return days[date.getDay()];
  }

  let dailyArray = response.data.daily;
  let forecasts = `<div class="row justify-content-center next-days-status">`;
  dailyArray.forEach(function (forecast, index) {
    if (index < 5) {
      forecasts =
        forecasts +
        `<div class="col text-center">
    <div class="days-of-week">${formatTime(forecast.dt)}</div>
    <img
      src="http://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png"
      class="next-days"
      alt=""
    />
    <div id="forecast-detail" class="days-of-week">
      ${Math.round(forecast.temp.max)} °c
      <br />
      <small class="min-temp">${Math.round(forecast.temp.min)} °c</small>
      </div> </div>`;
    }
  });
  forecasts = forecasts + `</div>`;
  forecastElement.innerHTML = forecasts;
}

// getForecast from api
function getForecast(coordinate) {
  axios
    .get(
      `${apiUrl}onecall?lat=${coordinate.lat}&lon=${coordinate.lon}&units=metric&appid=${apiKey}`
    )
    .then(displayForecast);
}

// get response from api
function showWeather(response) {
  console.log(response.data);
  let temperature = Math.round(response.data.main.temp);
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
  document.querySelector("#windSpeed").innerHTML = `wind: ${wind} km/h`;
  document
    .querySelector("#main-icon")
    .setAttribute(
      "src",
      `http://openweathermap.org/img/wn/${weatherIcon}@2x.png`
    );
  document.querySelector("#main-icon").setAttribute("alt", `status`);
  if (handleLocation) {
    document.querySelector("#city-name").innerHTML = response.data.name;
  }
  getForecast(response.data.coord);
}

// search engine and get call to api
function changeWeather(event) {
  event.preventDefault();
  let searchValue = document.querySelector("#search-input");
  if (searchValue.value) {
    document.querySelector("#city-name").innerHTML = searchValue.value;
    axios
      .get(
        `${apiUrl}weather?q=${searchValue.value}&units=metric&appid=${apiKey}`
      )
      .then(showWeather);
  }
}
let searchButton = document.querySelector("#search-btn");
searchButton.addEventListener("click", changeWeather);

// get cuttent Location and get call to api
function handleLocation(event) {
  event.preventDefault();
  function showLocation(position) {
    let lat = position.coords.latitude;
    let lon = position.coords.longitude;
    axios
      .get(
        `weather?${apiUrl}lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`
      )
      .then(showWeather);
  }
  let getCurrentLocation =
    navigator.geolocation.getCurrentPosition(showLocation);
}

let currentLocation = document.querySelector("#current-location");
currentLocation.addEventListener("click", handleLocation);
