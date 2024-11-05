import React from 'react';

const TaskCard = ({ task, updateTaskStatus, deleteTask }) => {
  const handleStatusChange = (newStatus) => {
    updateTaskStatus(task.id, newStatus);
  };

  return (
    <div className="relative bg-white rounded-lg shadow-lg p-4 m-2 transition-transform transform hover:scale-105 hover:shadow-xl">
      {/* Botón de eliminar en la esquina superior derecha */}
      <button 
        onClick={() => deleteTask(task.id)} 
        className="absolute top-2 right-2 text-red-600 hover:text-red-800"
        aria-label="Eliminar tarea"
      >
        &times; {/* Esto representa la "X" */}
      </button>

      <h3 className="text-lg font-semibold text-blue-800">{task.title}</h3>
      <p className="text-gray-700">{task.description}</p>
      <p className="text-sm font-bold text-green-600">Estado: {task.status}</p> {/* Cambiado a negrita y verde */}

      {/* Botones para cambiar el estado */}
      <div className="flex justify-between mt-4">
        {task.status !== "pendiente" && (
          <button onClick={() => handleStatusChange("pendiente")} className="text-blue-600 hover:underline">
            Mover a Pendiente
          </button>
        )}
        {task.status !== "en progreso" && (
          <button onClick={() => handleStatusChange("en progreso")} className="text-yellow-600 hover:underline">
            Mover a En Progreso
          </button>
        )}
        {task.status !== "completada" && (
          <button onClick={() => handleStatusChange("completada")} className="text-green-600 hover:underline">
            Mover a Completada
          </button>
        )}
      </div>
    </div>
  );
  
};

export default TaskCard;
