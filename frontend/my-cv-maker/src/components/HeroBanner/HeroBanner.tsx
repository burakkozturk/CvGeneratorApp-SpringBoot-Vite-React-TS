import { Link } from 'react-router-dom';
import styles from './HeroBanner.module.css';

export const HeroBanner: React.FC = () => (
  <section className={styles.hero}>
    <div className={styles.overlay} />
    <div className={`container ${styles.content}`}>
      <h1 className={styles.title}>Kendi Profesyonel CV'ni Oluştur</h1>
      <p className={styles.subtitle}>
        Adım adım bilgilerini gir, şablonunu seç ve kısa sürede şık bir CV’ye kavuş.
      </p>
      <Link to="/templates" className={styles.ctaButton}>
        Şimdi Başla
      </Link>
    </div>
  </section>
);
