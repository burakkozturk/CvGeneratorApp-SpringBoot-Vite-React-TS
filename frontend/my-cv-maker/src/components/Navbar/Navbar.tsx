import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './Navbar.module.css';

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>
        <Link to="/">CvMaker</Link>
      </div>
      <div className={styles.navLinks}>
        {token ? (
          <>
            <Link to="/templates" className={styles.link}>Şablonlar</Link>
            <Link to="/profile" className={styles.link}>Profil</Link>
            <button onClick={handleLogout} className={styles.link}>Çıkış</button>
          </>
        ) : (
          <>
            <Link to="/login" className={styles.link}>Giriş Yap</Link>
            <Link to="/register" className={styles.link}>Kayıt Ol</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
