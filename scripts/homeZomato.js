const rescard = document.getElementById("restaurantcard");

var resrequest = new XMLHttpRequest();

resrequest.open(
  "GET",
  "https://developers.zomato.com/api/v2.1/search?apikey=2a58f788418e59eed4689d8f9d1ceeb5&entity_id=109711&entity_type=subzone",
  true
);

resrequest.onload = function () {
  var resdata = JSON.parse(this.response);
  if (request.status >= 200 && request.status < 400) {
    var restaurants = resdata.restaurants;
    var restaurant =
      restaurants[Math.floor(Math.random() * restaurants.length)];

    const card = document.createElement("div");
    card.setAttribute("class", "card");

    const cardcontainer = document.createElement("div");
    cardcontainer.setAttribute("class", "card-container");

    console.log(restaurant);
    var resname = restaurant.name;

    const namecontainer = document.createElement("h3");
    const name = document.createElement("b");
    name.textContent = restaurant.restaurant.name;
    namecontainer.appendChild(name);

    cardcontainer.appendChild(namecontainer);


    card.appendChild(cardcontainer);
    rescard.appendChild(card);

  }
};

resrequest.send();
