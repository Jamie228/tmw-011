$(document).ready(function () {
  const rescard = document.getElementById("restaurantcard");

  var resrequest = new XMLHttpRequest();

  resrequest.open(
    "GET",
    "https://developers.zomato.com/api/v2.1/search?apikey=2a58f788418e59eed4689d8f9d1ceeb5&entity_id=109711&entity_type=subzone",
    true
  );

  resrequest.onload = function () {
    var resdata = JSON.parse(this.response);
    if (resrequest.status >= 200 && resrequest.status < 400) {
      var restaurants = resdata.restaurants;
      var restaurant =
        restaurants[Math.floor(Math.random() * restaurants.length)];

      const card = document.createElement("div");
      card.setAttribute("class", "card rescard");

      const cardcontainer = document.createElement("div");
      cardcontainer.setAttribute("class", "card-container");

      const namecontainer = document.createElement("h3");
      const name = document.createElement("b");
      name.textContent = restaurant.restaurant.name;
      namecontainer.appendChild(name);

      cardcontainer.appendChild(namecontainer);

      const address = document.createElement("h4");
      address.textContent = restaurant.restaurant.location.address;

      cardcontainer.appendChild(address);

      const map = document.createElement("img");
      map.setAttribute("alt", "Map of " + restaurant.restaurant.name);
      map.setAttribute("class", "image");
      map.src =
        "https://www.mapquestapi.com/staticmap/v5/map?key=alVHdXTGyfxmOIuSXLWTempLJiTPAjls&center=" +
        restaurant.restaurant.location.latitude +
        "," +
        restaurant.restaurant.location.longitude +
        "&size=500,500&locations=" +
        restaurant.restaurant.location.latitude +
        "," +
        restaurant.restaurant.location.longitude +
        "&zoom=14";

      cardcontainer.appendChild(map);

      const linkcontainer = document.createElement("p");

      const link = document.createElement("a");
      link.setAttribute("class", "btn");
      link.target = "_blank";
      link.setAttribute("rel", "noopener");
      link.href = restaurant.restaurant.url;
      link.textContent = "Discover More on Zomato";

      linkcontainer.appendChild(link);
      cardcontainer.appendChild(linkcontainer);

      card.appendChild(cardcontainer);
      rescard.appendChild(card);
    }
  };

  resrequest.send();
});
