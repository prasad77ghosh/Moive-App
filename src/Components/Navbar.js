import React, { Component } from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";

export default class Navbar extends Component {
  render() {
    return (
      <div className="header">
        <Link to="/" style={{ textDecoration: "none", color: "#fff" }}>
          <h4>Moives App</h4>
        </Link>
        <div className="header-list">
          <Link to="/" style={{ textDecoration: "none", color: "#fff" }}>
            <p>Home</p>
          </Link>

          <Link
            to="/favourites"
            style={{ textDecoration: "none", color: "#fff" }}
          >
            <p>Favourite</p>
          </Link>
        </div>
      </div>
    );
  }
}
