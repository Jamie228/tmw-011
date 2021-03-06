$(document).ready(function () {
    //Create and open request
    var zomatoRequest = new XMLHttpRequest();
    zomatoRequest.open("GET", "https://cors-anywhere.herokuapp.com/https://developers.zomato.com/api/v2.1/search?apikey=2a58f788418e59eed4689d8f9d1ceeb5&entity_id=109711&entity_type=subzone", true);

    //Function to trigger when request loads
    zomatoRequest.onload = function () {
        var zomatoData = JSON.parse(this.response);
        if (zomatoRequest.status >= 200 && zomatoRequest.status < 400) {
            const rescontainer = document.getElementById("restuarants");
            const heading = document.getElementById("resHead");
            //Output amount of restaurants returned by counting length of array
            heading.textContent = "Try One of These " + zomatoData.restaurants.length + " Restaurants!";

            //Foreach element in returned JSON array
            zomatoData.restaurants.forEach(element => {
                const resCard = document.createElement("div");
                resCard.className = "card";
                const resCardContainer = document.createElement("div");
                resCardContainer.className = "card-container";
                //Title
                const name = document.createElement("h3");
                name.textContent = element.restaurant.name;
                resCardContainer.appendChild(name);
                //Address
                const address = document.createElement("h4");
                address.textContent = element.restaurant.location.address;
                resCardContainer.appendChild(address);
                //Cuisines
                const cuisines = document.createElement("h4");
                cuisines.textContent = "Cuisines: " + element.restaurant.cuisines;
                resCardContainer.appendChild(cuisines);
                //Rating
                const rating = document.createElement("h4");
                rating.textContent = "Aggregate Rating: ";
                //Rating Coloured Span
                const ratingtxt = document.createElement("span");
                ratingtxt.style = "color: #" + element.restaurant.user_rating.rating_color;
                ratingtxt.textContent = element.restaurant.user_rating.aggregate_rating + " (" + element.restaurant.user_rating.rating_text + ")";
                rating.appendChild(ratingtxt);
                resCardContainer.appendChild(rating);
                //Direction Button
                const dirBtn = document.createElement("button");
                dirBtn.className = "btn";
                dirBtn.id = element.restaurant.R.res_id;
                dirBtn.setAttribute("onclick", "initZomato(this.id)");
                dirBtn.textContent = "Get Directions";
                resCardContainer.appendChild(dirBtn);
                //Zomato Link
                const linkholder = document.createElement("p");
                const link = document.createElement("a");
                link.href = element.restaurant.url;
                link.className = "btn";
                link.textContent = "See On Zomato";
                linkholder.appendChild(link);
                resCardContainer.appendChild(linkholder);

                resCard.appendChild(resCardContainer);
                rescontainer.appendChild(resCard);
            });
        } else {
            //Append error
            const head = document.getElementById("resHead");
            head.textContent = "Zomato Daata Cannot be Reached at This Time";
        }
    }
    zomatoRequest.send();
});