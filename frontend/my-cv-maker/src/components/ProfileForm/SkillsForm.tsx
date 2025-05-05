// src/components/ProfileForm/SkillsForm.tsx

import React, { useEffect, useState } from 'react';
import axios from '../../api/axios';
import styles from './SkillsForm.module.css';
import { FiTrash2, FiCode } from 'react-icons/fi';

interface Skill {
  id: string;
  name: string;
  level: string;
}

interface SkillsFormProps {
  token: string;
}

const SkillsForm: React.FC<SkillsFormProps> = ({ token }) => {
  const [form, setForm] = useState({ name: '', level: 'Beginner' });
  const [skills, setSkills] = useState<Skill[]>([]);
  const [error, setError] = useState('');

  // Yetenekleri çek
  const fetchSkills = async () => {
    try {
      const res = await axios.get('/skills', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setSkills(res.data);
    } catch (err) {
      console.error('Yetenekler alınamadı:', err);
    }
  };

  useEffect(() => {
    fetchSkills();
  }, [token]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      const res = await axios.post('/skills', form, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setSkills(prev => [...prev, res.data]);
      setForm({ name: '', level: 'Beginner' });
    } catch {
      setError('Ekleme başarısız. Lütfen tekrar deneyin.');
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`/skills/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setSkills(prev => prev.filter(s => s.id !== id));
    } catch {
      setError('Silme işlemi başarısız.');
    }
  };

  return (
    <div className={styles.wrapper}>
      <h3 className={styles.title}>Yeni Yetenek Ekle</h3>
      {error && <p className={styles.error}>{error}</p>}
      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Yetenek Adı"
          required
        />
        <select
          name="level"
          value={form.level}
          onChange={handleChange}
        >
          <option value="Beginner">Başlangıç</option>
          <option value="Intermediate">Orta Seviye</option>
          <option value="Advanced">Uzmanlık</option>
        </select>
        <button type="submit">Ekle</button>
      </form>

      <div className={styles.list}>
        {skills.map(skill => (
          <div key={skill.id} className={styles.card}>
            <div className={styles.cardHeader}>
              <FiCode className={styles.icon} />
              <div>
                <h4 className={styles.name}>{skill.name}</h4>
                <span className={styles.level}>{skill.level}</span>
              </div>
            </div>
            <button
              onClick={() => handleDelete(skill.id)}
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

export default SkillsForm;
