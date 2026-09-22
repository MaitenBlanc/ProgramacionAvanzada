import { useEffect, useState } from "react";
import {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
} from "./services/taskService";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import TaskDetailModal from "./components/TaskDetailModal";
import { Task } from "./types/task";

export default function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [viewingTask, setViewingTask] = useState<Task | null>(null);
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== "undefined") {
      return document.documentElement.classList.contains("dark") || 
             window.matchMedia("(prefers-color-scheme: dark)").matches;
    }
    return false;
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  const fetchTasks = async () => {
    try {
      const res = await getTasks();
      setTasks(res.data);
    } catch (err) {
      console.error("Error al cargar tareas", err);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleCreateOrUpdate = async (taskData: Task) => {
    try {
      if (editingTask && editingTask.id) {
        await updateTask(editingTask.id, taskData);
        setEditingTask(null);
      } else {
        await createTask(taskData);
      }
      fetchTasks();
    } catch (err) {
      console.error("Error al guardar tarea", err);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteTask(id);
      fetchTasks();
    } catch (err) {
      console.error("Error al eliminar tarea", err);
    }
  };

  const handleFinish = async (id: number) => {
    try {
      await updateTask(id, {
        estado: "Finalizada",
        fecha_cierre: new Date().toISOString().split("T")[0],
      });
      fetchTasks();
    } catch (err) {
      console.error("Error al finalizar tarea", err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-10 px-4 sm:px-6 lg:px-8 transition-colors duration-200">
      <div className="max-w-6xl mx-auto">
        <header className="mb-10 relative">
          <div className="absolute right-0 top-0">
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
              title={darkMode ? "Cambiar a modo claro" : "Cambiar a modo oscuro"}
            >
              {darkMode ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              )}
            </button>
          </div>
          <div className="text-center pt-2">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight transition-colors">
              Gestor de Tareas de Software
            </h1>
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400 transition-colors">
              Administra tus proyectos, sprints y asignaciones.
            </p>
          </div>
        </header>

        <TaskForm
          onSubmit={handleCreateOrUpdate}
          editingTask={editingTask}
          onCancel={() => setEditingTask(null)}
        />

        <TaskList
          tasks={tasks}
          onView={setViewingTask}
          onEdit={setEditingTask}
          onDelete={handleDelete}
          onFinish={handleFinish}
        />

        {viewingTask && (
          <TaskDetailModal
            task={viewingTask}
            onClose={() => setViewingTask(null)}
          />
        )}
      </div>
    </div>
  );
}
