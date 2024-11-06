import React from 'react';
import { useNavigate } from 'react-router-dom'; 

const Dashboard = ({ user }) => {
  const navigate = useNavigate(); 

  
  const handleNavigateToBoard = () => {
    navigate('/board'); 
  };

  return (
    <div className="flex justify-center items-center h-screen">
      {user ? (
        <div className="bg-white p-6 rounded shadow-md">
          <h2 className="text-lg font-semibold mb-4">Perfil de Usuario</h2>
          <p><strong>ID:</strong> {user.id}</p>
          <p><strong>Nombre de usuario:</strong> {user.userName}</p>
          <p><strong>Correo electrónico:</strong> {user.email}</p>
          <button
            onClick={handleNavigateToBoard}
            className="mt-4 bg-blue-500 text-white p-2 rounded"
          >
            Volver al Tablero
            
          </button>
        </div>
      ) : (
        <p>Cargando perfil...</p>
      )}
    </div>
  );
};

export default Dashboard;
