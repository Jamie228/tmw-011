$(document).ready(function () {
  const container = document.getElementById("whatsoncards");
  var tmreq = new XMLHttpRequest();

  //Open request to Ticketmaster
  tmreq.open(
    "GET",
    "https://app.ticketmaster.com/discovery/v2/events.json?size=25&geoPoint=gcrg49b&&radius=25&apikey=Q4btKNXfZsnFlQKTn4CucEwhaqSLZ3eT",
    true
  );

  tmreq.onload = function () {
    var tmdata = JSON.parse(this.response);
    if (tmreq.status >= 200 && tmreq.status < 400) {
      //FOREACH event returned from request
      tmdata._embedded.events.forEach((event) => {
        //Create cards
        const card = document.createElement("div");
        card.setAttribute("class", "card");

        //Create inner card container
        const cardcontainer = document.createElement("div");
        cardcontainer.setAttribute("class", "card-container");

        //Create image for event and append to card
        const image = document.createElement("img");
        image.src = event.images[0].url;
        image.alt = "Image of " + event.name + " from Ticketmaster";
        image.setAttribute("style", "width: 100%;");
        card.appendChild(image);

        //Create card title with event name
        const title = document.createElement("h3");
        title.textContent = event.name;
        cardcontainer.appendChild(title);

        //Create card date from event date
        const date = document.createElement("h4");
        date.textContent = event.dates.start.localDate;
        cardcontainer.appendChild(date);

        //Create card venue from event's venue
        const venue = document.createElement("h4");
        venue.textContent = event._embedded.venues[0].name;
        cardcontainer.appendChild(venue);

        //Create button that links to TM page for event
        const btncontainer = document.createElement("p");
        const btn = document.createElement("a");
        btn.setAttribute("class", "btn");
        btn.href = event.url;
        btn.textContent = "View on Ticketmaster";
        btncontainer.appendChild(btn);
        cardcontainer.appendChild(btncontainer);

        //Appends card container to card
        card.appendChild(cardcontainer);
        //Append card to document's container
        container.appendChild(card);
      });
    }
  };
  tmreq.send();
});
