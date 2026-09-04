import { useState } from 'react';
   import { useTasks } from '../context/TaskContext';

   const TaskForm = () => {
     const [title, setTitle] = useState('');
     const [description, setDescription] = useState('');
     const { addTask } = useTasks();

     const handleSubmit = (e: React.FormEvent) => {
       e.preventDefault();
       if (!title.trim()) return;
       addTask(title, description);
       setTitle('');
       setDescription('');
     };

     return (
       <form onSubmit={handleSubmit} className="mb-8">
         <div className="mb-4">
           <input
             type="text"
             placeholder="Task title"
             value={title}
             onChange={(e) => setTitle(e.target.value)}
             className="w-full p-2 border rounded"
           />
         </div>
         <div className="mb-4">
           <textarea
             placeholder="Task description"
             value={description}
             onChange={(e) => setDescription(e.target.value)}
             className="w-full p-2 border rounded"
           />
         </div>
         <button
           type="submit"
           className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
         >
           Add Task
         </button>
       </form>
     );
   };

   export default TaskForm;