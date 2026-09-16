import { IMAGE_URL } from "../../utils/constants";

const MovieCard = ({ movieResult }) => {
  return (
    <>
      <div className="movie-card">
        <img
          src={
            IMAGE_URL + movieResult?.poster_path || movieResult?.backdrop_path
          }
          alt={movieResult?.original_title}
        />
      </div>
    </>
  );
};

export default MovieCard;
