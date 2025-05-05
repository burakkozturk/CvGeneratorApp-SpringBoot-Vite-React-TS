import React, { useState } from 'react';
import styles from './RightSidebar.module.css';
import {
  FiBriefcase,
  FiBook,
  FiCode,
  FiLink
} from 'react-icons/fi';

import ExperienceForm from './ExperienceForm';
import EducationForm from './EducationForm';
import SkillsForm from './SkillsForm';
import SocialLinksForm from './SocialLinkForm';

interface RightSidebarProps {
  token: string;
}

const tabs = [
  { key: 'experience', title: 'Deneyim', icon: <FiBriefcase /> },
  { key: 'education', title: 'Eğitim', icon: <FiBook /> },
  { key: 'skills', title: 'Yetenekler', icon: <FiCode /> },
  { key: 'social', title: 'Sosyal', icon: <FiLink /> }
];

const RightSidebar: React.FC<RightSidebarProps> = ({ token }) => {
  const [activeTab, setActiveTab] = useState<string | null>(null);

  const toggleTab = (key: string) => {
    setActiveTab(prev => (prev === key ? null : key));
  };

  const renderTabContent = (key: string) => {
    switch (key) {
      case 'experience':
        return <ExperienceForm token={token} />;
      case 'education':
        return <EducationForm token={token} />;
      case 'skills':
        return <SkillsForm token={token} />;
      case 'social':
        return <SocialLinksForm token={token} />;
      default:
        return null;
    }
  };

  return (
    <div className={styles.sidebarContainer}>
      <div className={styles.tabRow}>
        {tabs.map(tab => (
          <button
            key={tab.key}
            onClick={() => toggleTab(tab.key)}
            className={`${styles.tabButton} ${activeTab === tab.key ? styles.active : ''}`}
          >
            {tab.icon}
            <span>{tab.title}</span>
          </button>
        ))}
      </div>

      {activeTab && (
        <div className={styles.tabContent}>
          {renderTabContent(activeTab)}
        </div>
      )}
    </div>
  );
};

export default RightSidebar;
