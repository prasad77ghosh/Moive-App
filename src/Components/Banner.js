import React, { Component } from "react";
import "./Banner.css";
import { movies } from "./getMovies";

export default class Banner extends Component {
  constructor() {
    super();

    this.state = {
      idx: Math.floor(Math.random() * 20 + 1),
    };
  }

  render() {
    let movie = movies.results[this.state.idx];
    // let movie = "";
    return (
      <>
        {movie === "" ? (
          <div className="container">
            <div className="loader" />
            <h3>Loading...</h3>
          </div>
        ) : (
          <div className="banner-card">
            <img
              src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
              alt="..."
              className="banner-img"
            />
            <div className="title-cont">
              <h1 className="banner-title">{movie.original_title}</h1>
              <p className="banner-text">{movie.overview}</p>
            </div>
          </div>
        )}
      </>
    );
  }
}
