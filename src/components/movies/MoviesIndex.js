import { Link } from "react-router-dom";
import { useState } from 'react';
import ErrorMessage from "../errors/ErrorMessage";
import { getAllMovies } from "../../api/fetch";
import { useEffect } from 'react';

import "./MoviesIndex.css";
import MovieListing from './MovieListing';

export default function MoviesIndex() {
  const [loadingError, setLoadingError] = useState(false);
  const [movies, setMovies] = useState([]);
  const [allMovies, setAllMovies] = useState([]);
  const [searchTitle, setSearchTitle] = useState("")

  useEffect(() => {
    getAllMovies().then((response) => {
      setMovies(response)
      setAllMovies(response)
      setLoadingError(false)
    }).catch((error) => {
      setLoadingError(true)
    })
  }
    , []);

  function handleTextChange(event) {
    const title = event.target.value;
    // setSearchTitle(title);
    // console.log(title);
    const result = title.length ? filterMovies(title, allMovies) : allMovies
    setSearchTitle(title)
    setMovies(result)
  }

  function filterMovies(search, movies) {
    return movies.filter((movie) => {
      return movie.title.toLowerCase().match(search.toLowerCase())
    })

  }

  return (
    <div>
      {loadingError ? (
        <ErrorMessage />
      ) : (
        <section className="movies-index-wrapper">
          <h2>All Movies</h2>
          <button>
            <Link to="/movies/new">Add a new movie</Link>
          </button>
          <br />
          <label htmlFor="searchTitle">
            Search Movies:
            <input
              type="text"
              value={searchTitle}
              id="searchTitle"
              onChange={handleTextChange}
            />
          </label>
          <section className="movies-index">
            {movies.map((movie) => {
              return <MovieListing movie={movie} key={movie.id} />
            })}
            {/* <!-- MovieListing components --> */}
          </section>
        </section>
      )}
    </div>
  );
}

