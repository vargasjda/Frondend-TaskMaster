import React, { useState, useEffect, useCallback } from 'react';
import TaskColumn from './TaskColumn';
import axios from 'axios';

const TaskBoard = ({ tasks, setTasks }) => {
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskDescription, setNewTaskDescription] = useState('');
  const statuses = ["pendiente", "en progreso", "completada"];

  const fetchTasks = useCallback(async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/tasks', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      console.log("Tareas obtenidas desde la API:", response.data);
      setTasks(response.data);
    } catch (error) {
      console.error("Error al obtener las tareas:", error);
    }
  }, [setTasks]);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  // Función para añadir una nueva tarea
  const addTask = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/tasks', {
        title: newTaskTitle,
        description: newTaskDescription,
        status: "pendiente" // Inicialmente añadimos la tarea como "pendiente"
      }, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      
      setTasks([...tasks, response.data]); // Añadimos la nueva tarea al estado
      setNewTaskTitle(''); // Limpiamos el formulario
      setNewTaskDescription('');
    } catch (error) {
      console.error("Error al añadir la tarea:", error);
    }
  };

  // Función para eliminar una tarea
  const deleteTask = async (taskId) => {
    try {
      await axios.delete(`http://localhost:5000/api/tasks/${taskId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setTasks(tasks.filter(task => task.id !== taskId));
    } catch (error) {
      console.error("Error al eliminar la tarea:", error);
    }
  };

  // Función para actualizar el estado de una tarea
  const updateTaskStatus = async (taskId, newStatus) => {
    const updatedTask = tasks.find((task) => task.id === taskId);
    if (!updatedTask) return;

    updatedTask.status = newStatus;
    const updatedTasks = tasks.map((task) => (task.id === taskId ? updatedTask : task));
    setTasks(updatedTasks);

    try {
      await axios.put(`http://localhost:5000/api/tasks/${taskId}`, updatedTask, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      console.log("Tarea actualizada con éxito");
    } catch (error) {
      console.error("Error al actualizar la tarea:", error);
    }
  };

  return (
    <div>
      {/* Formulario para añadir nueva tarea */}
      <div className="mb-6 p-4 bg-gray-100 rounded-lg shadow">
        <h2 className="text-lg font-semibold">Añadir Nueva Tarea</h2>
        <div className="flex space-x-2">
          <input
            type="text"
            placeholder="Título de la tarea"
            value={newTaskTitle}
            onChange={(e) => setNewTaskTitle(e.target.value)}
            className="border border-gray-300 rounded px-3 py-2"
          />
          <input
            type="text"
            placeholder="Descripción de la tarea"
            value={newTaskDescription}
            onChange={(e) => setNewTaskDescription(e.target.value)}
            className="border border-gray-300 rounded px-3 py-2"
          />
          <button onClick={addTask} className="bg-blue-600 text-white rounded px-4 py-2 hover:bg-blue-700">
            Añadir Tarea
          </button>
        </div>
      </div>
  
      {/* Columnas de tareas */}
      <div className="flex justify-between">
        {statuses.map((status) => (
          <TaskColumn
            key={status}
            status={status}
            tasks={tasks.filter((task) => task.status === status)}
            updateTaskStatus={updateTaskStatus}
            deleteTask={deleteTask}
          />
        ))}
      </div>
    </div>
  );
  
};

export default TaskBoard;
