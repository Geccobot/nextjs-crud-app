import { createContext, useContext, useState } from 'react';
   import { Task } from '../types/task';
   import { v4 as uuidv4 } from 'uuid';

   interface TaskContextType {
     tasks: Task[];
     addTask: (title: string, description: string) => void;
     deleteTask: (id: string) => void;
     toggleTask: (id: string) => void;
     updateTask: (id: string, title: string, description: string) => void;
   }

   const TaskContext = createContext<TaskContextType | undefined>(undefined);

   export const TaskProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
     const [tasks, setTasks] = useState<Task[]>([]);

     const addTask = (title: string, description: string) => {
       const newTask: Task = {
         id: uuidv4(),
         title,
         description,
         completed: false,
         createdAt: new Date(),
       };
       setTasks([...tasks, newTask]);
     };

     const deleteTask = (id: string) => {
       setTasks(tasks.filter(task => task.id !== id));
     };

     const toggleTask = (id: string) => {
       setTasks(
         tasks.map(task =>
           task.id === id ? { ...task, completed: !task.completed } : task
         )
       );
     };

     const updateTask = (id: string, title: string, description: string) => {
       setTasks(
         tasks.map(task =>
           task.id === id ? { ...task, title, description } : task
         )
       );
     };

     return (
       <TaskContext.Provider value={{ tasks, addTask, deleteTask, toggleTask, updateTask }}>
         {children}
       </TaskContext.Provider>
     );
   };

   export const useTasks = () => {
     const context = useContext(TaskContext);
     if (context === undefined) {
       throw new Error('useTasks must be used within a TaskProvider');
     }
     return context;
   };