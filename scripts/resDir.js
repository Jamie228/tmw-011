function initZomato(resid) {
  var zomLocReq = new XMLHttpRequest();
  zomLocReq.open(
    "GET",
    "https://developers.zomato.com/api/v2.1/restaurant?apikey=2a58f788418e59eed4689d8f9d1ceeb5&res_id=" +
      resid,
    true
  );
  zomLocReq.onload = function () {
    var zomLocData = JSON.parse(this.response);
    if (zomLocReq.status >= 200 && zomLocReq.status < 400) {
      lat = zomLocData.location.latitude;
      lon = zomLocData.location.longitude;
      name = zomLocData.name;
      getLocation(lat, lon, name);
    }
  };
  zomLocReq.send();
}

function getLocation(tlat, tlon, tname) {
  //Does browser have geolocation?
  if (navigator.geolocation) {
    //If yes get location
    navigator.geolocation.getCurrentPosition(function initVar(position) {
      directions(position, tlat, tlon, tname);
    }, unavilable);
  } else {
    //If no create object to report error
    const closestContainer = document.getElementById("closestPlace");
    const closestText = document.createElement("h1");
    closestText.textContent =
      "The closest activity to you cannot be determined right now!";
    closestContainer.appendChild(closestText);
  }
}

function unavilable() {
  const closestContainer = document.getElementById("closestPlace");
  const closestText = document.createElement("h1");
  closestText.textContent =
    "The closest activity to you cannot be determined right now!";
  closestContainer.appendChild(closestText);
}

function directions(position, tlat, tlon, restaurantName) {
  var coordConcat =
    position.coords.latitude +
    "," +
    position.coords.longitude +
    ":" +
    tlat +
    "," +
    tlon;

  var tomTomReq = new XMLHttpRequest();
  tomTomReq.open(
    "GET",
    "https://api.tomtom.com/routing/1/calculateRoute/" +
      coordConcat +
      "/json?instructionsType=text&avoid=unpavedRoads&key=Gd68RApuoamheajuUcreeA21u5DTqGae",
    true
  );

  tomTomReq.onload = function () {
    var dirData = JSON.parse(this.response);
    if (tomTomReq.status >= 200 && tomTomReq.status < 400) {
      const dirContainer = document.getElementById("restaurantDir");
      while (dirContainer.firstChild) {
        dirContainer.removeChild(dirContainer.firstChild);
      }
      const header = document.createElement("h2");
      const headerUl = document.createElement("u");
      headerUl.textContent = "Directions to " + restaurantName;
      header.appendChild(headerUl);
      dirContainer.appendChild(header);

      dirData.routes[0].guidance.instructions.forEach((instruction) => {
        const message = document.createElement("h3");
        message.textContent = instruction.message;
        dirContainer.appendChild(message);
      });

      const btn = document.createElement("button");
      btn.className = "btn";
      btn.textContent = "Close";
      btn.setAttribute("onclick", "closeDir()");
      dirContainer.appendChild(btn);

      dirContainer.className = "card weathersuggest";
      location.hash = "restaurantDir";
    }
  };
  tomTomReq.send();
}

function closeDir() {
  const directions = document.getElementById("restaurantDir");
  directions.className = "cardhidden weathersuggest";
  location.hash = "brand";
}
