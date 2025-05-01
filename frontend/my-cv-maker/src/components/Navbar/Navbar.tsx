import { Link } from 'react-router-dom';
import { FaListAlt, FaSignInAlt, FaUserPlus } from 'react-icons/fa';
import styles from './Navbar.module.css';

export const Navbar: React.FC = () => (
  <nav className={styles.navbar}>
    <div className="container" style={{display: 'flex', alignItems:'center', justifyContent:'space-between'}}>
      <Link to="/" className={styles.brand}>
        CVcim
      </Link>

      <div className={styles.navLinks}>
        <Link to="/templates" className={styles.navLink}>
          <FaListAlt /> Templateler
        </Link>
        <Link to="/login" className={styles.navButton}>
          <FaSignInAlt /> Giriş Yap
        </Link>
        <Link to="/register" className={styles.navButton}>
          <FaUserPlus /> Kayıt Ol
        </Link>
      </div>
    </div>
  </nav>
);
