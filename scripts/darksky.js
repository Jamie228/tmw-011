const weather = document.getElementById("weather");

var request = new XMLHttpRequest();

request.open('GET', "https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/2a01f2d4674c638b7adbdbd27e5eb19a/52.5786,-0.2412", true);

request.onload = function () {
    var data = JSON.parse(this.response);
    if (request.status >= 200 && request.status < 400) {
        //const temp = document.createElement("h2");
        const celsiusTemp = (data.currently.temperature - 32) * 5/9;
        //temp.textContent = parseFloat(celsiusTemp).toFixed(2) + " ºC";

        const summary = document.createElement("h2");
        summary.textContent = parseFloat(celsiusTemp).toFixed(2) + " ºC" + " • " + data.currently.summary + "  ";

        const iconName = data.currently.icon;

        const icon = document.createElement("i");
        icon.setAttribute("style", "font-size:2em;")
        
        if (iconName === "clear-day") {
            icon.setAttribute("class", "wi wi-day-sunny");
        } else if (iconName === "clear-night") {
            icon.setAttribute("class", "wi wi-night-clear");
        } else if (iconName === "rain") {
            icon.setAttribute("class", "wi wi-rain");
        } else if (iconName === "snow") {
            icon.setAttribute("class", "wi wi-snow");
        } else if (iconName === "sleet") {
            icon.setAttribute("class", "wi wi-sleet");
        } else if (iconName === "wind") {
            icon.setAttribute("class", "wi wi-windy");
        } else if (iconName === "fog") {
            icon.setAttribute("class", "wi wi-fog");
        } else if (iconName === "cloudy") {
            icon.setAttribute("class", "wi-cloudy");
        } else if (iconName === "partly-cloudy-day") {
            icon.setAttribute("class", "wi wi-day-cloudy");
        } else if (iconName === "partly-cloudy-night") {
            icon.setAttribute("class", "wi wi-night-partly-cloudy");
        } else {
            icon.setAttribute("class", "fas fa-times-circle");
        }

        //weather.appendChild(temp);
        weather.appendChild(summary);
        summary.appendChild(icon);
    } else {
        const errorMessage = document.createElement("marquee");
        errorMessage.textContent = "It's not working!";
        weather.appendChild(errorMessage);
    }
}

request.send();