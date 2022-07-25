import React, { Component } from "react";
import "./Favourite.css";
import { movies } from "./getMovies";

export default class Favourite extends Component {
  constructor() {
    super();
    this.state = {
      genres: [],
      curGen: "All Genres",
    };
  }

  render() {
    const movie = movies.results;
    // console.log(moive);
    let genreids = {
      28: "Action",
      12: "Adventure",
      16: "Animation",
      35: "Comedy",
      80: "Crime",
      99: "Documentary",
      18: "Drama",
      10751: "Family",
      14: "Fantasy",
      36: "History",
      27: "Horror",
      10402: "Music",
      9648: "Mystery",
      10749: "Romance",
      878: "Sci-Fi",
      10770: "TV",
      53: "Thriller",
      10752: "War",
      37: "Western",
    };

    let temp = [];
    movie.forEach((movieObj) => {
      if (!temp.includes(genreids[movieObj.genre_ids[0]])) {
        temp.push(genreids[movieObj.genre_ids[0]]);
      }
    });

    temp.unshift("All Genres");

    console.log(temp);
    return (
      <>
        <div className="main">
          <div className="row">
            <div className="col-3">
              <ul className="list-group fav-cont">
                {temp.map((genre) =>
                  this.state.curGen === genre ? (
                    <li
                      className="list-group-item"
                      style={{
                        backgroundColor: "#fff",
                        color: "#181236",
                        fontWeight: "bold",
                      }}
                    >
                      {genre}
                    </li>
                  ) : (
                    <li
                      className="list-group-item"
                      style={{
                        backgroundColor: "#181236",
                        color: "#fff",
                        fontWeight: "bold",
                      }}
                    >
                      {genre}
                    </li>
                  )
                )}
              </ul>
            </div>
            <div className="col-8 fav-table">
              <div className="row input-cont">
                <input
                  type="text"
                  className="input-group-text col-5"
                  placeholder="Search movies"
                />
                <input type="number" className="input-group-text col-5" placeholder="Rows Count"/>
              </div>

              <div className="row table-cont">
                <table className="table table-bordered">
                  <thead>
                    <tr>
                      <th scope="col">Title</th>
                      <th scope="col">Genre</th>
                      <th scope="col">Popularity</th>
                      <th scope="col">Rating</th>
                      <th scope="col"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {movie.map((movieObj) => (
                      <tr>
                        <td className="fav-img-cont">
                          <img
                            src={`https://image.tmdb.org/t/p/original${movieObj.backdrop_path}`}
                            alt="..."
                            className="fav-img"
                          />
                          {movieObj.original_title}
                        </td>
                        <td>{genreids[movieObj.genre_ids[0]]}</td>
                        <td>{movieObj.popularity}</td>
                        <td>{movieObj.vote_average}</td>
                        <td>
                          <button type="button" class="btn btn-danger btn-sm">
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <nav aria-label="Page navigation example">
                <ul className="pagination">
                  <li className="page-item">
                    <a className="page-link" href="#">
                      Previous
                    </a>
                  </li>
                  <li className="page-item">
                    <a className="page-link" href="#">
                      1
                    </a>
                  </li>
                  <li className="page-item">
                    <a className="page-link" href="#">
                      2
                    </a>
                  </li>
                  <li className="page-item">
                    <a className="page-link" href="#">
                      3
                    </a>
                  </li>
                  <li className="page-item">
                    <a className="page-link" href="#">
                      Next
                    </a>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </>
    );
  }
}
