var weatherDesc = getCookie(weather);
var weatherStatus;

const container = document.getElementById("weather-status");
const weatherString = document.createElement("h1");

if (weather === "clear-day") {
  weatherStatus = "clear";
} else if (weather === "clear-night") {
  weatherStatus = "clear";
} else if (weather === "rain") {
  weatherStatus = "raining";
} else if (weather === "snow") {
  weatherStatus = "snowing";
} else if (weather === "sleet") {
  weatherStatus = "sleeting";
} else if (weather === "wind") {
  weatherStatus = "windy";
} else if (weather === "fog") {
  weatherStatus = "foggy";
} else if (weather === "cloudy") {
  weatherStatus = "cloudy";
} else if (weather === "partly-cloudy-day") {
  weatherStatus = "partly cloudy";
} else if (weather === "partly-cloudy-night") {
  weatherStatus = "partly cloudy";
} else {
  weatherStatus = "difficult to determine the weather";
}

weatherString.textContent =
  "It is " + weatherStatus + " in Peterborough today!";

container.appendChild(weatherString);
