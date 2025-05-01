// src/App.tsx  
import React from 'react'; 
import { Routes, Route } from 'react-router-dom';

import { Navbar } from './components/Navbar/Navbar';
import { Footer } from './components/Footer/Footer';

import { HomePage } from './pages/HomePage';
import LoginPage from './features/auth/LoginPage';
import RegisterPage from './features/auth/RegisterPage';
import TemplatesPage from './pages/TemplatesPage';

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/templates" element={<TemplatesPage />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
