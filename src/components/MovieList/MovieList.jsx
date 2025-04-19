import { Link, useLocation } from 'react-router-dom';
import { IMG_BASE_URL } from '../../services/api';
import styles from './MovieList.module.css';

const MovieList = ({ movies }) => {
  const location = useLocation();

  return (
    <ul className={styles.movieList}>
      {movies.map((movie, index) => (
        <li 
          key={movie.id} 
          className={`${styles.movieItem} animate-fadeIn`}
          style={{ animationDelay: `${index * 0.1}s` }}
        >
          <Link 
            to={`/movies/${movie.id}`}
            state={{ from: location }}
            className={styles.movieLink}
          >
            <div className={styles.imageWrapper}>
              <img
                src={movie.poster_path 
                  ? `${IMG_BASE_URL}${movie.poster_path}`
                  : 'https://via.placeholder.com/200x300?text=No+Image'
                }
                alt={movie.title}
                className={styles.moviePoster}
              />
              {movie.vote_average > 0 && (
                <div className={styles.rating}>
                  {Math.round(movie.vote_average * 10)}%
                </div>
              )}
            </div>
            <div className={styles.movieInfo}>
              <h3 className={styles.movieTitle}>{movie.title}</h3>
              <div className={styles.movieMeta}>
                {movie.release_date && (
                  <span className={styles.movieYear}>
                    {new Date(movie.release_date).getFullYear()}
                  </span>
                )}
              </div>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default MovieList;