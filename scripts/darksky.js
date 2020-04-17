$(document).ready(function () {
  const weather = document.getElementById("weather");
  var weatherrequest = new XMLHttpRequest();

  weatherrequest.open(
    "GET",
    "https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/2a01f2d4674c638b7adbdbd27e5eb19a/52.5786,-0.2412",
    true
  );

  //request.setRequestHeader("X-Requested-With", "XMLHttpRequest");

  weatherrequest.onload = function () {
    var data = JSON.parse(this.response);
    if (weatherrequest.status >= 200 && weatherrequest.status < 400) {
      const celsiusTemp = ((data.currently.temperature - 32) * 5) / 9;

      const summary = document.createElement("h2");
      summary.textContent = parseFloat(celsiusTemp).toFixed(1) + "º" + " ";

      const iconName = data.currently.icon;
      document.cookie = "weather=" + data.currently.icon;

      var weatherDesc;

      const icon = document.createElement("i");

      if (iconName === "clear-day") {
        icon.setAttribute("class", "wi wi-day-sunny");
        weatherDesc = "Clear";
        poorWeather = false;
      } else if (iconName === "clear-night") {
        icon.setAttribute("class", "wi wi-night-clear");
        weatherDesc = "Clear";
        poorWeather = false;
      } else if (iconName === "rain") {
        icon.setAttribute("class", "wi wi-rain");
        weatherDesc = "Raining";
        poorWeather = true;
      } else if (iconName === "snow") {
        icon.setAttribute("class", "wi wi-snow");
        weatherDesc = "Snowing";
        poorWeather = true;
      } else if (iconName === "sleet") {
        icon.setAttribute("class", "wi wi-sleet");
        weatherDesc = "Sleeting";
        poorWeather = true;
      } else if (iconName === "wind") {
        icon.setAttribute("class", "wi wi-windy");
        weatherDesc = "Windy";
        poorWeather = true;
      } else if (iconName === "fog") {
        icon.setAttribute("class", "wi wi-fog");
        weatherDesc = "Foggy";
        poorWeather = true;
      } else if (iconName === "cloudy") {
        icon.setAttribute("class", "wi wi-cloudy");
        weatherDesc = "Cloudy";
        poorWeather = false;
      } else if (iconName === "partly-cloudy-day") {
        icon.setAttribute("class", "wi wi-day-cloudy");
        weatherDesc = "Partly Cloudy";
        poorWeather = false;
      } else if (iconName === "partly-cloudy-night") {
        icon.setAttribute("class", "wi wi-night-partly-cloudy");
        weatherDesc = "Partly Cloudy";
        poorWeather = false;
      } else {
        icon.setAttribute("class", "fas fa-times-circle");
        weatherDesc = "Difficult to Determine the Weather";
        poorWeather = true;
      }
      weather.appendChild(summary);
      summary.appendChild(icon);


    }
  };
  weatherrequest.send();
});
