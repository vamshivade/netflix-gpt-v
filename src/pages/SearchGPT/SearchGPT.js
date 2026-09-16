import { useEffect, useState } from "react";
import "./SearchGPT.css";
import { useSelector } from "react-redux";
import useFetchMovieByTitle from "../../hooks/useFetchMoviesByTitle";
import MovieCard from "../../components/movie/MovieCard";
import { useDispatch } from "react-redux";
import { resetSearch } from "../../redux/searchGptSlice";

const SearchGPT = () => {
  const [inputContents, setInputContents] = useState("");
  const dispatch = useDispatch();
  const { isGptLoading, searchResults, errorMessage } = useSelector(
    (store) => store.searchGpt,
  );

  const fetchMovie = useFetchMovieByTitle();

  useEffect(() => {
    return () => dispatch(resetSearch());
  }, [dispatch]);

  const handleSearch = () => {
    fetchMovie(inputContents);
  };

  const handleReset = () => {
    setInputContents("");
    dispatch(resetSearch());
  };

  return (
    <div className="searchgpt-container">
      <div className="search-intro">
        <p className="search-kicker">NetflixGPT discovery</p>
        <h1>Find your next movie.</h1>
        <p className="search-description">
          Search by title and explore movies worth adding to your watchlist.
        </p>
      </div>

      <form
        className="search-box"
        onSubmit={(event) => {
          event.preventDefault();
          handleSearch();
        }}
      >
        <input
          type="text"
          aria-label="Movie title"
          placeholder="Search by movie title"
          value={inputContents}
          onChange={(event) => setInputContents(event.target.value)}
        />
        <button type="button" onClick={handleSearch} disabled={isGptLoading}>
          {isGptLoading ? "Loading..." : "Search"}
        </button>
        <button type="button" onClick={handleReset} disabled={isGptLoading}>
          Reset
        </button>
      </form>

      {errorMessage && (
        <div className="search-error" role="alert">
          {errorMessage}
        </div>
      )}

      <div className="search-results">
        {isGptLoading ? (
          <div className="search-state">
            <span className="search-spinner" aria-hidden="true" />
            <h2>Searching the library...</h2>
          </div>
        ) : !searchResults.length ? (
          <div className="search-state">
            <span className="search-state-icon" aria-hidden="true">
              +
            </span>
            <h2>Search to find movies</h2>
            <p>Try a title like Dune, Inception, or The Matrix.</p>
          </div>
        ) : (
          searchResults.map((result) => (
            <MovieCard key={result?.id} movieResult={result} />
          ))
        )}
      </div>
    </div>
  );
};

export default SearchGPT;
