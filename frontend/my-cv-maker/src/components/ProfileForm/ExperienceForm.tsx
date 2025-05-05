import React, { useEffect, useState } from 'react';
import axios from '../../api/axios';
import styles from './ExperienceForm.module.css';
import { FiTrash2, FiBriefcase } from 'react-icons/fi';
import { formatDateTr } from '../../utils/date';

interface Experience {
    id?: string;
    company: string;
    jobTitle: string;
    startDate: string;
    endDate: string;
    description: string;
}

interface Props {
    token: string;
}

const ExperienceForm: React.FC<Props> = ({ token }) => {
    const [form, setForm] = useState<Experience>({
        company: '',
        jobTitle: '',
        startDate: '',
        endDate: '',
        description: ''
    });

    const [experiences, setExperiences] = useState<Experience[]>([]);
    const [error, setError] = useState('');

    useEffect(() => {
        axios.get('/experiences', {
            headers: { Authorization: `Bearer ${token}` }
        }).then(res => setExperiences(res.data));
    }, [token]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        try {
            const res = await axios.post('/experiences', form, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setExperiences(prev => [...prev, res.data]);
            setForm({ company: '', jobTitle: '', startDate: '', endDate: '', description: '' });
        } catch {
            setError('Ekleme başarısız. Lütfen tekrar deneyin.');
        }
    };

    const handleDelete = async (id: string) => {
        try {
            await axios.delete(`/experiences/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setExperiences(prev => prev.filter(exp => exp.id !== id));
        } catch {
            setError('Silme işlemi başarısız.');
        }
    };

    return (
        <div className={styles.wrapper}>
            <h3>Yeni Deneyim Ekle</h3>
            {error && <p className={styles.error}>{error}</p>}
            <form onSubmit={handleSubmit} className={styles.form}>
                <input name="company" value={form.company} onChange={handleChange} placeholder="Şirket Adı" required />
                <input name="jobTitle" value={form.jobTitle} onChange={handleChange} placeholder="Pozisyon" required />
                <input name="startDate" type="date" value={form.startDate} onChange={handleChange} required />
                <input name="endDate" type="date" value={form.endDate} onChange={handleChange} required />
                <textarea name="description" value={form.description} onChange={handleChange} placeholder="Açıklama" rows={3} />
                <button type="submit">Ekle</button>
            </form>

            <div className={styles.list}>
                {experiences.map(exp => (
                    <div key={exp.id} className={styles.card}>
                        <div className={styles.cardHeader}>
                            <FiBriefcase className={styles.icon} />
                            <div>
                                <h4 className={styles.jobTitle}>{exp.jobTitle}</h4>
                                <span className={styles.company}>@ {exp.company}</span>
                            </div>
                        </div>
                        <div className={styles.cardBody}>
                            <span className={styles.dates}>
                                {formatDateTr(exp.startDate)} – {formatDateTr(exp.endDate)}
                            </span>
                            {exp.description && (
                                <p className={styles.description}>{exp.description}</p>
                            )}
                        </div>
                        <button
                            onClick={() => exp.id && handleDelete(exp.id)}
                            className={styles.deleteBtn}
                            title="Sil"
                        >
                            <FiTrash2 />
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ExperienceForm;
