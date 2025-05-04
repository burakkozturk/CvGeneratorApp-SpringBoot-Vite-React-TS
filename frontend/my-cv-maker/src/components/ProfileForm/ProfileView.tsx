import React from 'react';
import styles from './ProfileForm.module.css';

interface ProfileData {
  firstName: string;
  lastName: string;
  birthDate: string;
  photoUrl: string;
  summary: string;
}

const ProfileView: React.FC<{ profile: ProfileData }> = ({ profile }) => {
  return (
    <div className={styles.profileSummaryContainer}>
      <h2 className={styles.pageTitle}>Profil Bilgileriniz</h2>
      <div className={styles.profileGrid}>
        <div className={styles.profileImageContainer}>
          <img src={profile.photoUrl} alt="Profil" className={styles.profileImage} />
        </div>
        <div className={styles.profileInfo}>
          <p><strong>Ad:</strong> {profile.firstName}</p>
          <p><strong>Soyad:</strong> {profile.lastName}</p>
          <p><strong>Doğum Tarihi:</strong> {profile.birthDate}</p>
          <p><strong>Hakkımda:</strong> {profile.summary}</p>
        </div>
      </div>
    </div>
  );
};

export default ProfileView;
