// src/components/ProfileForm/SocialLinksForm.tsx

import React, { useEffect, useState } from 'react';
import axios from '../../api/axios';
import styles from './SocialLinkForm.module.css';
import { FiTrash2, FiLink } from 'react-icons/fi';

interface SocialLink {
  id: string;
  platform: string;
  url: string;
}

interface SocialLinksFormProps {
  token: string;
}

const SocialLinksForm: React.FC<SocialLinksFormProps> = ({ token }) => {
  const [form, setForm] = useState({ platform: '', url: '' });
  const [links, setLinks] = useState<SocialLink[]>([]);
  const [error, setError] = useState('');

  const fetchLinks = async () => {
    try {
      const res = await axios.get<SocialLink[]>('/social-links', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setLinks(res.data);
    } catch (err) {
      console.error('Sosyal linkler alınamadı:', err);
    }
  };

  useEffect(() => {
    fetchLinks();
  }, [token]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      const res = await axios.post<SocialLink>('/social-links', form, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setLinks(prev => [...prev, res.data]);
      setForm({ platform: '', url: '' });
    } catch {
      setError('Ekleme başarısız. Lütfen tekrar deneyin.');
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`/social-links/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setLinks(prev => prev.filter(l => l.id !== id));
    } catch {
      setError('Silme işlemi başarısız.');
    }
  };

  return (
    <div className={styles.wrapper}>
      <h3 className={styles.title}>Yeni Sosyal Link Ekle</h3>
      {error && <p className={styles.error}>{error}</p>}
      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          name="platform"
          value={form.platform}
          onChange={handleChange}
          placeholder="Platform (örn. LinkedIn)"
          required
        />
        <input
          name="url"
          value={form.url}
          onChange={handleChange}
          placeholder="https://..."
          type="url"
          required
        />
        <button type="submit">Ekle</button>
      </form>

      <div className={styles.list}>
        {links.map(link => (
          <div key={link.id} className={styles.card}>
            <div className={styles.cardHeader}>
              <FiLink className={styles.icon} />
              <div>
                <h4 className={styles.platform}>{link.platform}</h4>
                <a
                  href={link.url}
                  className={styles.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {link.url}
                </a>
              </div>
            </div>
            <button
              onClick={() => handleDelete(link.id)}
              className={styles.deleteBtn}
              title="Sil"
            >
              <FiTrash2 />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SocialLinksForm;
