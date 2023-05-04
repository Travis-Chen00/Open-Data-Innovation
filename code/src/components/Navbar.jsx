import React from 'react'
import House from'../assets/house.jpg'
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <div className="navbar">
    <div className="container">
      <div className="logo">
        <Link to="/">
        <img src={House} alt="" />
        </Link>
      </div>
      <div className="links">
        <Link className="link" to="/">
          <h6>House</h6>
        </Link>
        <Link className="link" to="/predicate">
          <h6>Predicate</h6>
        </Link>
        <div className="user">
            <img
              src={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRCyKPCO61vJyKItpXnJXKu9vtWpgbsb2kcSoIvcmvhxkNqYLpJL85z0U9Owhs6dpoJlMQ&usqp=CAU"}
              alt=""
            />
            <span>Buyer1</span>
          </div>
      </div>
    </div>
  </div>
  )
}
