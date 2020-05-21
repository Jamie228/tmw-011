//pboinfo.js
//Contains calls to 3x APIs to supply information about the city of Peterborough!

$(document).ready(function () {
    //Darksky Request
    var darkskyrequest = new XMLHttpRequest();
    //Open DarkSky request
    darkskyrequest.open(
        "GET",
        "https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/2a01f2d4674c638b7adbdbd27e5eb19a/52.5786,-0.2412?units=si",
        true
    );

    darkskyrequest.onload = function () {
        var darkskydata = JSON.parse(this.response);
        if (darkskyrequest.status >= 200 && darkskyrequest.status < 400) {
            //Get container
            const weathercard = document.getElementById("weatherinfo");
            //Get temperature and append
            const temp = document.createElement("h3");
            temp.textContent =
                "Current Temperature: " + darkskydata.currently.temperature + "°C";
            weathercard.appendChild(temp);
            //Get feels like and append
            const feelslike = document.createElement("h3");
            feelslike.textContent =
                "Feels Like: " + darkskydata.currently.apparentTemperature + "°C";
            weathercard.appendChild(feelslike);
            //Get hourly summary and append
            const hourlySum = document.createElement("h3");
            hourlySum.textContent = "Hourly Summary: " + darkskydata.hourly.summary;
            weathercard.appendChild(hourlySum);
            //Get precipitation and append
            const precip = document.createElement("h3");
            precip.textContent =
                "Precipitation Probability: " +
                darkskydata.currently.precipProbability * 100 +
                "%";
            weathercard.appendChild(precip);
            //Get UV Index and append
            const uv = document.createElement("h3");
            uv.textContent = "UV Index: " + darkskydata.currently.uvIndex;
            weathercard.appendChild(uv);
            //Get pressure and append
            const pressure = document.createElement("h3");
            pressure.textContent =
                "Pressure: " + darkskydata.currently.pressure + " mb";
            weathercard.appendChild(pressure);
            //Get cloud cover and append
            const cloudcover = document.createElement("h3");
            cloudcover.textContent =
                "Cloud Cover: " + darkskydata.currently.cloudCover * 100 + "%";
            weathercard.appendChild(cloudcover);
        } else {
            //Handle error
            const weathercard = document.getElementById("weatherinfo");
            const error = document.createElement("h3");
            error.textContent("DarkSky is unreachable");
            weathercard.appendChild(error);
        }
    };
    darkskyrequest.send();

    var airqualityrequest = new XMLHttpRequest();
    //Open request to Breezometer for air quality
    airqualityrequest.open(
        "GET",
        "https://api.breezometer.com/air-quality/v2/current-conditions?lat=52.5695&lon=-0.2405&key=5b5963bd0ebf4a25905e20be69ca3f83&features=breezometer_aqi,local_aqi,sources_and_effects,health_recommendations,pollutants_concentrations",
        true
    );

    airqualityrequest.onload = function () {
        var airqualdata = JSON.parse(this.response);
        if (airqualityrequest.status >= 200 && airqualityrequest.status < 400) {
            //Get container
            const airqualcard = document.getElementById("airquality");
            //Get and append current air quality
            const aqistatus = document.createElement("h2");
            aqistatus.textContent = "Daily Air Quality Index (DAQI): ";
            const aqcolour = document.createElement("span");
            //aqcolour.style = "color: " + airqualdata.data.indexes.baqi.color;
            aqcolour.textContent =
                airqualdata.data.indexes.gbr_defra.aqi +
                " - " +
                airqualdata.data.indexes.gbr_defra.category;

            aqistatus.appendChild(aqcolour);
            airqualcard.appendChild(aqistatus);

            //Get dominant pollutant and append
            var dompoll = airqualdata.data.indexes.gbr_defra.dominant_pollutant;
            const dominant_pollutant = document.createElement("h3");
            for (x in airqualdata.data.pollutants) {
                if (x == dompoll) {
                    dompoll = airqualdata.data["pollutants"][x]["full_name"];
                    var dompollquant =
                        airqualdata.data["pollutants"][x]["concentration"]["value"] +
                        airqualdata.data["pollutants"][x]["concentration"]["units"];
                    var dompolldesc =
                        airqualdata.data["pollutants"][x]["sources_and_effects"]["effects"];
                }
            }
            dominant_pollutant.textContent =
                "Dominant Pollutant: " + dompoll + " (" + dompollquant + ")";
            airqualcard.appendChild(dominant_pollutant);

            //Get and append information about dominant pollutant
            const polldesc = document.createElement("h3");
            polldesc.textContent = dompolldesc;
            airqualcard.appendChild(polldesc);

            const pollheadcont = document.createElement("h2");
            const pollhead = document.createElement("u");
            pollhead.textContent = "Pollutants:";
            pollheadcont.appendChild(pollhead);
            airqualcard.appendChild(pollheadcont);

            //For every pollutant, get value and append
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

            //Get and append all advice for specified groups
            const advicecont = document.createElement("h2");
            const advicehead = document.createElement("u");
            advicehead.textContent = "Advice for Groups:";
            advicecont.appendChild(advicehead);
            airqualcard.appendChild(advicecont);

            const generalPop = document.createElement("h3");
            generalPop.textContent =
                "General Population: " +
                airqualdata.data.health_recommendations.general_population;
            airqualcard.appendChild(generalPop);

            const elderly = document.createElement("h3");
            elderly.textContent =
                "Elderly: " + airqualdata.data.health_recommendations.elderly;
            airqualcard.appendChild(elderly);

            const pregnant = document.createElement("h3");
            pregnant.textContent =
                "Pregnant: " + airqualdata.data.health_recommendations.pregnant_women;
            airqualcard.appendChild(pregnant);
        } else {
            //Error handling
            const airqualcard = document.getElementById("airquality");
            const error = document.createElement("h3");
            error.textContent = "Air quality data is unavailable";
            airqualcard.appendChild(error);
        }
    };
    airqualityrequest.send();

    var pollenrequest = new XMLHttpRequest();
    //Open Breezometer request for pollen data
    pollenrequest.open(
        "GET",
        "https://api.breezometer.com/pollen/v2/forecast/daily?lat=52.5695&lon=-0.2405&key=5b5963bd0ebf4a25905e20be69ca3f83&features=types_information,plants_information&days=1",
        true
    );
    pollenrequest.onload = function () {
        var pollendata = JSON.parse(this.response);
        if (pollenrequest.status >= 200 && pollenrequest.status < 400) {
            const pollencard = document.getElementById("polleninfo");
            //For all pollen data
            for (x in pollendata.data[0].types) {
                //Check if data available
                if (pollendata.data[0].types[x].data_available === true) {
                    //Get and append all data regarding each pollen type
                    const pollenheader = document.createElement("h2");
                    pollenheader.textContent = pollendata.data[0].types[x].display_name;
                    pollencard.appendChild(pollenheader);
                    const pollenindex = document.createElement("h3");
                    pollenindex.textContent =
                        "Index: " + pollendata.data[0].types[x].index.value + " - ";
                    const polcatcol = document.createElement("span");
                    polcatcol.textContent = pollendata.data[0].types[x].index.category;
                    pollenindex.appendChild(polcatcol);
                    pollencard.appendChild(pollenindex);
                }
            }
        } else {
            //Error handling
            const pollencard = document.getElementById("polleninfo");
            const error = document.createElement("h3");
            error.textContent = "Pollen data unavilable";
            pollencard.appendChild(error);
        }
    };
    pollenrequest.send();

    var streetCrimeRequest = new XMLHttpRequest();
    //Open request to police for street crime data
    streetCrimeRequest.open(
        "GET",
        "https://data.police.uk/api/crimes-street/all-crime?lat=52.5695&lng=-0.2405",
        true
    );
    //NOTE: This API does not return a status
    streetCrimeRequest.onload = function () {
        var streetCrimeData = JSON.parse(this.response);
        const policeCard = document.getElementById("policedata");
        const streetCrimes = document.createElement("h3");
        //Get array length and append data
        streetCrimes.textContent =
            "Street Crimes in Last Month: " + streetCrimeData.length;
        policeCard.appendChild(streetCrimes);
    };
    streetCrimeRequest.send();

    var stopSearchRequest = new XMLHttpRequest();
    stopSearchRequest.open(
        "GET",
        "https://data.police.uk/api/stops-street?lat=52.5695&lng=-0.2405",
        true
    );
    stopSearchRequest.onload = function () {
        var stopSearchData = JSON.parse(this.response);
        const policeCard = document.getElementById("policedata");
        const stopSearch = document.createElement("h3");
        //Get array length and append
        stopSearch.textContent =
            "Stop and Searches in Last Month: " + stopSearchData.length;
        policeCard.appendChild(stopSearch);
    };
    stopSearchRequest.send();
});