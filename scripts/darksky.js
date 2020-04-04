const weather = document.getElementById("weather");
const weatherDescContainer = document.getElementById("weather-status");

var request = new XMLHttpRequest();

request.open(
  "GET",
  "https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/2a01f2d4674c638b7adbdbd27e5eb19a/52.5786,-0.2412",
  true
);

request.onload = function() {
  var data = JSON.parse(this.response);
  if (request.status >= 200 && request.status < 400) {
    const celsiusTemp = ((data.currently.temperature - 32) * 5) / 9;

    const summary = document.createElement("h2");
    summary.textContent = parseFloat(celsiusTemp).toFixed(1) + "º" + " ";

    const iconName = data.currently.icon;
    document.cookie = "weather=" + data.currently.icon;

    var weatherDesc;

    const icon = document.createElement("i");

    if (iconName === "clear-day") {
      icon.setAttribute("class", "wi wi-day-sunny");
      weatherDesc = "clear";
    } else if (iconName === "clear-night") {
      icon.setAttribute("class", "wi wi-night-clear");
      weatherDesc = "clear";
    } else if (iconName === "rain") {
      icon.setAttribute("class", "wi wi-rain");
      weatherDesc = "raining";
    } else if (iconName === "snow") {
      icon.setAttribute("class", "wi wi-snow");
      weatherDesc = "snowing";
    } else if (iconName === "sleet") {
      icon.setAttribute("class", "wi wi-sleet");
      weatherDesc = "sleeting";
    } else if (iconName === "wind") {
      icon.setAttribute("class", "wi wi-windy");
      weatherDesc = "windy";
    } else if (iconName === "fog") {
      icon.setAttribute("class", "wi wi-fog");
      weatherDesc = "foggy";
    } else if (iconName === "cloudy") {
      icon.setAttribute("class", "wi wi-cloudy");
      weatherDesc = "cloudy";
    } else if (iconName === "partly-cloudy-day") {
      icon.setAttribute("class", "wi wi-day-cloudy");
      weatherDesc = "partly cloudy";
    } else if (iconName === "partly-cloudy-night") {
      icon.setAttribute("class", "wi wi-night-partly-cloudy");
      weatherDesc = "partly cloudy";
    } else {
      icon.setAttribute("class", "fas fa-times-circle");
      weatherDesc = "difficult to determine the weather";
    }
    weather.appendChild(summary);
    summary.appendChild(icon);

    const weatherString = document.createElement("h1");
    weatherString.textContent =
      "It is " +
      weatherDesc +
      " in Peterborough today! Here are our top picks:";
    weatherDescContainer.appendChild(weatherString);
  } else {
    const errorMessage = document.createElement("h2");
    errorMessage.textContent = "Error";
    weather.appendChild(errorMessage);
  }
};

request.send();
