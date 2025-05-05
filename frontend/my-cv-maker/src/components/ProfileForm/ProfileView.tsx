import React from 'react';
import styles from './ProfileForm.module.css';
import { FiEdit2 } from 'react-icons/fi';

interface ProfileData {
  firstName: string;
  lastName: string;
  birthDate: string;
  photoUrl: string;
  summary: string;
}

interface ProfileViewProps {
  profile: ProfileData;
  onEdit: () => void;
}

const ProfileView: React.FC<ProfileViewProps> = ({ profile, onEdit }) => {
  // Format date to display in a more readable format
  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    
    const date = new Date(dateString);
    return date.toLocaleDateString('tr-TR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  return (
    <div className={styles.profileSummaryContainer}>
      <h2 className={styles.pageTitle}>Profil Bilgileriniz</h2>
      
      <div className={styles.profileGrid}>
        <div className={styles.profileImageContainer}>
          {profile.photoUrl ? (
            <img 
              src={profile.photoUrl} 
              alt={`${profile.firstName} ${profile.lastName}`} 
              className={styles.profileImage} 
            />
          ) : (
            <div className={styles.profileImage} style={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              backgroundColor: '#e5e7eb'
            }}>
              <FiUser size={64} color="#9ca3af" />
            </div>
          )}
        </div>
        
        <div className={styles.profileInfo}>
          <p><strong>Ad:</strong> {profile.firstName || '-'}</p>
          <p><strong>Soyad:</strong> {profile.lastName || '-'}</p>
          <p><strong>Doğum Tarihi:</strong> {formatDate(profile.birthDate) || '-'}</p>
          <p><strong>Hakkımda:</strong> {profile.summary || 'Henüz bilgi girilmemiş.'}</p>
          
          <button 
            className={styles.editButton}
            onClick={onEdit}
          >
            <FiEdit2 size={18} />
            Profili Düzenle
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileView;