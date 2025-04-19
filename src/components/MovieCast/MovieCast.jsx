import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getMovieCredits, IMG_BASE_URL } from '../../services/api';
import styles from './MovieCast.module.css';

const MovieCast = () => {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCast = async () => {
      try {
        const castData = await getMovieCredits(movieId);
        setCast(castData);
      } catch (error) {
        setError('Failed to fetch cast information');
        console.error(error);
      }
    };

    fetchCast();
  }, [movieId]);

  if (error) return <div className={styles.error}>{error}</div>;
  if (cast.length === 0) return <div className={styles.message}>No cast information available.</div>;

  return (
    <ul className={styles.castList}>
      {cast.map(actor => (
        <li key={actor.id} className={styles.castItem}>
          <img
            src={actor.profile_path 
              ? `${IMG_BASE_URL}${actor.profile_path}`
              : 'https://via.placeholder.com/200x300?text=No+Image'
            }
            alt={actor.name}
            className={styles.actorImage}
          />
          <div className={styles.actorInfo}>
            <p className={styles.actorName}>{actor.name}</p>
            <p className={styles.character}>Character: {actor.character}</p>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default MovieCast;