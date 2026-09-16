import { useEffect, useRef } from "react";
import { getSearchMovie } from "../api/moviesApi";
import { useDispatch } from "react-redux";
import {
  searchFailed,
  searchStarted,
  searchSucceeded,
} from "../redux/searchGptSlice";

const useFetchMovieByTitle = () => {
  const dispatch = useDispatch();
  const controllerRef = useRef(null);

  const fetchMovie = async (inputContents) => {
    const query = inputContents.trim();

    if (!query) {
      dispatch(searchFailed("Please enter a movie name."));
      return;
    }

    controllerRef.current?.abort();
    const controller = new AbortController();
    controllerRef.current = controller;

    try {
      dispatch(searchStarted());
      const response = await getSearchMovie({ query }, controller.signal);

      if (!controller.signal.aborted) {
        dispatch(searchSucceeded(response?.results));
      }
    } catch (error) {
      if (error.name !== "AbortError") {
        dispatch(searchFailed(error.message));
      }
    }
  };

  useEffect(() => {
    return () => controllerRef.current?.abort();
  }, []);

  return fetchMovie;
};

export default useFetchMovieByTitle;
