import React, { useEffect, useState } from 'react';
import ProfileForm from '../components/ProfileForm/ProfileForm';
import ProfileView from '../components/ProfileForm/ProfileView';
import RightSidebar from '../components/ProfileForm/RightSidebar';
import axios from '../api/axios';
import styles from '../components/ProfileForm/ProfileForm.module.css';
import { FiLogIn } from 'react-icons/fi';

interface ProfileData {
  firstName: string;
  lastName: string;
  birthDate: string;
  photoUrl: string;
  summary: string;
}

const ProfilePage: React.FC = () => {
  const [token, setToken] = useState<string | null>(null);
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    setToken(storedToken);
    
    if (storedToken) {
      fetchProfileData(storedToken);
    } else {
      setLoading(false);
    }
  }, []);

  const fetchProfileData = async (tokenValue: string) => {
    try {
      const res = await axios.get('/profile', {
        headers: { Authorization: `Bearer ${tokenValue}` }
      });
      setProfile(res.data);
    } catch (err) {
      console.error("Profil verisi alınamadı:", err);
      setProfile(null);
    } finally {
      setLoading(false);
    }
  };

  const handleProfileUpdateSuccess = () => {
    if (token) {
      fetchProfileData(token);
      setEditMode(false);
    }
  };

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.loadingSpinner}></div>
        <p>Yükleniyor...</p>
      </div>
    );
  }

  return (
    <div className={styles.profilePageContainer}>
      {!token ? (
        <div className={styles.loginMessage}>
          <h2>Hesabınıza Erişin</h2>
          <p>Bu sayfaya erişmek için lütfen giriş yapın veya yeni bir hesap oluşturun.</p>
          <a href="/login" className={styles.loginLink}>
            <FiLogIn size={18} />
            Giriş Yap
          </a>
        </div>
      ) : (
        <>
          <div className={styles.mainContent}>
            {profile && !editMode ? (
              <ProfileView 
                profile={profile} 
                onEdit={() => setEditMode(true)} 
              />
            ) : (
              <ProfileForm 
                token={token} 
                existingProfile={profile || undefined}
                onSuccess={handleProfileUpdateSuccess}
              />
            )}
          </div>
          <RightSidebar />
        </>
      )}
    </div>
  );
};

export default ProfilePage;