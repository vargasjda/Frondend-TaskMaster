import React from 'react';
import { useNavigate } from 'react-router-dom';

const Navbar = ({ userName, onLogout }) => {
  const navigate = useNavigate();

  const handleLogoutClick = () => {
    onLogout(); 
    navigate('/login'); 
  };

  const handleUserNameClick = () => {
    navigate('/dashboard'); 
  };

  return (
    <nav className="bg-[#003366] text-white p-4 flex justify-between items-center shadow-lg">
      <button 
        onClick={handleLogoutClick} 
        className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded"
      >
        Cerrar Sesión
      </button>

      <span 
        onClick={handleUserNameClick} 
        className="cursor-pointer text-lg font-semibold hover:underline"
      >
        {userName}
      </span>
    </nav>
  );
};

export default Navbar;
