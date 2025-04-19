import { useState, useEffect, Suspense } from 'react';
import { useParams, useLocation, Link, Outlet } from 'react-router-dom';
import { getMovieDetails } from '../../services/api';
import { IMG_BASE_URL } from '../../services/api';
import styles from './MovieDetailsPage.module.css';

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const location = useLocation();
  const [movie, setMovie] = useState(null);
  const [error, setError] = useState(null);
  const backLinkHref = location.state?.from ?? '/movies';

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const movieData = await getMovieDetails(movieId);
        setMovie(movieData);
      } catch (error) {
        setError('Failed to fetch movie details');
        console.error(error);
      }
    };

    fetchMovieDetails();
  }, [movieId]);

  if (error) return <div className={styles.error}>{error}</div>;
  if (!movie) return <div className={styles.loading}>Loading...</div>;

  const { title, poster_path, vote_average, overview, genres, release_date } = movie;

  return (
    <div className={styles.container}>
      <Link to={backLinkHref} className={styles.backLink}>
        ← Go back
      </Link>
      
      <div className={styles.movieInfo}>
        <img
          src={poster_path ? `${IMG_BASE_URL}${poster_path}` : 'https://via.placeholder.com/300x450'}
          alt={title}
          className={styles.poster}
        />
        
        <div className={styles.details}>
          <h1>{title} ({release_date?.split('-')[0]})</h1>
          <div className={styles.score}>User Score: {Math.round(vote_average * 10)}%</div>
          
          <h2>Overview</h2>
          <p className={styles.overview}>{overview}</p>
          
          <h2>Genres</h2>
          <div className={styles.genres}>
            {genres?.map(genre => (
              <span key={genre.id} className={styles.genre}>
                {genre.name}
              </span>
            ))}
          </div>

          <div className={styles.additionalInfo}>
            <h3>Additional information</h3>
            <ul>
              <li>
                <Link to="cast" state={{ from: backLinkHref }}>Cast</Link>
              </li>
              <li>
                <Link to="reviews" state={{ from: backLinkHref }}>Reviews</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <Suspense fallback={<div className={styles.loading}>Loading...</div>}>
        <Outlet />
      </Suspense>
    </div>
  );
};

export default MovieDetailsPage;