// src/templates/Template4.tsx
import React from "react";
import styles from "./Template4.module.css";

interface Props {
  fullName: string;
  email: string;
  birthDate: string;
  photoUrl?: string;
  summary?: string;
  education: {
    school: string;
    degree: string;
    startDate: string;
    endDate: string;
    description: string;
  }[];
  experience: {
    company: string;
    jobTitle: string;
    startDate: string;
    endDate: string;
    description: string;
  }[];
  skills: {
    name: string;
    level: string;
  }[];
  socialLinks?: {
    platform: string;
    url: string;
  }[];
}

const Template4: React.FC<Props> = ({
  fullName,
  email,
  birthDate,
  photoUrl,
  summary,
  education,
  experience,
  skills,
  socialLinks,
}) => {
  return (
    <div className={styles.templateContainer}>
      <div className={styles.header}>
        {photoUrl && <img src={photoUrl} alt="Profile" className={styles.photo} />}
        <div>
          <h1>{fullName}</h1>
          <p>
            {email} • {birthDate}
          </p>
          {socialLinks && (
            <div className={styles.socialLinks}>
              {socialLinks.map((link, index) => (
                <a key={index} href={link.url} target="_blank" rel="noreferrer">
                  {link.platform}
                </a>
              ))}
            </div>
          )}
        </div>
      </div>

      {summary && (
        <section className={styles.section}>
          <h2>Hakkımda</h2>
          <p>{summary}</p>
        </section>
      )}

      <section className={styles.section}>
        <h2>Eğitim</h2>
        {education.map((edu, idx) => (
          <div key={idx}>
            <strong>
              {edu.school} - {edu.degree}
            </strong>
            <p>
              {edu.startDate} - {edu.endDate}
              <br />
              {edu.description}
            </p>
          </div>
        ))}
      </section>

      <section className={styles.section}>
        <h2>Deneyim</h2>
        {experience.map((exp, idx) => (
          <div key={idx}>
            <strong>
              {exp.company} - {exp.jobTitle}
            </strong>
            <p>
              {exp.startDate} - {exp.endDate}
              <br />
              {exp.description}
            </p>
          </div>
        ))}
      </section>

      <section className={styles.section}>
        <h2>Yetenekler</h2>
        <ul>
          {skills.map((skill, idx) => (
            <li key={idx}>
              {skill.name} - {skill.level}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default Template4;
