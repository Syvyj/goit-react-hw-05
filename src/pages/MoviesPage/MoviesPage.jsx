import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { searchMovies } from '../../services/api';
import MovieList from '../../components/MovieList/MovieList';
import styles from './MoviesPage.module.css';

const MoviesPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const query = searchParams.get('query') ?? '';

  useEffect(() => {
    if (!query) return;

    const fetchMovies = async () => {
      try {
        const searchResults = await searchMovies(query);
        setMovies(searchResults);
        setError(null);
      } catch (error) {
        setError('Failed to fetch movies');
        console.error(error);
      }
    };

    fetchMovies();
  }, [query]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    const searchQuery = form.elements.query.value.trim();

    if (searchQuery === '') {
      return setError('Please enter a search query');
    }

    setSearchParams({ query: searchQuery });
    form.reset();
  };

  return (
    <div className={styles.container}>
      <form className={styles.searchForm} onSubmit={handleSubmit}>
        <input
          type="text"
          name="query"
          className={styles.searchInput}
          placeholder="Search movies..."
          defaultValue={query}
        />
        <button type="submit" className={styles.searchButton}>
          Search
        </button>
      </form>

      {error && <div className={styles.error}>{error}</div>}
      {movies.length > 0 && <MovieList movies={movies} />}
    </div>
  );
};

export default MoviesPage;