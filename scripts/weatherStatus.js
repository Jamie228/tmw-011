var weatherDesc = getCookie("weather");
var weatherStatus;

const container = document.getElementById("weather-status");
const weatherString = document.createElement("h1");

if (weatherDesc === "clear-day") {
  weatherStatus = "clear";
} else if (weatherDesc === "clear-night") {
  weatherStatus = "clear";
} else if (weatherDesc === "rain") {
  weatherStatus = "raining";
} else if (weatherDesc === "snow") {
  weatherStatus = "snowing";
} else if (weatherDesc === "sleet") {
  weatherStatus = "sleeting";
} else if (weatherDesc === "wind") {
  weatherStatus = "windy";
} else if (weatherDesc === "fog") {
  weatherStatus = "foggy";
} else if (weatherDesc === "cloudy") {
  weatherStatus = "cloudy";
} else if (weatherDesc === "partly-cloudy-day") {
  weatherStatus = "partly cloudy";
} else if (weatherDesc === "partly-cloudy-night") {
  weatherStatus = "partly cloudy";
} else {
  weatherStatus = "difficult to determine the weather";
}

weatherString.textContent =
  "It is " + weatherStatus + " in Peterborough today!";

container.appendChild(weatherString);
