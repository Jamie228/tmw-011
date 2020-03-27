const weather = document.getElementById("weather");

var request = new XMLHttpRequest();

request.open('GET', "https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/2a01f2d4674c638b7adbdbd27e5eb19a/52.5786,-0.2412", true);

request.onload = function () {
    var data = JSON.parse(this.response);
    if (request.status >= 200 && request.status < 400) {
        const temp = document.createElement("h2");
        temp.textContent = (data.currently.temperature).toString();

        const summary = document.createElement("h2");
        summary.textContent = data.currently.summary;

        weather.appendChild(temp);
        weather.appendChild(summary);
    } else {
        const errorMessage = document.createElement("marquee");
        errorMessage.textContent = "It's not working!";
        weather.appendChild(errorMessage);
    }
}

request.send();