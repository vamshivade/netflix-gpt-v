import { IMAGE_URL } from "../../utils/constants";

const MovieCard = ({ movieResult }) => {
  const imagePath = movieResult?.poster_path || movieResult?.backdrop_path;

  if (!imagePath) return null;

  return (
    <>
      <div className="movie-card">
        <img
          src={IMAGE_URL + imagePath}
          alt={movieResult?.original_title || movieResult?.title || "Movie"}
        />
      </div>
    </>
  );
};

export default MovieCard;
