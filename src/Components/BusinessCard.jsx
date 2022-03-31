import React from "react";

import { Card } from "react-bootstrap";

function BusinessCard({ item }) {
  const d = new Date();

  let time = d.getHours().toString();
  let minutes = d.getMinutes().toString();
  let today = d.getDay();

  const now = new Date();
  const checkifopen = (a, i) => {
    const def = "1900";
    let today = d.getDay();
    // let currently = parseInt(def);
    let openTimes = item.tradingtimes[1].closed.split(":");
    let closedTimes = item.tradingtimes[1].closed.split(":");
    let c = parseInt(closedTimes);
    // let c = 1700;
    let o = parseInt(openTimes);
    console.log("c", c);

    if (item.tradingtimes[i].trading === true) {
      if (a >= o && a <= c) {
        return <p>open</p>;
      } else {
        return <p>closed</p>;
      }
    } else {
      return <p>ss</p>;
    }
  };

  // const def = now.toLocaleTimeString("default", {
  //   hour: "2-digit",
  //   minute: "2-digit",
  // });
  // console.log(def);

  return (
    <div className="row_poster">
      <img key={item._id} src={item.img_logo} />
      <p className="text-center">{item.businessname}</p>
      <p>{item.address?.city}</p>
      <p>{item.tradingtimes[today].closed}</p>
      <p>{checkifopen(18, 1)}</p>
      {/* <p> {checkifopen(item, today)}</p>
                <p> {item.tradingtimes[1].closed}</p>
                <p> {}</p> */}
    </div>
  );
}

export default BusinessCard;
