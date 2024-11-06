import React from 'react';
import TaskCard from './TaskCard';

const TaskColumn = ({ status, tasks, updateTaskStatus, deleteTask }) => {
  return (
    <div className="w-1/3 min-h-[200px] p-4 bg-gray-50 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold text-blue-700">{status.toUpperCase()}</h2>
      {tasks.map((task) => (
        <TaskCard key={task.id} task={task} updateTaskStatus={updateTaskStatus} deleteTask={deleteTask} />
      ))}
    </div>
  );
  
};


export default TaskColumn;
