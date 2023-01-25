import React from "react";
import CardItem from "./CardItem";
import "./Cards.css";
function Cards() {
  return (
    <div className="cards">
      <h1>Check out these EPIC Destinations!</h1>
      <div class="cards__container">
        <div class="cards__wrapper">
          <ul class="cards__items">
            <CardItem
              src="../images/img-9.jpg"
              text="Watch These 5 new movies!"
              label="Top 5"
              path="/watch"
            />
            <CardItem
              src="../images/img-2.jpg"
              text="Watch These 5 new movies!"
              label="Top 5"
              path="/watch"
            />
          </ul>
          <ul className="cards__items">
            <CardItem
              src="../images/img-4.jpg"
              text="Watch These 5 new movies!"
              label="Top 5"
              path="/watch"
            />
            <CardItem
              src="../images/img-6.jpg"
              text="Watch These 5 new movies!"
              label="Top 5"
              path="/watch"
            />
            <CardItem
              src="../images/img-6.jpg"
              text="Watch These 5 new movies!"
              label="Top 5"
              path="/watch"
            />
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Cards;
