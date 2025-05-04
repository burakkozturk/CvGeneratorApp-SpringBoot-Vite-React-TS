// api/axios.js dosyasını güncelleyelim

import axios from 'axios';

// Temel axios yapılandırması
const axiosInstance = axios.create({
  baseURL: 'https://cvcim.xyz/api',
  headers: {
    'Content-Type': 'application/json'
  },
  // CORS ile ilgili cookie ve credential ayarları
  withCredentials: true
});

// İstek interceptor'ı ekleyelim
axiosInstance.interceptors.request.use(
  config => {
    // Token varsa, her isteğe ekleyelim
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

// Yanıt interceptor'ı ekleyelim
axiosInstance.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    // Hataları daha detaylı loglayalım
    console.error('Axios Hatası:', error.message);
    if (error.response) {
      console.error('Sunucu yanıtı:', error.response.data);
      console.error('Durum kodu:', error.response.status);
      console.error('Başlıklar:', error.response.headers);
    }
    
    return Promise.reject(error);
  }
);

export default axiosInstance;