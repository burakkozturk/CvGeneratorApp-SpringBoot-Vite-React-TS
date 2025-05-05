import React, { useState, useEffect, useRef } from "react";
import axios from "../api/axios";
import styles from "./TemplatesPage.module.css";
import { templateList } from "../templates";
import { CVData } from "../types";

// eklenen import’lar
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const TemplatesPage: React.FC = () => {
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [cvData, setCvData] = useState<CVData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  // preview div’ine referans
  const previewRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const [prof, edus, exps, skills, socials] = await Promise.all([
          axios.get("/profile"),
          axios.get("/educations"),
          axios.get("/experiences"),
          axios.get("/skills"),
          axios.get("/social-links"),
        ]);
        setCvData({
          profile: prof.data,
          educations: edus.data,
          experiences: exps.data,
          skills: skills.data,
          socialLinks: socials.data,
        });
      } catch (e) {
        console.error(e);
        setError("Veriler yüklenirken bir hata oluştu.");
      } finally {
        setLoading(false);
      }
    };
    fetchAll();
  }, []);

  if (loading) return <div className={styles.page}>Yükleniyor...</div>;
  if (error)   return <div className={styles.page}>{error}</div>;

  const selectedTemplate = templateList.find((t) => t.id === selectedId);

  // --- PDF indirme fonksiyonu ---
  const handleDownloadPDF = async () => {
    if (!previewRef.current) return;
    // Burada html2canvas’ı CORS için configure ediyoruz
    const canvas = await html2canvas(previewRef.current, {
      scale: 2,
      useCORS: true,
      allowTaint: false,
      logging: true,
    });
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");
    const pdfWidth  = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save("cv.pdf");
  };
  
  // ----------------------------------

  return (
    <div className={styles.page}>
      <h1 className={styles.heading}>Şablon Seç</h1>
      <div className={styles.buttonGroup}>
        {templateList.map((template) => (
          <button
            key={template.id}
            onClick={() => setSelectedId(template.id)}
            className={`${styles.templateButton} ${
              selectedId === template.id ? styles.active : ""
            }`}
          >
            {template.name}
          </button>
        ))}
      </div>

      {selectedTemplate && cvData && (
        <>
          <div className={styles.preview} ref={previewRef}>
            <selectedTemplate.component data={cvData} />
          </div>
          <button
            onClick={handleDownloadPDF}
            className={styles.downloadButton}
          >
            PDF İndir
          </button>
        </>
      )}
    </div>
  );
};

export default TemplatesPage;
