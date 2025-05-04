// src/templates/Template3.tsx
import React from "react";
import styles from "./Template3.module.css";

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

const Template3: React.FC<Props> = ({
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
      <div className={styles.sidebar}>
        {photoUrl && <img src={photoUrl} alt="Profile" className={styles.photo} />}
        <h2 className={styles.name}>{fullName}</h2>
        <p className={styles.email}>{email}</p>
        <p className={styles.birthDate}>{birthDate}</p>
        {socialLinks && (
          <div className={styles.socialLinks}>
            {socialLinks.map((link, idx) => (
              <a key={idx} href={link.url} target="_blank" rel="noreferrer">
                {link.platform}
              </a>
            ))}
          </div>
        )}
      </div>
      <div className={styles.mainContent}>
        {summary && (
          <section>
            <h2>Hakkımda</h2>
            <p>{summary}</p>
          </section>
        )}

        <section>
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

        <section>
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

        <section>
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
    </div>
  );
};

export default Template3;
