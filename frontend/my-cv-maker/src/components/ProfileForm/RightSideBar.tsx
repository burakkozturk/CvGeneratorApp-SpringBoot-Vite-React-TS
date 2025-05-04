import React, { useState } from 'react';
import styles from './RightSidebar.module.css';

const panels = [
  { key: 'experience', title: 'Deneyim', content: 'Deneyim formu buraya gelecek.' },
  { key: 'education', title: 'Eğitim', content: 'Eğitim formu buraya gelecek.' },
  { key: 'skills', title: 'Yetenekler', content: 'Yetenek formu buraya gelecek.' },
  { key: 'social', title: 'Sosyal Linkler', content: 'Sosyal link formu buraya gelecek.' }
];

const RightSidebar = () => {
  const [openPanel, setOpenPanel] = useState<string | null>(null);

  const togglePanel = (key: string) => {
    setOpenPanel(prev => (prev === key ? null : key));
  };

  return (
    <div className={styles.sidebar}>
      {panels.map(panel => (
        <div key={panel.key} className={styles.panel}>
          <button className={styles.panelHeader} onClick={() => togglePanel(panel.key)}>
            {panel.title}
          </button>
          {openPanel === panel.key && (
            <div className={styles.panelContent}>
              <p>{panel.content}</p> {/* Buraya ilgili form gelecek */}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default RightSidebar;
