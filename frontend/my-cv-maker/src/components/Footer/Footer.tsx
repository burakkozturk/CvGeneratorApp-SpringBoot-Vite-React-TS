import { Link } from 'react-router-dom';
import styles from './Footer.module.css';

export const Footer: React.FC = () => (
  <footer className={styles.footer}>
    <div className={styles.links}>
      <Link to="/privacy" className={styles.link}>Gizlilik Politikası</Link>
    </div>
    <div>© 2024 CVcim. Tüm hakları saklıdır.</div>
  </footer>
);
