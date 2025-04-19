import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getMovieReviews } from '../../services/api';
import styles from './MovieReviews.module.css';

const MovieReviews = () => {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const reviewsData = await getMovieReviews(movieId);
        setReviews(reviewsData);
      } catch (error) {
        setError('Failed to fetch reviews');
        console.error(error);
      }
    };

    fetchReviews();
  }, [movieId]);

  if (error) return <div className={styles.error}>{error}</div>;
  if (reviews.length === 0) return <div className={styles.message}>No reviews available.</div>;

  return (
    <ul className={styles.reviewsList}>
      {reviews.map(review => (
        <li key={review.id} className={styles.reviewItem}>
          <h3 className={styles.author}>Author: {review.author}</h3>
          <p className={styles.content}>{review.content}</p>
        </li>
      ))}
    </ul>
  );
};

export default MovieReviews;