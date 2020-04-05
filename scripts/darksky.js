const weather = document.getElementById("weather");
const weatherDescContainer = document.getElementById("weather-status");

var thingstododata = [
  {
    name: "Ferry Meadows",
    address: "Ham Lane, Peterborough, Cambridgeshire, PE2 5UU",
    type: "Country Park",
    goodforpoorweather: false,
    lat: 52.5628014,
    long: -0.3113059,
    description:
      "Ferry Meadows Country Park gives you the space to relax and to experience nature and the great outdoors. Whether cycling, fishing, walking, jogging, flying a kite, horse riding, riding on the Ferry meadows miniature train or just relaxing – Ferry Meadows is the place to go. If you really want to explore try orienteering, download our iApp trails or search for geocaches. Have a game of pitch and putt, enjoy a boat trip or try a range of water sports at Lakeside. There really is something for everybody. When in need of refreshment, stop off at one the cafés or enjoy a picnic or a barbeque in a beautiful setting."
  },

  {
    name: "Peterborough Cathedral",
    address:
      "The Cathedral Office, Minster Precincts, Peterborough, Cambridgeshire, PE1 1XS",
    type: "Cathedral",
    goodforpoorweather: true,
    lat: 52.5724835,
    long: -0.2413988,
    description:
      "With one of the most dramatic West Fronts in the country, an extraordinary creation of medieval architecture, it would be easy for the interior to be an anticlimax, but it is not. The dramatic Romanesque interior is little altered since its completion 800 years ago and the whole building has recently undergone cleaning and restoration following the dramatic fire of November 2001. The Cathedral is a great place to visit for all ages. You can download an interactive trail with augmented reality animations for mobile phones and tablets (search for Gamar Ltd in your app store, then Peterborough Cathedral Trail), explorer backpacks designed for smaller children and an activity book for older children."
  },

  {
    name: "Laserforce",
    address: "Brook Street, Peterborough, Cambridgeshire, PE1 1TU",
    type: "Lazer Games",
    goodforpoorweather: true,
    lat: 52.5760152,
    long: -0.240409,
    description:
      "Live action laser game. Two floor space station maze. Aliens, lasers and interactive targets. Lots of fun and excitement."
  },

  {
    name: "Bounce",
    address: "1 Wedgwood Way, Bretton, Peterborough, PE3 8AY",
    type: "Indoor Pursuits Centre",
    goodforpoorweather: true,
    lat: 52.6047047,
    long: -0.2780162,
    description:
      "Bounce is the 1st and original Indoor Trampoline Park in the UK! Launched on 31st May 2014, Bounce parks offer over 100 interconnected state of the art trampolines in over 20,000 sqft of entertainment space! Our Bounce parks consist of differing courts including our Main Arena, Dodgeball Court, Kids Court, Slam Dunk Area, Foam Pit, Airbag Jump, Touch Walls, Gladiator Pits and Tumble Tracks, as well as an arcade and party rooms!"
  },

  {
    name: "Queensgate Shopping Centre",
    address: "Queensgate Centre, PETERBOROUGH, Cambridgeshire, PE1 1NT",
    type: "Shopping Centre",
    goodforpoorweather: true,
    lat: 52.5738054,
    long: -0.2449751,
    description:
      "Queensgate is Peterborough city centres main shopping centre, home to over 90 stores including John Lewis, M&S, Bhs, Next, Boots, H&M, Primark, Superdry, River Island, Monsoon, Paperchase and many more. If you're looking for somewhere to stop for a bite to eat or a coffee you'll find lots of choice in the centre, eateries include Handmade Burger Co and Carluccio's, Costa Coffee, Muffin Break, The John Lewis Place To Eat, Cafe Revive at M&S, McDonalds, Pret and Greggs."
  },

  {
    name: "Peterborough Lido Outdoor Swimming Pool",
    address: "Bishops Road, PETERBOROUGH, Cambridgeshire, PE1 1YY",
    type: "Swimming Outdoor",
    goodforpoorweather: false,
    lat: 52.5701659,
    long: -0.2408718,
    description:
      "The Lido boasts three heated swimming pools, of which the main pool is 50m long, a teaching pool & paddling pool. We have sunbathing terraces and a large grass area within the facility. A vending service is provided for drinks and snacks."
  },

  {
    name: "Sacrewell",
    address:
      "Great North Road, Thornhaugh, PETERBOROUGH, Cambridgeshire, PE8 6HJ",
    type: "Farm",
    goodforpoorweather: false,
    lat: 52.5892333,
    long: -0.4089775,
    description:
      "Open all year round, there is something for everyone at Sacrewell Farm. Come and meet the friendly farm animals, visit the Shire Horse Centre, enjoy a bumpy tractor ride, and play in the indoor activity barn. Don’t miss your chance to discover our 18th century working Water Mill too."
  },

  {
    name: "Railworld Wildlife Haven",
    address: "Oundle Road, PETERBOROUGH, Cambridgeshire, PE2 9NR",
    type: "Miniature Railway",
    goodforpoorweather: false,
    lat: 52.5680372,
    long: -0.2492285,
    description:
      "The Railworld Wildlife Haven is testament to what can be achieved when volunteers, companies, groups and individuals work together for a common goal – Encouraging Environmental Awareness. Rev Richard Paten our founder chair and life long volunteer – brought the land over 30 years ago and we have raised funds to create what we have today.... We have never had any core funding, but we have won six major UK Environmental Awards and one Worldwide Award from Caterpillar."
  }
];

var poorWeather = false;

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
      poorWeather = false;
    } else if (iconName === "clear-night") {
      icon.setAttribute("class", "wi wi-night-clear");
      weatherDesc = "clear";
      poorWeather = false;
    } else if (iconName === "rain") {
      icon.setAttribute("class", "wi wi-rain");
      weatherDesc = "raining";
      poorWeather = true;
    } else if (iconName === "snow") {
      icon.setAttribute("class", "wi wi-snow");
      weatherDesc = "snowing";
      poorWeather = true;
    } else if (iconName === "sleet") {
      icon.setAttribute("class", "wi wi-sleet");
      weatherDesc = "sleeting";
      poorWeather = true;
    } else if (iconName === "wind") {
      icon.setAttribute("class", "wi wi-windy");
      weatherDesc = "windy";
      poorWeather = true;
    } else if (iconName === "fog") {
      icon.setAttribute("class", "wi wi-fog");
      weatherDesc = "foggy";
      poorWeather = true;
    } else if (iconName === "cloudy") {
      icon.setAttribute("class", "wi wi-cloudy");
      weatherDesc = "cloudy";
      poorWeather = false;
    } else if (iconName === "partly-cloudy-day") {
      icon.setAttribute("class", "wi wi-day-cloudy");
      weatherDesc = "partly cloudy";
      poorWeather = false;
    } else if (iconName === "partly-cloudy-night") {
      icon.setAttribute("class", "wi wi-night-partly-cloudy");
      weatherDesc = "partly cloudy";
      poorWeather = false;
    } else {
      icon.setAttribute("class", "fas fa-times-circle");
      weatherDesc = "difficult to determine the weather";
      poorWeather = true;
    }
    weather.appendChild(summary);
    summary.appendChild(icon);

    const weatherString = document.createElement("h1");
    weatherString.textContent =
      "It is " +
      weatherDesc +
      " in Peterborough today! Here are our top picks:";
    weatherDescContainer.appendChild(weatherString);

    var thingstodo = thingstododata;
    var listofthings = [];

    if (poorWeather === true) {
      thingstodo.forEach(thing => {
        if (thing.goodforpoorweather === true) {
          listofthings.push(thing);
        } else {
        }
      });

      var item1 = listofthings[Math.floor(Math.random() * listofthings.length)];
      var index = listofthings.indexOf(item1);
      listofthings.splice(index, 1);
      var item2 = listofthings[Math.floor(Math.random() * listofthings.length)];
      index = listofthings.indexOf(item2);
      listofthings.splice(index, 1);
      var item3 = listofthings[Math.floor(Math.random() * listofthings.length)];
      index = listofthings.indexOf(item3);
      listofthings.splice(index, 1);

      const thingstodocontainer = document.getElementById("thingstodo");

      var finalList = [item1, item2, item3];

      finalList.forEach(item => {
        const card = document.createElement("div");
        card.setAttribute("class", "card");

        thingstodocontainer.appendChild(card);

        const img = document.createElement("img");
        img.src = card.appendChild(img);

        const cardcontainer = document.createElement("div");
        cardcontainer.setAttribute("class", "card-container");

        card.appendChild(cardcontainer);

        const titlecontainer = document.createElement("h4");
        const title = document.createElement("b");
        title.textContent = item.name;
        titlecontainer.appendChild(title);
        cardcontainer.appendChild(titlecontainer);

        const description = document.createElement("p");
        item.description = item.description.substring(0, 300);
        description.textContent = `${item.description}...`;

        cardcontainer.appendChild(description);
      });
    } else if (poorWeather === false) {
      thingstodo.forEach(thing => {
        if (thing.goodforpoorweather === false) {
          listofthings.push(thing);
        } else {
        }
      });

      var item1 = listofthings[Math.floor(Math.random() * listofthings.length)];
      var index = listofthings.indexOf(item1);
      listofthings.splice(index, 1);
      var item2 = listofthings[Math.floor(Math.random() * listofthings.length)];
      index = listofthings.indexOf(item2);
      listofthings.splice(index, 1);
      var item3 = listofthings[Math.floor(Math.random() * listofthings.length)];
      index = listofthings.indexOf(item3);
      listofthings.splice(index, 1);

      const thingstodocontainer = document.getElementById("thingstodo");

      var finalList = [item1, item2, item3];

      finalList.forEach(item => {
        const card = document.createElement("div");
        card.setAttribute("class", "card");

        thingstodocontainer.appendChild(card);

        const img = document.createElement("img");
        img.src = card.appendChild(img);

        const cardcontainer = document.createElement("div");
        cardcontainer.setAttribute("class", "card-container");

        card.appendChild(cardcontainer);

        const titlecontainer = document.createElement("h4");
        const title = document.createElement("b");
        title.textContent = item.name;
        titlecontainer.appendChild(title);
        cardcontainer.appendChild(titlecontainer);

        const description = document.createElement("p");
        item.description = item.description.substring(0, 300);
        description.textContent = `${item.description}...`;

        cardcontainer.appendChild(description);
      });
    }
  } else {
    const errorMessage = document.createElement("h2");
    errorMessage.textContent = "Error";
    weather.appendChild(errorMessage);
  }
};

request.send();
