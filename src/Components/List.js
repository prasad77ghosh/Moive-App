import React, { Component } from "react";
import "./List.css";
import { movies } from "./getMovies";

export default class List extends Component {
  render() {
    let movie = movies.results;
    // let movie = "";

    return (
      <>
        {movie === "" ? (
          <div className="container">
            <div className="loader" />
            <h3>Loading...</h3>
          </div>
        ) : (
          <div className="main-list-cont">
            <h1>-- Trending --</h1>
            <div className="list-cont">
              {movie.map((movieObj) => (
                <div className="Item">
                  <img
                    src={`https://image.tmdb.org/t/p/original${movieObj.backdrop_path}`}
                    alt="..."
                    className="banner-img"
                  />
                  <div className="Item-title-cont">
                    <p className="banner-title">{movieObj.original_title}</p>
                  </div>

                  <div className="add-btn">
                    <a href="#">AddToFavourite</a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </>
    );
  }
}
