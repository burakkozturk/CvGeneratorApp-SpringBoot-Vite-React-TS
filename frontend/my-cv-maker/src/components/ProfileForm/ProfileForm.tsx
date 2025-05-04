import React, { useState } from 'react';
import axios from '../../api/axios';
import styles from './ProfileForm.module.css';

interface ProfileFormProps {
  token: string;
}

const ProfileForm: React.FC<ProfileFormProps> = ({ token }) => {
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    birthDate: '',
    photoUrl: '',
    summary: '',
  });
  
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // API endpoint'lerini proxy ile kullanacak şekilde güncelleme
  const API_URL = '/api'; // Vite proxy ile /api yolunu cvcim.xyz'ye yönlendireceğiz
  
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    setIsLoading(true);
    setErrorMessage('');
    const formData = new FormData();
    formData.append("file", file);
    
    try {
      // Dosya yükleme için yeni endpoint
      const res = await axios.post('/files/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      });
      
      const imageUrl = res.data.url;
      setForm(prev => ({ ...prev, photoUrl: imageUrl }));
      setSuccessMessage("Fotoğraf başarıyla yüklendi!");
      
      // 3 saniye sonra mesajı temizle
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (err) {
      console.error("Fotoğraf yükleme hatası:", err);
      setErrorMessage("Fotoğraf yüklenemedi. CORS hatası oluşabilir.");
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
      // Profil güncellemesi için yeni endpoint
      await axios.post('/profile', form, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      
      setSuccessMessage("Profil bilgileriniz başarıyla kaydedildi!");
      
      // 3 saniye sonra mesajı temizle
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (err) {
      console.error("Profil kaydetme hatası:", err);
      setErrorMessage("Profil kaydedilemedi. CORS hatası oluşabilir.");
    } finally {
      setIsLoading(false);
    }
  };

  // Hata durumunda görünecek bileşen
  const ErrorMessage = () => {
    if (!errorMessage) return null;
    
    return (
      <div className={styles.errorMessage}>
        <p>{errorMessage}</p>
        <p className={styles.errorTip}>
          <strong>Önerilen Çözümler:</strong>
          <ul>
            <li>Vite proxy yapılandırması ekleyin (vite.config.js dosyasında)</li>
            <li>API sunucunuz CORS başlıklarını doğru ayarlamalıdır</li>
            <li>Yerel geliştirme için CORS proxy kullanabilirsiniz</li>
          </ul>
        </p>
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
              Fotoğraf Seç
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
            <label>Yüklenen Fotoğraf</label>
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
        {isLoading ? 'İşleniyor...' : 'Profili Kaydet'}
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