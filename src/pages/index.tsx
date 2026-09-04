import Head from 'next/head';
import TaskForm from '../components/TaskForm';
import TaskList from '../components/TaskList';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>Next.js CRUD App</title>
        <meta name="description" content="A simple CRUD app with Next.js" />
      </Head>
      <main className="container mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold mb-8">Task Manager</h1>
        <TaskForm />
        <TaskList />
      </main>
    </div>
  );
}