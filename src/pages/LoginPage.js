import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LoginPage = ({ setUserName, setIsAuthenticated }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    try {
      const response = await axios.post('http://localhost:5000/auth/login', {
        email,
        password,
      });

      localStorage.setItem('token', response.data.token);
      setUserName(response.data.user);
      setIsAuthenticated(true);
      setMessage('Inicio de sesión exitoso');
      navigate('/board');
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        setMessage(error.response.data.message);
      } else {
        setMessage('Error al iniciar sesión. Verifique sus credenciales.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form className="bg-white p-6 rounded-lg shadow-md w-80" onSubmit={handleLogin}>
        <h2 className="text-lg font-semibold mb-4 text-[#003366]">Iniciar Sesión</h2>
        <input
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border border-gray-300 p-2 mb-4 w-full rounded focus:border-[#006699] focus:ring-2 focus:ring-[#006699] transition duration-200"
          required
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border border-gray-300 p-2 mb-4 w-full rounded focus:border-[#006699] focus:ring-2 focus:ring-[#006699] transition duration-200"
          required
        />
        <button
          type="submit"
          className="bg-[#006699] text-white p-2 rounded-lg w-full hover:bg-[#004d66] transition duration-200"
          disabled={loading}
        >
          {loading ? 'Cargando...' : 'Iniciar Sesión'}
        </button>
        {message && <p className="mt-4 text-center text-red-500">{message}</p>}
        <p className="mt-2 text-center">
          <a href="/forgot-password" className="text-[#006699] hover:underline">¿Olvidaste tu contraseña?</a>
        </p>
        <p className="mt-2 text-center">
          <a href="/register" className="text-[#006699] hover:underline">¿No tienes una cuenta? Regístrate</a>
        </p>
      </form>
    </div>
  );
};

export default LoginPage;
