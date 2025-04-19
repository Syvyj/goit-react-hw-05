import { Link } from 'react-router-dom';
import styles from './NotFoundPage.module.css';

const NotFoundPage = () => {
  return (
    <div className={styles.container}>
      <div className={`${styles.content} animate-scaleIn`}>
        <h1 className={styles.title}>404</h1>
        <p className={styles.subtitle}>Page Not Found</p>
        <p className={styles.text}>
          Oops! The page you are looking for might have been removed or is temporarily unavailable.
        </p>
        <Link to="/" className={styles.button}>
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;