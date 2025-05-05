import React, { useState, useEffect } from 'react';
import axios from '../../api/axios';
import styles from './ProfileForm.module.css';
import { FiSave, FiUser, FiUpload } from 'react-icons/fi';

interface ProfileFormProps {
  token: string;
  existingProfile?: ProfileData;
  onSuccess?: () => void;
}

interface ProfileData {
  firstName: string;
  lastName: string;
  birthDate: string;
  photoUrl: string;
  summary: string;
}

const ProfileForm: React.FC<ProfileFormProps> = ({ token, existingProfile, onSuccess }) => {
  const [form, setForm] = useState<ProfileData>({
    firstName: '',
    lastName: '',
    birthDate: '',
    photoUrl: '',
    summary: '',
  });
  
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [fileSelected, setFileSelected] = useState(false);

  // Load existing profile data if available
  useEffect(() => {
    if (existingProfile) {
      setForm(existingProfile);
    }
  }, [existingProfile]);

  // API endpoint
  const API_URL = '/api';
  
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    setIsLoading(true);
    setErrorMessage('');
    setFileSelected(true);
    const formData = new FormData();
    formData.append("file", file);
    
    try {
      const res = await axios.post('/files/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      });
      
      const imageUrl = res.data.url;
      setForm(prev => ({ ...prev, photoUrl: imageUrl }));
      setSuccessMessage("Fotoğraf başarıyla yüklendi!");
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (err) {
      console.error("Fotoğraf yükleme hatası:", err);
      setErrorMessage("Fotoğraf yüklenemedi. Lütfen tekrar deneyin.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage('');
    
    try {
      await axios.post('/profile', form, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      
      setSuccessMessage("Profil bilgileriniz başarıyla kaydedildi!");
      
      if (onSuccess) {
        setTimeout(() => {
          onSuccess();
        }, 2000);
      } else {
        setTimeout(() => setSuccessMessage(''), 3000);
      }
    } catch (err) {
      console.error("Profil kaydetme hatası:", err);
      setErrorMessage("Profil kaydedilemedi. Lütfen daha sonra tekrar deneyin.");
    } finally {
      setIsLoading(false);
    }
  };

  const ErrorMessage = () => {
    if (!errorMessage) return null;
    
    return (
      <div className={styles.errorMessage}>
        <p>{errorMessage}</p>
      </div>
    );
  };

  return (
    <form className={styles.formContainer} onSubmit={handleSubmit}>
      <h2 className={styles.pageTitle}>Profil Bilgileriniz</h2>
      
      <div className={styles.formGrid}>
        <div className={styles.formGroup}>
          <label htmlFor="firstName">Ad</label>
          <input 
            id="firstName" 
            name="firstName" 
            value={form.firstName} 
            onChange={handleChange} 
            placeholder="Adınız"
            required 
          />
        </div>
        
        <div className={styles.formGroup}>
          <label htmlFor="lastName">Soyad</label>
          <input 
            id="lastName" 
            name="lastName" 
            value={form.lastName} 
            onChange={handleChange} 
            placeholder="Soyadınız"
            required 
          />
        </div>
        
        <div className={styles.formGroup}>
          <label htmlFor="birthDate">Doğum Tarihi</label>
          <input 
            id="birthDate" 
            name="birthDate" 
            type="date" 
            value={form.birthDate} 
            onChange={handleChange} 
            required 
          />
        </div>
        
        <div className={styles.formGroup + ' ' + styles.fullWidth}>
          <div className={styles.fileInputContainer}>
            <label htmlFor="photo" className={styles.photoLabel}>Profil Fotoğrafı</label>
            <label className={styles.customFileInput}>
              <FiUpload size={18} />
              {fileSelected ? "Fotoğraf Seçildi" : "Fotoğraf Seç"}
              <input 
                id="photo" 
                type="file" 
                accept="image/*" 
                onChange={handleFileChange}
                className={styles.fileInputHidden}
              />
            </label>
          </div>
        </div>

        {form.photoUrl && (
          <div className={styles.photoPreviewContainer + ' ' + styles.fullWidth}>
            <img 
              src={form.photoUrl} 
              alt="Profil" 
              className={styles.photoPreview}
            />
          </div>
        )}
        
        <div className={styles.formGroup + ' ' + styles.fullWidth}>
          <label htmlFor="summary">Hakkımda</label>
          <textarea 
            id="summary" 
            name="summary" 
            rows={5} 
            value={form.summary} 
            onChange={handleChange}
            placeholder="Kendinizi kısaca tanıtın..."
          ></textarea>
        </div>
      </div>
      
      <button 
        type="submit" 
        className={styles.submitButton} 
        disabled={isLoading}
      >
        {isLoading ? (
          <>İşleniyor...</>
        ) : (
          <>
            <FiSave size={18} />
            Profili Kaydet
          </>
        )}
      </button>
      
      {successMessage && (
        <div className={styles.successMessage}>
          {successMessage}
        </div>
      )}
      
      <ErrorMessage />
    </form>
  );
};

export default ProfileForm;