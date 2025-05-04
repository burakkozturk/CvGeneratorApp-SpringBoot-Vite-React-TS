import React from "react";
import styles from "./Template2.module.css";
import { CVData } from "../../types";

interface Props {
  data: CVData;
}

const Template2: React.FC<Props> = ({ data }) => {
  return (
    <div className={styles.templateContainer}>
      <div className={styles.leftColumn}>
        {data.profile.photoUrl && (
          <img
            src={data.profile.photoUrl}
            alt="Profile"
            className={styles.profilePhoto}
          />
        )}
        <h2>{data.profile.firstName} {data.profile.lastName}</h2>
        <p className={styles.contact}>{data.profile.email}</p>
        <p className={styles.contact}>{data.profile.birthDate}</p>
        {data.profile.summary && (
          <div className={styles.summary}>
            <h4>Özet</h4>
            <p>{data.profile.summary}</p>
          </div>
        )}
      </div>
      <div className={styles.rightColumn}>
        <section>
          <h3>Eğitim</h3>
          {data.educations.map((edu) => (
            <div key={edu.id} className={styles.item}>
              <div className={styles.itemTitle}>
                <strong>{edu.school}</strong> - {edu.degree}
              </div>
              <div className={styles.itemSubtitle}>
                {edu.startDate} - {edu.endDate}
              </div>
              <div className={styles.itemDesc}>{edu.description}</div>
            </div>
          ))}
        </section>

        <section>
          <h3>Deneyim</h3>
          {data.experiences.map((exp) => (
            <div key={exp.id} className={styles.item}>
              <div className={styles.itemTitle}>
                <strong>{exp.company}</strong> - {exp.jobTitle}
              </div>
              <div className={styles.itemSubtitle}>
                {exp.startDate} - {exp.endDate}
              </div>
              <div className={styles.itemDesc}>{exp.description}</div>
            </div>
          ))}
        </section>

        <section>
          <h3>Yetenekler</h3>
          <ul>
            {data.skills.map((skill) => (
              <li key={skill.id}>
                {skill.name} - {skill.level}
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
};

export default Template2;
