import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FiMail, FiLock, FiEye, FiEyeOff } from 'react-icons/fi';
import { login, LoginRequest } from '../../api/auth';
import { useNavigate, Link } from 'react-router-dom';
import styles from './AuthGlass.module.css';

const LoginPage: React.FC = () => {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<LoginRequest>();
  const [showPwd, setShowPwd] = useState(false);
  const navigate = useNavigate();

  const onSubmit = async (data: LoginRequest) => {
    try {
      const res = await login(data);
      const token = res.data; // <-- burada `res.data.token` değil, doğrudan `res.data`
      if (!token) {
        alert('Sunucudan geçerli bir token dönmedi.');
        return;
      }
      console.log("Giriş sonrası token:", token);
      localStorage.setItem('token', token);
      navigate('/');
    } catch (err: any) {
      alert(err.response?.data?.message || 'Giriş başarısız');
    }
  };
  
  

  return (
    <div className={styles.authWrapper}>
      <div className={styles.card}>
        <h2 className={styles.title}>Giriş Yap</h2>
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
                {...register('password', { required: 'Şifre zorunlu' })}
              />
              {showPwd
                ? <FiEyeOff className={styles.toggleIcon} onClick={() => setShowPwd(false)} />
                : <FiEye className={styles.toggleIcon} onClick={() => setShowPwd(true)} />
              }
            </div>
            {errors.password && <p className={styles.error}>{errors.password.message}</p>}
          </div>

          <button type="submit" className={styles.button} disabled={isSubmitting}>
            Giriş Yap
          </button>
        </form>
        <p className={styles.switchText}>
          Hesabın yok mu? <Link to="/register">Kayıt Ol</Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
