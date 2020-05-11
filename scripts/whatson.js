$(document).ready(function () {
  const container = document.getElementById("whatsoncards");
  var tmreq = new XMLHttpRequest();

  tmreq.open(
    "GET",
    "https://app.ticketmaster.com/discovery/v2/events.json?size=25&geoPoint=gcrg49b&&radius=25&apikey=Q4btKNXfZsnFlQKTn4CucEwhaqSLZ3eT",
    true
  );

  tmreq.onload = function () {
    var tmdata = JSON.parse(this.response);
    if (tmreq.status >= 200 && tmreq.status < 400) {
      tmdata._embedded.events.forEach((event) => {
        const card = document.createElement("div");
        card.setAttribute("class", "card");

        const cardcontainer = document.createElement("div");
        cardcontainer.setAttribute("class", "card-container");

        const image = document.createElement("img");
        image.src = event.images[0].url;
        image.setAttribute("style", "width: 100%;");
        card.appendChild(image);

        const title = document.createElement("h3");
        title.textContent = event.name;
        cardcontainer.appendChild(title);

        const date = document.createElement("h4");
        date.textContent = event.dates.start.localDate;
        cardcontainer.appendChild(date);

        const venue = document.createElement("h4");
        venue.textContent = event._embedded.venues[0].name;
        cardcontainer.appendChild(venue);

        const btncontainer = document.createElement("p");
        const btn = document.createElement("a");
        btn.setAttribute("class", "btn");
        btn.href = event.url;
        btn.textContent = "View on Ticketmaster"
        btncontainer.appendChild(btn);
        cardcontainer.appendChild(btncontainer);

        card.appendChild(cardcontainer);
        container.appendChild(card);
      });
    }
  };
  tmreq.send();
});
