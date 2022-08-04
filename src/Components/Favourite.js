import React, { Component } from "react";
import "./Favourite.css";
import { movies } from "./getMovies";

export default class Favourite extends Component {
  constructor() {
    super();
    this.state = {
      genres: [],
      curGen: "All Genres",
      movies: [],
      currSearchText: "",
      limit: 5,
      currentPage: 1,
    };
  }

  componentDidMount() {
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
    let data = JSON.parse(localStorage.getItem("MyFavMoives") || "[]");

    let temp = [];
    data.forEach((movieObj) => {
      if (!temp.includes(genreids[movieObj.genre_ids[0]])) {
        temp.push(genreids[movieObj.genre_ids[0]]);
      }
    });

    temp.unshift("All Genres");
    this.setState({
      genres: [...temp],
      movies: [...data],
    });
  }

  handleChangeGenre = (genre) => {
    this.setState({
      curGen: genre,
    });
  };

  sortPopularityDes = () => {
    let temp = this.state.movies;

    temp.sort(function (ObjA, ObjB) {
      return ObjB.popularity - ObjA.popularity;
    });

    this.setState({
      movies: [...temp],
    });
  };

  sortPopularityAes = () => {
    let temp = this.state.movies;

    temp.sort(function (ObjA, ObjB) {
      return ObjA.popularity - ObjB.popularity;
    });

    this.setState({
      movies: [...temp],
    });
  };

  sortRatingDes = () => {
    let temp = this.state.movies;

    temp.sort(function (ObjA, ObjB) {
      return ObjB.vote_average - ObjA.vote_average;
    });

    this.setState({
      movies: [...temp],
    });
  };

  sortRatingAes = () => {
    let temp = this.state.movies;

    temp.sort(function (ObjA, ObjB) {
      return ObjA.vote_average - ObjB.vote_average;
    });

    this.setState({
      movies: [...temp],
    });
  };

  handlePageNum = (page) => {
    this.setState({
      currentPage: page,
    });
  };

  render() {
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

    let filterArr = [];
    if (this.state.currSearchText === "") {
      filterArr = this.state.movies;
    } else {
      filterArr = this.state.movies.filter((movieObj) => {
        let title = movieObj.original_title.toLowerCase();
        return title.includes(this.state.currSearchText.toLocaleLowerCase());
      });
    }

    if (this.state.curGen !== "All Genres") {
      filterArr = this.state.movies.filter(
        (movieObj) => genreids[movieObj.genre_ids[0]] == this.state.curGen
      );
    }

    let numOfPages = Math.ceil(filterArr.length / this.state.limit);
    let pagesArr = [];
    for (let i = 1; i <= numOfPages; i++) {
      pagesArr.push(i); //[1,2]
    }
    let si = (this.state.currentPage - 1) * this.state.limit;
    let ei = si + this.state.limit - 1;
    filterArr = filterArr.slice(si, ei + 1);

    return (
      <>
        <div className="main">
          <div className="row">
            <div className="col-3">
              <ul className="list-group fav-cont">
                {this.state.genres.map((genre) =>
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
                      }}
                      onClick={() => this.handleChangeGenre(genre)}
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
                  value={this.state.currSearchText}
                  onChange={(e) =>
                    this.setState({ currSearchText: e.target.value })
                  }
                />
                <input
                  type="number"
                  className="input-group-text col-5"
                  placeholder="Rows Count"
                  value={this.state.limit}
                  onChange={(e) => this.setState({ limit: e.target.value})}
                />
              </div>

              <div className="row table-cont">
                <table className="table table-bordered">
                  <thead>
                    <tr>
                      <th scope="col">Title</th>
                      <th scope="col">Genre</th>
                      <th scope="col">
                        <i
                          class="fa-solid fa-sort-up"
                          onClick={this.sortPopularityDes}
                        />
                        Popularity
                        <i
                          class="fa-solid fa-sort-down"
                          onClick={this.sortPopularityAes}
                        />
                      </th>
                      <th scope="col">
                        <i
                          class="fa-solid fa-sort-up"
                          onClick={this.sortRatingDes}
                        />
                        Rating
                        <i
                          class="fa-solid fa-sort-down"
                          onClick={this.sortRatingAes}
                        />
                      </th>
                      <th scope="col"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {filterArr.map((movieObj) => (
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
                  {pagesArr.map((page) => (
                    <li class="page-item">
                      <a
                        class="page-link"
                        onClick={() => this.handlePageNum(page)}
                      >
                        {page}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </>
    );
  }
}
