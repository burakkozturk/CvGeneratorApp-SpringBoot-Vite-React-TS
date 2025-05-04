import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './features/auth/LoginPage';
import RegisterPage from './features/auth/RegisterPage';
import Navbar from './components/Navbar/Navbar';
import { HomePage } from "./pages/HomePage";
import ProfilePage from './pages/ProfilePage';
import TemplatesPage from './pages/TemplatesPage';
import './App.css';

const App: React.FC = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/templates" element={<TemplatesPage />} />

        {/* diğer sayfalar */}
      </Routes>
    </Router>
  );
};

export default App;
