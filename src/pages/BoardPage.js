import React, { useEffect, useState } from 'react';
import TaskBoard from '../components/TaskBoard';
import axios from 'axios';

const BoardPage = () => {
  const [tasks, setTasks] = useState([]);

  
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/tasks', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        setTasks(response.data);
      } catch (error) {
        console.error("Error al obtener las tareas:", error);
      }
    };

    fetchTasks();
  }, []);

  return (
    <div className="flex flex-col items-center h-screen bg-gray-200">
      <h1 className="text-3xl font-bold mb-6 text-blue-800">Tablero de Tareas</h1>
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-4xl">
        <TaskBoard tasks={tasks} setTasks={setTasks} />
      </div>
    </div>
  );
  
};

export default BoardPage;
