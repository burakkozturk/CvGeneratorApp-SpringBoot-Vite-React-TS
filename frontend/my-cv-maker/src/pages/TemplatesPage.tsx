import React, { useState } from "react";
import styles from "./TemplatesPage.module.css";
import { templateList } from "../templates";
import sampleData from "../utils/sampleData";

const TemplatesPage: React.FC = () => {
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const selectedTemplate = templateList.find((t) => t.id === selectedId);

  return (
    <div className={styles.page}>
      <h1 className={styles.heading}>Şablon Seç</h1>
      <div className={styles.buttonGroup}>
        {templateList.map((template) => (
          <button
            key={template.id}
            onClick={() => setSelectedId(template.id)}
            className={styles.templateButton}
          >
            {template.name}
          </button>
        ))}
      </div>

      {selectedTemplate && (
        <div className={styles.preview}>
          <selectedTemplate.component data={sampleData} />
        </div>
      )}
    </div>
  );
};

export default TemplatesPage;
