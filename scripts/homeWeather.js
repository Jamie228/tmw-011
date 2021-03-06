$(document).ready(function () {
  const weather = document.getElementById("weather");
  const weatherDescContainer = document.getElementById("weather-status");

  //JSON array of things to do
  var thingstododata = [
    {
      name: "Ferry Meadows",
      address: "Ham Lane, Peterborough, Cambridgeshire, PE2 5UU",
      type: "Country Park",
      goodforpoorweather: false,
      lat: 52.5628014,
      long: -0.3113059,
      image: "ferrymeadows",
      alt: "Landscape image of Ferry Meadows on a clear day, showing a miniature railway and a lake in the background",
      link: "ferrymeadows.html",
      description:
        "Ferry Meadows Country Park gives you the space to relax and to experience nature and the great outdoors. Whether cycling, fishing, walking, jogging, flying a kite, horse riding, riding on the Ferry meadows miniature train or just relaxing – Ferry Meadows is the place to go. If you really want to explore try orienteering, download our iApp trails or search for geocaches. Have a game of pitch and putt, enjoy a boat trip or try a range of water sports at Lakeside. There really is something for everybody. When in need of refreshment, stop off at one the cafés or enjoy a picnic or a barbeque in a beautiful setting.",
    },

    {
      name: "Peterborough Cathedral",
      address:
        "The Cathedral Office, Minster Precincts, Peterborough, Cambridgeshire, PE1 1XS",
      type: "Cathedral",
      goodforpoorweather: true,
      lat: 52.5724835,
      long: -0.2413988,
      image: "cathedral",
      alt: "Far away shot of the Cathedral and its grounds on a clear and sunny day",
      link: "cathedral.html",
      description:
        "With one of the most dramatic West Fronts in the country, an extraordinary creation of medieval architecture, it would be easy for the interior to be an anticlimax, but it is not. The dramatic Romanesque interior is little altered since its completion 800 years ago and the whole building has recently undergone cleaning and restoration following the dramatic fire of November 2001. The Cathedral is a great place to visit for all ages. You can download an interactive trail with augmented reality animations for mobile phones and tablets (search for Gamar Ltd in your app store, then Peterborough Cathedral Trail), explorer backpacks designed for smaller children and an activity book for older children.",
    },

    {
      name: "Laserforce",
      address: "Brook Street, Peterborough, Cambridgeshire, PE1 1TU",
      type: "Lazer Games",
      goodforpoorweather: true,
      lat: 52.5760152,
      long: -0.240409,
      image: "laserforce",
      alt: "Room bathed in red light with laser tag vests hung around the edges.",
      link: "laserforce.html",
      description:
        "Live action laser game. Two floor space station maze. Aliens, lasers and interactive targets. Lots of fun and excitement.",
    },

    {
      name: "Bounce",
      address: "1 Wedgwood Way, Bretton, Peterborough, PE3 8AY",
      type: "Indoor Pursuits Centre",
      goodforpoorweather: true,
      lat: 52.6047047,
      long: -0.2780162,
      image: "bounce",
      alt: "Shot of numerous connected trampolines and people jumping on them. There are orange foam dividers between each one.",
      link: "bounce.html",
      description:
        "Bounce is the 1st and original Indoor Trampoline Park in the UK! Launched on 31st May 2014, Bounce parks offer over 100 interconnected state of the art trampolines in over 20,000 sqft of entertainment space! Our Bounce parks consist of differing courts including our Main Arena, Dodgeball Court, Kids Court, Slam Dunk Area, Foam Pit, Airbag Jump, Touch Walls, Gladiator Pits and Tumble Tracks, as well as an arcade and party rooms!",
    },

    {
      name: "Queensgate Shopping Centre",
      address: "Queensgate Centre, Peterborough, Cambridgeshire, PE1 1NT",
      type: "Shopping Centre",
      goodforpoorweather: true,
      lat: 52.5738054,
      long: -0.2449751,
      image: "queensgate",
      alt: "Image of a central concourse of Queensgate shopping centre. Many people are walking in many directions, and advertisement screen is visible and escalators to the first floor can be seen on the right.",
      link: "queensgate.html",
      description:
        "Queensgate is Peterborough city centres main shopping centre, home to over 90 stores including John Lewis, M&S, Bhs, Next, Boots, H&M, Primark, Superdry, River Island, Monsoon, Paperchase and many more. If you're looking for somewhere to stop for a bite to eat or a coffee you'll find lots of choice in the centre, eateries include Handmade Burger Co and Carluccio's, Costa Coffee, Muffin Break, The John Lewis Place To Eat, Cafe Revive at M&S, McDonalds, Pret and Greggs.",
    },

    {
      name: "Peterborough Lido Outdoor Swimming Pool",
      address: "Bishops Road, Peterborough, Cambridgeshire, PE1 1YY",
      type: "Swimming Outdoor",
      goodforpoorweather: false,
      lat: 52.5701659,
      long: -0.2408718,
      image: "lido",
      alt: "Image of the Lido on a cloudy day. A white building with a clock tower rising in the centre. The words 'The Lido' can be read above the entrance archway.",
      link: "lido.html",
      description:
        "The Lido boasts three heated swimming pools, of which the main pool is 50m long, a teaching pool & paddling pool. We have sunbathing terraces and a large grass area within the facility. A vending service is provided for drinks and snacks.",
    },

    {
      name: "Sacrewell",
      address:
        "Great North Road, Thornhaugh, Peterborough, Cambridgeshire, PE8 6HJ",
      type: "Farm",
      goodforpoorweather: false,
      lat: 52.5892333,
      long: -0.4089775,
      image: "sacrewell",
      alt: "Image of farm house and surrounding grounds on a sunny day.",
      link: "sacrewell.html",
      description:
        "Open all year round, there is something for everyone at Sacrewell Farm. Come and meet the friendly farm animals, visit the Shire Horse Centre, enjoy a bumpy tractor ride, and play in the indoor activity barn. Don’t miss your chance to discover our 18th century working Water Mill too.",
    },

    {
      name: "Railworld Wildlife Haven",
      address: "Oundle Road, Peterborough, Cambridgeshire, PE2 9NR",
      type: "Miniature Railway",
      goodforpoorweather: false,
      lat: 52.5680372,
      long: -0.2492285,
      image: "railworld",
      alt: "Image of hollowed out and disused train carriage suspended in the air by a bridge with a miniature railway travelling beneath it.",
      link: "railworld.html",
      description:
        "The Railworld Wildlife Haven is testament to what can be achieved when volunteers, companies, groups and individuals work together for a common goal – Encouraging Environmental Awareness. Rev Richard Paten our founder chair and life long volunteer – brought the land over 30 years ago and we have raised funds to create what we have today.... We have never had any core funding, but we have won six major UK Environmental Awards and one Worldwide Award from Caterpillar.",
    },

    {
      name: "Flag Fen Archaeological Park",
      address:
        "Flag Fen Archaeological Park, The Droveway, Northey Road, Peterborough, Cambridgeshire, PE6 7QJ",
      type: "Historical Site",
      goodforpoorweather: false,
      lat: 52.574683,
      long: -0.1918993,
      image: "flagfen",
      alt: "An image of a roundhouse on a cloudy day. There is a pole stood in the doorway and the roof is thatched.",
      link: "flagfen.html",
      description:
        "Visit Flag Fen Archaeology Park to explore how the prehistoric people of the fen lived over 3000 years ago. Wander through a Bronze Age village, sit within the reconstructed roundhouses, and stand where our ancestors once stood by the ritual causeway. Experience life in our prehistoric past and visit the only place in the UK where original Bronze Age remains can be seen in situ, the incredibly preserved timbers of a monumental engineering achievement. Excavations on the site revealed details of a wooden platform and post alignment that stretch for nearly a kilometre across the fen. These were built up between 1350 and 950BC and are of great national and international significance. Due to the waterlogged nature of the fens, this unique monument has been remarkably preserved.",
    },

    {
      name: "Central Park",
      address: "Park Crescent, Peterborough, Cambridgeshire, PE1 4DZ",
      type: "Country Park",
      goodforpoorweather: false,
      lat: 52.5842088,
      long: -0.2375554,
      image: "centralpark",
      alt: "Shot down a path in Central Park. Treese and lamp posts line the path on either side.",
      link: "centralpark.html",
      description:
        "Central Park, situated on Park Crescent, is the council's most prestigious park in the city. Several areas of the park have been refurbished over the past few years, including the sunken garden, the sensory garden and two play areas. There is also a new sand-pit and soft surfacing around the paddling pool. Other facilities at the park include an aviary, bowling greens, hard and grass tennis courts, a putting green, a croquet lawn and, last but not least, the popular Buttercross Tea-rooms! Many events are held in the park throughout the year.",
    },

    {
      name: "Elton Hall",
      address: "Elton, Peterborough, Cambridgeshire, PE8 6SH",
      type: "Historic House",
      goodforpoorweather: false,
      lat: 52.5238629,
      long: -0.3986596,
      image: "eltonhall",
      alt: "A large and imposing manor house is visible across its impressive grounds featuring a squre of topiary. The house has several towers and is clearly well kept and a place of wealth.",
      link: "eltonhall.html",
      description:
        "The Hall has been home to the Proby family since 1660.  It is an enchanting house which has evolved throughout the centuries.  Every room contains magnificent treasures, from late 15th century Old Masters, to Reynolds, Constable and remarkable Victorian painters such as Millais and Alma Tadema.  Each generation has collected books and there are three libraries containing over 10,000 books. One of the most remarkable is Henry VIII’s prayer book with inscriptions by him and his three children. The garden has been lovingly restored over the last 35 years with mature topiary, a Gothic Orangery and billowing flower borders set between immaculately cut hedges.",
    },

    {
      name: "Peterborough Museum and Art Gallery",
      address: "Priestgate, Peterborough, Cambridgeshire, PE1 1LF",
      type: "Museum",
      goodforpoorweather: true,
      lat: 52.5717777,
      long: -0.2458579,
      image: "museum",
      alt: "Image of the museum in the street. A brick building with the words 'Museum' over the doorway",
      link: "museum.html",
      description:
        "Located in one of the city's most historic buildings, Peterborough Museum has a wealth of stories to fascinate and enthral all the family. There are some amazing objects and interactive displays for all ages. The collections comprise over 200,000 items of great national and international importance.",
    },

    {
      name: "Longthorpe Tower",
      address: "Thorpe Road, Longthorpe, Peterborough, Cambridgeshire, PE3 6LU",
      type: "Historic Site",
      goodforpoorweather: true,
      lat: 52.5708228,
      long: -0.2890745,
      image: "longthorpe",
      alt: "A short square tower can be seen behind a hedge.",
      link: "longthorpe.html",
      description:
        "Situated in a quiet suburb of Peterborough is this delightful medieval tower, part of a manor house that was built around 1300. Inside you will discover a hidden gem, because the main chamber is covered with an incredible set of wall paintings from the 14th century. Leading experts have listed Longthorpe Tower as one of the 100 most important historic sites in the UK.",
    },

    {
      name: "The Key Theatre",
      address: "Embankment Rd, Peterborough, PE1 1EF",
      type: "Theatre",
      goodforpoorweather: true,
      lat: 52.5685745,
      long: -0.2410498,
      image: "keytheatre",
      alt: "Image showing banks of tiered seating around a stage that stands empty. The stage has a ladder on and the theatre is clearly in between productions.",
      link: "keytheatre.html",
      description:
        "Situated in Peterborough's city centre the Key Theatre brings great entertainment to the area with the theatre programme made up of 'home-grown' productions, national touring shows, local community productions and a full programme of one-off concerts. Also part of the Key Theatre is ‘Riva’ the fabulous restaurant offering excellent food, plus views of the Nene embankment, making this a stunning setting for city centre dining. The Key’s pantomimes are renowned throughout the region for their quality and traditional sense of good, clean, family fun. And with over 30 years of experience it’s no wonder that thousands of children have grown up enjoying panto at the Key and many now bring their own families too!",
    },
  ];

  var poorWeather = false;

  var request = new XMLHttpRequest();

  //Open request
  request.open(
    "GET",
    "https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/2a01f2d4674c638b7adbdbd27e5eb19a/52.5786,-0.2412",
    true
  );

  request.onload = function () {
    var data = JSON.parse(this.response);
    if (request.status >= 200 && request.status < 400) {
      const celsiusTemp = ((data.currently.temperature - 32) * 5) / 9;

      const summary = document.createElement("h2");
      summary.textContent = parseFloat(celsiusTemp).toFixed(1) + "º" + " ";

      const iconName = data.currently.icon;
      document.cookie = "weather=" + data.currently.icon;

      var weatherDesc;

      const icon = document.createElement("i");
      //Set weather icon
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

      //State current weather based on above IF statement
      const weatherString = document.createElement("h1");
      weatherString.textContent =
        "It is " +
        weatherDesc +
        " in Peterborough Right Now! Here Are Our Top Picks:";
      weatherDescContainer.appendChild(weatherString);

      //Another parameter for poor weather
      if (celsiusTemp < 10) {
        poorWeather = true;
      }

      var thingstodo = thingstododata;
      var listofthings = [];

      if (poorWeather === true) {
        //If the weather is poor cycle through things to do array and create a new array with only the items that are
        //suitable for the current weather
        thingstodo.forEach((thing) => {
          if (thing.goodforpoorweather === true) {
            listofthings.push(thing);
          } else {
          }
        });

        //Pull an item at random from this array, assign it to a variable and then delete that item from the array so it
        //cannot be selected again
        var item1 =
          listofthings[Math.floor(Math.random() * listofthings.length)];
        var index = listofthings.indexOf(item1);
        listofthings.splice(index, 1);
        var item2 =
          listofthings[Math.floor(Math.random() * listofthings.length)];
        index = listofthings.indexOf(item2);
        listofthings.splice(index, 1);
        var item3 =
          listofthings[Math.floor(Math.random() * listofthings.length)];
        index = listofthings.indexOf(item3);
        listofthings.splice(index, 1);

        const thingstodocontainer = document.getElementById("thingstodo");

        //Assign three randomly selected items to the finalList array
        var finalList = [item1, item2, item3];

        //For each item in the new array, create a card and append it to the document
        finalList.forEach((item) => {
          const card = document.createElement("div");
          card.setAttribute("class", "card");

          thingstodocontainer.appendChild(card);

          //Create Pictue element to serve WebP image and JPG fallback

          const pic = document.createElement("picture");
          const src = document.createElement("source");
          src.type = "image/webp";
          src.srcset = "images/webp/thingstodo/" + item.image + ".webp";
          pic.appendChild(src);

          const imgstr = "images/thingstodo/" + item.image + ".jpg";

          const img = document.createElement("img");
          img.src = imgstr;
          img.alt = item.alt;
          img.setAttribute("style", "width:100%;");

          pic.appendChild(img);
          card.appendChild(pic);

          const cardcontainer = document.createElement("div");
          cardcontainer.setAttribute("class", "card-container");

          card.appendChild(cardcontainer);

          //Activity Title

          const titlecontainer = document.createElement("h3");
          const title = document.createElement("b");
          title.textContent = item.name;
          titlecontainer.appendChild(title);
          cardcontainer.appendChild(titlecontainer);

          //Activity Type

          const typecontainer = document.createElement("h4");
          const type = document.createElement("i");
          type.textContent = item.type;
          typecontainer.appendChild(type);
          cardcontainer.appendChild(typecontainer);

          //Activity Description

          const description = document.createElement("p");
          item.description = item.description.substring(0, 300);
          description.textContent = `${item.description}...`;

          cardcontainer.appendChild(description);

          //Activity Link to Full Page

          const button = document.createElement("a");
          button.setAttribute("class", "btn");
          button.textContent = "Find Out More";
          button.href = item.link;

          cardcontainer.appendChild(button);
        });

        //As previous but for poor weather items
      } else if (poorWeather === false) {
        thingstodo.forEach((thing) => {
          if (thing.goodforpoorweather === false) {
            listofthings.push(thing);
          } else {
          }
        });

        var item1 =
          listofthings[Math.floor(Math.random() * listofthings.length)];
        var index = listofthings.indexOf(item1);
        listofthings.splice(index, 1);
        var item2 =
          listofthings[Math.floor(Math.random() * listofthings.length)];
        index = listofthings.indexOf(item2);
        listofthings.splice(index, 1);
        var item3 =
          listofthings[Math.floor(Math.random() * listofthings.length)];
        index = listofthings.indexOf(item3);
        listofthings.splice(index, 1);

        const thingstodocontainer = document.getElementById("thingstodo");

        var finalList = [item1, item2, item3];

        finalList.forEach((item) => {
          const card = document.createElement("div");
          card.setAttribute("class", "card");

          thingstodocontainer.appendChild(card);

          const pic = document.createElement("picture");
          const src = document.createElement("source");
          src.type = "image/webp";
          src.srcset = "images/webp/thingstodo/" + item.image + ".webp";
          pic.appendChild(src);

          const imgstr = "images/thingstodo/" + item.image + ".jpg";

          const img = document.createElement("img");
          img.src = imgstr;
          img.alt = item.alt;
          img.setAttribute("style", "width:100%;");

          pic.appendChild(img);
          card.appendChild(pic);

          const cardcontainer = document.createElement("div");
          cardcontainer.setAttribute("class", "card-container");

          card.appendChild(cardcontainer);

          const titlecontainer = document.createElement("h3");
          const title = document.createElement("b");
          title.textContent = item.name;
          titlecontainer.appendChild(title);
          cardcontainer.appendChild(titlecontainer);

          const typecontainer = document.createElement("h4");
          const type = document.createElement("i");
          type.textContent = item.type;
          typecontainer.appendChild(type);
          cardcontainer.appendChild(typecontainer);

          const description = document.createElement("p");
          item.description = item.description.substring(0, 300);
          description.textContent = `${item.description}...`;

          cardcontainer.appendChild(description);

          const button = document.createElement("a");
          button.setAttribute("class", "btn");
          button.textContent = "Find Out More";
          button.href = item.link;

          cardcontainer.appendChild(button);
        });
      }
    } else {
      const errorMessage = document.createElement("h2");
      errorMessage.textContent = "‽";
      weather.appendChild(errorMessage);
    }
  };

  request.send();
});
