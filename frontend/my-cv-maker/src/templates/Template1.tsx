import React from "react";
import styles from "./Template1.module.css";
import { CVData } from "../../types";

interface Props {
  data: CVData;
}

const Template1: React.FC<Props> = ({ data }) => {
  return (
    <div className={styles.templateContainer}>
      <div className={styles.header}>
        {data.profile.photoUrl && (
          <img
            src={data.profile.photoUrl}
            alt="Profile"
            className={styles.profilePhoto}
          />
        )}
        <div className={styles.headerText}>
          <h1>
            {data.profile.firstName} {data.profile.lastName}
          </h1>
          <p>{data.profile.email} | {data.profile.birthDate}</p>
          {data.profile.summary && <p className={styles.summary}>{data.profile.summary}</p>}
        </div>
      </div>

      <div className={styles.section}>
        <h2>Eğitim</h2>
        {data.educations.map((edu) => (
          <div key={edu.id} className={styles.item}>
            <strong>{edu.school}</strong> - {edu.degree} ({edu.startDate} - {edu.endDate})
            <p>{edu.description}</p>
          </div>
        ))}
      </div>

      <div className={styles.section}>
        <h2>Deneyim</h2>
        {data.experiences.map((exp) => (
          <div key={exp.id} className={styles.item}>
            <strong>{exp.company}</strong> - {exp.jobTitle} ({exp.startDate} - {exp.endDate})
            <p>{exp.description}</p>
          </div>
        ))}
      </div>

      <div className={styles.section}>
        <h2>Yetenekler</h2>
        <ul>
          {data.skills.map((skill) => (
            <li key={skill.id}>{skill.name} - {skill.level}</li>
          ))}
        </ul>
      </div>

      {data.socialLinks?.length && (
        <div className={styles.section}>
          <h2>Sosyal Medya</h2>
          <ul>
            {data.socialLinks.map((link) => (
              <li key={link.id}>
                <a href={link.url} target="_blank" rel="noreferrer">
                  {link.platform}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Template1;
