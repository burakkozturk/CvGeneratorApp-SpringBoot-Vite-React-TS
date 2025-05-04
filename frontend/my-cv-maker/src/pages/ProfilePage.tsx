import React, { useEffect, useState } from 'react';
import ProfileForm from '../components/ProfileForm/ProfileForm';
import ProfileView from '../components/ProfileForm/ProfileView'; // ✔️ default export
import axios from '../api/axios';
import styles from '../components/ProfileForm/ProfileForm.module.css';
import RightSidebar from '../components/ProfileForm/RightSidebar';

const ProfilePage = () => {
  const [token, setToken] = useState<string | null>(null);
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    setToken(storedToken);

    if (storedToken) {
      axios.get('/profile', {
        headers: { Authorization: `Bearer ${storedToken}` }
      })
        .then(res => {
          setProfile(res.data);
        })
        .catch(() => {
          setProfile(null);
        })
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  if (loading) return <p>Yükleniyor...</p>;

  return (
    <div className={styles.profilePageContainer}>
      {!token ? (
        <div className={styles.loginMessage}>
          <p>Bu sayfaya erişmek için lütfen giriş yapın.</p>
          <a href="/login" className={styles.loginLink}>Giriş Yap</a>
        </div>
      ) : (
        <>
          <div className={styles.mainContent}>
            <h2 className={styles.pageTitle}>Profil Sayfası</h2>
            {profile && !editMode ? (
              <ProfileView profile={profile} onEdit={() => setEditMode(true)} />
            ) : (
              <ProfileForm token={token!} />
            )}
          </div>
  
          <RightSidebar />
        </>
      )}
    </div>
  );
}

export default ProfilePage;
