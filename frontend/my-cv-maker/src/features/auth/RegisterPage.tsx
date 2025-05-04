import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FiMail, FiLock, FiEye, FiEyeOff } from 'react-icons/fi';
import { registerUser, RegisterRequest } from '../../api/auth';
import { useNavigate, Link } from 'react-router-dom';
import styles from './AuthGlass.module.css';

interface FormValues extends RegisterRequest {
  confirmPassword: string;
}

const RegisterPage: React.FC = () => {
  const { register, handleSubmit, watch, formState: { errors, isSubmitting } } = useForm<FormValues>();
  const [showPwd, setShowPwd] = useState(false);
  const navigate = useNavigate();

  const onSubmit = async (data: FormValues) => {
    if (data.password !== data.confirmPassword) {
      return alert('Şifreler eşleşmiyor');
    }
    try {
      await registerUser({ email: data.email, password: data.password });
      alert('Kayıt başarılı! Şimdi giriş yapabilirsiniz.');
      navigate('/login'); // ✅ Sadece login sayfasına yönlendiriyoruz
    } catch (err: any) {
      alert(err.response?.data?.message || 'Kayıt başarısız');
    }
  };

  return (
    <div className={styles.authWrapper}>
      <div className={styles.card}>
        <h2 className={styles.title}>Kayıt Ol</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.formGroup}>
            <div className={styles.inputWrapper}>
              <FiMail className={styles.inputIcon} />
              <input
                type="email"
                placeholder="Email"
                className={styles.input}
                {...register('email', { required: 'Email zorunlu' })}
              />
            </div>
            {errors.email && <p className={styles.error}>{errors.email.message}</p>}
          </div>

          <div className={styles.formGroup}>
            <div className={styles.inputWrapper}>
              <FiLock className={styles.inputIcon} />
              <input
                type={showPwd ? 'text' : 'password'}
                placeholder="Şifre"
                className={styles.input}
                {...register('password', {
                  required: 'Şifre zorunlu',
                  minLength: { value: 6, message: 'En az 6 karakter' }
                })}
              />
              {showPwd
                ? <FiEyeOff className={styles.toggleIcon} onClick={() => setShowPwd(false)} />
                : <FiEye className={styles.toggleIcon} onClick={() => setShowPwd(true)} />
              }
            </div>
            {errors.password && <p className={styles.error}>{errors.password.message}</p>}
          </div>

          <div className={styles.formGroup}>
            <div className={styles.inputWrapper}>
              <FiLock className={styles.inputIcon} />
              <input
                type={showPwd ? 'text' : 'password'}
                placeholder="Şifre (Tekrar)"
                className={styles.input}
                {...register('confirmPassword', { required: 'Tekrar şifre zorunlu' })}
              />
            </div>
            {errors.confirmPassword && <p className={styles.error}>{errors.confirmPassword.message}</p>}
          </div>

          <button type="submit" className={styles.button} disabled={isSubmitting}>
            Kayıt Ol
          </button>
        </form>
        <p className={styles.switchText}>
          Zaten hesabın var mı? <Link to="/login">Giriş Yap</Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
