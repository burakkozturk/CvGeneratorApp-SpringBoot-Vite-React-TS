import React from "react";
import styles from "./Template5.module.css";
import { CVData } from "../../types";

interface Props {
  data: CVData;
}

const Template5: React.FC<Props> = ({ data }) => {
  return (
    <div className={styles.templateContainer}>
      <div className={styles.header}>
        <div className={styles.profilePhotoWrapper}>
          {data.profile.photoUrl && (
            <img src={data.profile.photoUrl} alt="Profile" className={styles.profilePhoto} />
          )}
        </div>
        <div className={styles.nameSection}>
          <h1 className={styles.name}>{data.profile.firstName} {data.profile.lastName}</h1>
          <p className={styles.contact}>{data.profile.email} | {data.profile.birthDate}</p>
        </div>
      </div>

      {data.profile.summary && (
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Hakkımda</h2>
          <p className={styles.paragraph}>{data.profile.summary}</p>
        </div>
      )}

      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>Eğitim</h2>
        {data.educations.map((edu) => (
          <div key={edu.id} className={styles.educationItem}>
            <strong>{edu.school}</strong> - {edu.degree}
            <p>{edu.startDate} - {edu.endDate}</p>
            <p className={styles.paragraph}>{edu.description}</p>
          </div>
        ))}
      </div>

      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>Deneyim</h2>
        {data.experiences.map((exp) => (
          <div key={exp.id} className={styles.experienceItem}>
            <strong>{exp.company}</strong> - {exp.jobTitle}
            <p>{exp.startDate} - {exp.endDate}</p>
            <p className={styles.paragraph}>{exp.description}</p>
          </div>
        ))}
      </div>

      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>Yetenekler</h2>
        <ul className={styles.skillList}>
          {data.skills.map((skill) => (
            <li key={skill.id}>{skill.name} - {skill.level}</li>
          ))}
        </ul>
      </div>

      {data.socialLinks.length > 0 && (
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Sosyal Medya</h2>
          <ul className={styles.socialList}>
            {data.socialLinks.map((link, idx) => (
              <li key={idx}><a href={link.url}>{link.platform}</a></li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Template5;
