// src/pages/HomePage.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { HeroBanner } from '../components/HeroBanner/HeroBanner';
import styles from './HomePage.module.css';
import { FaUserCircle, FaBook, FaListAlt } from 'react-icons/fa';

export const HomePage: React.FC = () => (
  <main>
    <HeroBanner />

    <section className={styles.featuresSection}>
      <div className="container">
        <h2 className={styles.sectionTitle}>Nasıl Çalışır?</h2>
        <div className={styles.cards}>
          <div className={styles.card}>
            <FaUserCircle size={36} color="#6c5ce7" />
            <h3>Profilini Düzenle</h3>
            <p>Kişisel bilgilerini gir, fotoğraf yükle.</p>
          </div>
          <div className={styles.card}>
            <FaBook size={36} color="#6c5ce7" />
            <h3>Eğitim & Deneyim</h3>
            <p>Okul ve iş geçmişini ekle, detaylandır.</p>
          </div>
          <div className={styles.card}>
            <FaListAlt size={36} color="#6c5ce7" />
            <h3>Şablon Seç</h3>
            <p>Farklı tasarımlar arasından favorini seç.</p>
          </div>
        </div>
        <Link to="/templates" className={styles.ctaButton}>
          Templateleri Gör →  
        </Link>
      </div>
    </section>
  </main>
);
