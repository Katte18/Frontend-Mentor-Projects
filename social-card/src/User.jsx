import React from "react";
import UserImg from "./images/avatar-jessica.jpeg";

function User() {
  return (
    <section className="user-info">
      <div className="user-info-img">
        <img src={UserImg} alt="Jessica Randall"></img>
      </div>

      <div className="user-info-name">
        <h2>Jessica Randall</h2>
        <p>London, United Kingdom</p>
      </div>

      <div className="user-info-quote">
        <q>Front-end developer and avid reader.</q>
      </div>
    </section>
  );
}

export default User;
