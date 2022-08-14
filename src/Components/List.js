import React, { Component } from "react";
import "./List.css";
// import { movies } from "./getMovies";
import API_KEY from "../secretKey";
import axios from "axios";

export default class List extends Component {
  constructor() {
    super();
    this.state = {
      hover: "",
      parr: [1],
      currentPage: 1,
      movies: [],
      favourites: [],
    };
  }

  changeMoives = async () => {
    let response = await axios.get(
      `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=${this.state.currentPage}`
    );

    let data = response.data;
    this.setState({
      movies: [...data.results],
    });
  };

  // Here set State is Async function

  handleRightBtn = () => {
    let tempArr = [];

    for (let i = 1; i <= this.state.parr.length + 1; i++) {
      tempArr.push(i);
    }

    this.setState(
      {
        parr: [...tempArr],
        currentPage: this.state.currentPage + 1,
      },
      this.changeMoives
    );
  };

  handlePrevBtn = () => {
    if (this.state.currentPage !== 1) {
      let tempArr = [];

      for (let i = 1; i <= this.state.parr.length - 1; i++) {
        tempArr.push(i);
      }

      this.setState(
        {
          parr: [...tempArr],
          currentPage: this.state.currentPage - 1,
        },
        this.changeMoives
      );
    }
  };

  handleCurrentpage = (pagenum) => {
    if (pagenum !== this.state.currentPage) {
      this.setState(
        {
          currentPage: pagenum,
        },
        this.changeMoives
      );
    }
  };

  handleFavourites = (movie) => {
    let localStorageMovies =
      JSON.parse(localStorage.getItem("MyFavMoives")) || [];
    if (this.state.favourites.includes(movie.id)) {
      localStorageMovies = localStorageMovies.filter((m) => m.id !== movie.id);
    } else {
      localStorageMovies.push(movie);
    }

    localStorage.setItem("MyFavMoives", JSON.stringify(localStorageMovies));
    // console.log(localStorageMovies);
    let temp = localStorageMovies.map((movie) => movie.id);
    this.setState({
      favourites: [...temp],
    });
  };

  async componentDidMount() {
    let response = await axios.get(
      `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=${this.state.currentPage}`
    );

    let data = response.data;
    this.setState({
      movies: [...data.results],
    });
  }

  render() {
    // let movie = movies.results;
    // let movie = "";

    return (
      <>
        {/* if no movies found */}
        {this.state.movies.length === 0 ? (
          <div className="container">
            <div className="loader" />
            <h3>Loading...</h3>
          </div>
        ) : (
          // if movie found...
          <div className="main-list-cont">
            <h2>-- Trending --</h2>
            <div className="list-cont">
              {this.state.movies.map((movieObj) => (
                <div
                  className="Item"
                  onMouseEnter={() => this.setState({ hover: movieObj.id })}
                  onMouseLeave={() => this.setState({ hover: "" })}
                >
                  <img
                    src={`https://image.tmdb.org/t/p/original${movieObj.backdrop_path}`}
                    alt="..."
                    className="banner-img"
                  />
                  <div className="Item-title-cont">
                    <p className="banner-title">{movieObj.original_title}</p>
                  </div>

                  {this.state.hover === movieObj.id && (
                    <div
                      className="add-btn"
                      onClick={() => this.handleFavourites(movieObj)}
                    >
                      <a>
                        {this.state.favourites.includes(movieObj.id)
                          ? "Remove from fav"
                          : "Add to fav"}
                      </a>
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="page-cont">
              <nav aria-label="Page navigation example">
                <ul className="pagination">
                  <li className="page-item prevBtn">
                    <a className="page-link" onClick={this.handlePrevBtn}>
                      Previous
                    </a>
                  </li>

                  {this.state.parr.map((pagenum) => (
                    <li className="page-item curPage">
                      <a
                        className="page-link"
                        onClick={() => {
                          this.handleCurrentpage(pagenum);
                        }}
                      >
                        {pagenum}
                      </a>
                    </li>
                  ))}

                  <li className="page-item nextBtn">
                    <a className="page-link" onClick={this.handleRightBtn}>
                      Next
                    </a>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        )}
      </>
    );
  }
}
