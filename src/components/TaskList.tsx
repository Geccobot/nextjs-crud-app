import { useState } from 'react';
   import { useTasks } from '../context/TaskContext';
   import { FaTrash, FaEdit, FaCheck, FaTimes } from 'react-icons/fa';
   import { Task } from '../types/task';

   const TaskList = () => {
     const { tasks, deleteTask, toggleTask, updateTask } = useTasks();
     const [editingId, setEditingId] = useState<string | null>(null);
     const [editTitle, setEditTitle] = useState('');
     const [editDescription, setEditDescription] = useState('');

     const handleEdit = (task: Task) => {
       setEditingId(task.id);
       setEditTitle(task.title);
       setEditDescription(task.description);
     };

     const handleUpdate = (id: string) => {
       updateTask(id, editTitle, editDescription);
       setEditingId(null);
     };

     const handleCancel = () => {
       setEditingId(null);
     };

     return (
       <div className="space-y-4">
         {tasks.map((task) => (
           <div
             key={task.id}
             className={`p-4 border rounded ${task.completed ? 'bg-gray-100' : 'bg-white'}`}
           >
             {editingId === task.id ? (
               <div className="space-y-2">
                 <input
                   type="text"
                   value={editTitle}
                   onChange={(e) => setEditTitle(e.target.value)}
                   className="w-full p-2 border rounded"
                 />
                 <textarea
                   value={editDescription}
                   onChange={(e) => setEditDescription(e.target.value)}
                   className="w-full p-2 border rounded"
                 />
                 <div className="flex space-x-2">
                   <button
                     onClick={() => handleUpdate(task.id)}
                     className="bg-green-500 text-white px-3 py-1 rounded"
                   >
                     <FaCheck />
                   </button>
                   <button
                     onClick={handleCancel}
                     className="bg-red-500 text-white px-3 py-1 rounded"
                   >
                     <FaTimes />
                   </button>
                 </div>
               </div>
             ) : (
               <div>
                 <h3 className={`text-lg font-medium ${task.completed ? 'line-through' : ''}`}>
                   {task.title}
                 </h3>
                 <p className={`text-gray-600 ${task.completed ? 'line-through' : ''}`}>
                   {task.description}
                 </p>
                 <div className="flex justify-end space-x-2 mt-2">
                   <button
                     onClick={() => toggleTask(task.id)}
                     className={`px-3 py-1 rounded ${
                       task.completed
                         ? 'bg-yellow-500 text-white'
                         : 'bg-green-500 text-white'
                     }`}
                   >
                     {task.completed ? 'Undo' : 'Complete'}
                   </button>
                   <button
                     onClick={() => handleEdit(task)}
                     className="bg-blue-500 text-white px-3 py-1 rounded"
                   >
                     <FaEdit />
                   </button>
                   <button
                     onClick={() => deleteTask(task.id)}
                     className="bg-red-500 text-white px-3 py-1 rounded"
                   >
                     <FaTrash />
                   </button>
                 </div>
               </div>
             )}
           </div>
         ))}
       </div>
     );
   };

   export default TaskList;