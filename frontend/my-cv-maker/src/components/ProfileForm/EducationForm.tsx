import React, { useEffect, useState } from 'react';
import axios from '../../api/axios';
import styles from './EducationForm.module.css';
import { FiTrash2, FiBook } from 'react-icons/fi';

interface EducationFormProps {
  token: string;
}

interface Education {
  id: string;
  school: string;
  degree: string;
  startDate: string;
  endDate: string;
  description: string;
}

const EducationForm: React.FC<EducationFormProps> = ({ token }) => {
  const [form, setForm] = useState({
    school: '',
    degree: '',
    startDate: '',
    endDate: '',
    description: ''
  });
  const [educations, setEducations] = useState<Education[]>([]);
  const [message, setMessage] = useState('');

  // Türkçe kısa tarih formatı (örn. "5 Haz 2020")
  const formatDateTr = (dateString: string) => {
    if (!dateString) return '';
    const d = new Date(dateString);
    return d.toLocaleDateString('tr-TR', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  const fetchEducations = async () => {
    try {
      const res = await axios.get('/educations', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setEducations(res.data);
    } catch (err) {
      console.error('Eğitim listesi alınamadı:', err);
    }
  };

  useEffect(() => {
    fetchEducations();
  }, [token]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post('/educations', form, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setMessage('Eğitim başarıyla eklendi!');
      setForm({
        school: '',
        degree: '',
        startDate: '',
        endDate: '',
        description: ''
      });
      fetchEducations();
      setTimeout(() => setMessage(''), 3000);
    } catch (err) {
      console.error(err);
      setMessage('Hata oluştu.');
      setTimeout(() => setMessage(''), 3000);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`/educations/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchEducations();
    } catch (err) {
      console.error('Silme hatası:', err);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className={styles.formContainer}>
        <h3 className={styles.formTitle}>Yeni Eğitim Ekle</h3>
        <input
          name="school"
          placeholder="Okul"
          value={form.school}
          onChange={handleChange}
          className={styles.input}
          required
        />
        <input
          name="degree"
          placeholder="Bölüm / Derece"
          value={form.degree}
          onChange={handleChange}
          className={styles.input}
          required
        />
        <input
          name="startDate"
          type="date"
          value={form.startDate}
          onChange={handleChange}
          className={styles.input}
          required
        />
        <input
          name="endDate"
          type="date"
          value={form.endDate}
          onChange={handleChange}
          className={styles.input}
        />
        <textarea
          name="description"
          placeholder="Açıklama"
          value={form.description}
          onChange={handleChange}
          className={styles.textarea}
        />
        <button type="submit" className={styles.submitButton}>
          Kaydet
        </button>
        {message && <p className={styles.feedback}>{message}</p>}
      </form>

      <div className={styles.list}>
        {educations.map(edu => (
          <div key={edu.id} className={styles.card}>
            <div className={styles.cardHeader}>
              <FiBook className={styles.icon} />
              <div>
                <h4 className={styles.school}>{edu.school}</h4>
                <span className={styles.degree}>{edu.degree}</span>
              </div>
            </div>
            <div className={styles.cardBody}>
              <span className={styles.dates}>
                {formatDateTr(edu.startDate)} – {formatDateTr(edu.endDate)}
              </span>
              {edu.description && (
                <p className={styles.description}>{edu.description}</p>
              )}
            </div>
            <button
              onClick={() => handleDelete(edu.id)}
              className={styles.deleteBtn}
              title="Sil"
            >
              <FiTrash2 />
            </button>
          </div>
        ))}
      </div>
    </>
  );
};

export default EducationForm;
