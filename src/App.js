import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import axios from 'axios';

import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import Dashboard from './pages/Dashboard'; 
import BoardPage from './pages/BoardPage'; 
import Navbar from './components/Navbar'; 

const App = () => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const fetchUserProfile = async () => {
        try {
          const response = await axios.get('http://localhost:5000/user/profile', {
            headers: { Authorization: `Bearer ${token}` },
          });
          setUser(response.data.user);
          setIsAuthenticated(true);
        } catch (error) {
          console.error('Error fetching user profile:', error);
          localStorage.removeItem('token'); // Remover el token en caso de error
        }
      };

      fetchUserProfile();
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <Router>
      {isAuthenticated && user && <Navbar userName={user.userName} onLogout={handleLogout} />}
      <Routes>
        <Route path="/" element={<LoginPage setUserName={setUser} setIsAuthenticated={setIsAuthenticated} />} />
        <Route path="/login" element={<LoginPage setUserName={setUser} setIsAuthenticated={setIsAuthenticated} />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/dashboard" element={<Dashboard user={user} />} />
        <Route path="/board" element={<BoardPage />} />
      </Routes>
    </Router>
  );
};

export default App;
