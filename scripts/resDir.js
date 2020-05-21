//FUnction with Zomato restaurant ID passed in through button
function initZomato(resid) {
  //Create request to Zomato
  var zomLocReq = new XMLHttpRequest();
  //Open request to Zomato with resid concatenated into URL
  zomLocReq.open(
    "GET",
    "https://developers.zomato.com/api/v2.1/restaurant?apikey=2a58f788418e59eed4689d8f9d1ceeb5&res_id=" +
      resid,
    true
  );
  zomLocReq.onload = function () {
    var zomLocData = JSON.parse(this.response);
    if (zomLocReq.status >= 200 && zomLocReq.status < 400) {
      //Create variables with lat and long of specific Zomato restaurant returned
      lat = zomLocData.location.latitude;
      lon = zomLocData.location.longitude;
      name = zomLocData.name;
      //Trigger function to obtain user location passing resturant name, lat and long
      getLocation(lat, lon, name);
    }
  };
  zomLocReq.send();
}

function getLocation(tlat, tlon, tname) {
  //Does browser have geolocation?
  if (navigator.geolocation) {
    //If yes get location and then immediately trigger another function passing all values through
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

//Another function to create error object if location denied or unavailable
function unavilable() {
  const closestContainer = document.getElementById("closestPlace");
  const closestText = document.createElement("h1");
  closestText.textContent =
    "The closest activity to you cannot be determined right now!";
  closestContainer.appendChild(closestText);
}

function directions(position, tlat, tlon, restaurantName) {
  //Create string that can be inserted in TomTom request
  var coordConcat =
    position.coords.latitude +
    "," +
    position.coords.longitude +
    ":" +
    tlat +
    "," +
    tlon;

  //Open request to TomTom using previously created string
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
      //Obtain ID from document and delete all children to ensure it's empty
      const dirContainer = document.getElementById("restaurantDir");
      while (dirContainer.firstChild) {
        dirContainer.removeChild(dirContainer.firstChild);
      }
      //Create header and append
      const header = document.createElement("h2");
      const headerUl = document.createElement("u");
      headerUl.textContent = "Directions to " + restaurantName;
      header.appendChild(headerUl);
      dirContainer.appendChild(header);

      //Foreach loop through directions array and output
      dirData.routes[0].guidance.instructions.forEach((instruction) => {
        const message = document.createElement("h3");
        message.textContent = instruction.message;
        dirContainer.appendChild(message);
      });

      //Append button to trigger a close function
      const btn = document.createElement("button");
      btn.className = "btn";
      btn.textContent = "Close";
      btn.setAttribute("onclick", "closeDir()");
      dirContainer.appendChild(btn);

      dirContainer.className = "card weathersuggest";
      //Jump document to specified ID
      location.hash = "restaurantDir";
    }
  };
  tomTomReq.send();
}

function closeDir() {
  //Obtain container
  const directions = document.getElementById("restaurantDir");
  //CHange class name to hide element
  directions.className = "cardhidden weathersuggest";
  //Jump document to top
  location.hash = "brand";
}
