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
            temp.textContent =
                "Current Temperature: " + darkskydata.currently.temperature + "°C";
            weathercard.appendChild(temp);
            const feelslike = document.createElement("h3");
            feelslike.textContent =
                "Feels Like: " + darkskydata.currently.apparentTemperature + "°C";
            weathercard.appendChild(feelslike);
            const hourlySum = document.createElement("h3");
            hourlySum.textContent = "Hourly Summary: " + darkskydata.hourly.summary;
            weathercard.appendChild(hourlySum);
            const precip = document.createElement("h3");
            precip.textContent =
                "Precipitation Probability: " +
                darkskydata.currently.precipProbability * 100 +
                "%";
            weathercard.appendChild(precip);
            const uv = document.createElement("h3");
            uv.textContent = "UV Index: " + darkskydata.currently.uvIndex;
            weathercard.appendChild(uv);
        } else {}
    };
    darkskyrequest.send();

    var airqualityrequest = new XMLHttpRequest();
    airqualityrequest.open(
        "GET",
        "https://api.breezometer.com/air-quality/v2/current-conditions?lat=52.5695&lon=-0.2405&key=5b5963bd0ebf4a25905e20be69ca3f83&features=breezometer_aqi,local_aqi,sources_and_effects,health_recommendations,pollutants_concentrations",
        true
    );

    airqualityrequest.onload = function () {
        var airqualdata = JSON.parse(this.response);
        if (airqualityrequest.status >= 200 && airqualityrequest.status < 400) {
            const airqualcard = document.getElementById("airquality");
            const aqistatus = document.createElement("h3");
            aqistatus.textContent =
                "Daily Air Quality Index (DAQI): " +
                airqualdata.data.indexes.gbr_defra.aqi +
                " - " +
                airqualdata.data.indexes.gbr_defra.category;
            airqualcard.style =
                "border-color: " + airqualdata.data.indexes.baqi.color;
            airqualcard.appendChild(aqistatus);

            var dompoll = airqualdata.data.indexes.gbr_defra.dominant_pollutant;
            const dominant_pollutant = document.createElement("h3");
            for (x in airqualdata.data.pollutants) {
                if (x == dompoll) {
                    dompoll = airqualdata.data["pollutants"][x]["full_name"];
                    var dompolldesc = airqualdata.data["pollutants"][x]["sources_and_effects"]["effects"];
                }
            }
            dominant_pollutant.textContent = "Dominant Pollutant: " + dompoll;
            airqualcard.appendChild(dominant_pollutant);

            const polldesc = document.createElement("h3");
            polldesc.textContent = dompolldesc;
            airqualcard.appendChild(polldesc);

            const pollheadcont = document.createElement("h2");
            const pollhead = document.createElement("u");
            pollhead.textContent = "Pollutants:";
            pollheadcont.appendChild(pollhead);
            airqualcard.appendChild(pollheadcont);

            for (x in airqualdata.data.pollutants) {
                const poll = document.createElement("h3");
                poll.textContent =
                    airqualdata.data["pollutants"][x]["full_name"] +
                    " (" +
                    airqualdata.data["pollutants"][x]["display_name"] +
                    ") : " +
                    airqualdata.data["pollutants"][x]["concentration"]["value"] +
                    " " +
                    airqualdata.data["pollutants"][x]["concentration"]["units"];
                airqualcard.appendChild(poll);
            }
        }
    };
    airqualityrequest.send();
});