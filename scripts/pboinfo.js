//pboinfo.js
//Contains calls to 3x APIs to supply information about the city of Peterborough!

$(document).ready(function () {
    //Darksky Request
    var darkskyrequest = new XMLHttpRequest();
    darkskyrequest.open(
        "GET",
        "https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/2a01f2d4674c638b7adbdbd27e5eb19a/52.5786,-0.2412?units=si",
        true
    );

    darkskyrequest.onload = function () {
        var darkskydata = JSON.parse(this.response);
        if (darkskyrequest.status >= 200 && darkskyrequest.status < 400) {
            const weathercard = document.getElementById("weatherinfo");
            const temp = document.createElement("h3");
            temp.textContent = "Current Temperature: " + darkskydata.currently.temperature + "°C";
            weathercard.appendChild(temp);
            const feelslike = document.createElement("h3");
            feelslike.textContent = "Feels Like: " + darkskydata.currently.apparentTemperature + "°C";
            weathercard.appendChild(feelslike);
            const hourlySum = document.createElement("h3");
            hourlySum.textContent = "Hourly Summary: " + darkskydata.hourly.summary;
            weathercard.appendChild(hourlySum);
            const precip = document.createElement("h3");
            precip.textContent = "Precipitation Probability: " + (darkskydata.currently.precipProbability * 100) + "%";
            weathercard.appendChild(precip);
            const uv = document.createElement("h3");
            uv.textContent = "UV Index: " + darkskydata.currently.uvIndex;
            weathercard.appendChild(uv);
        } else {

        }
    };

    darkskyrequest.send();
});