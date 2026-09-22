import { useEffect, useState } from "react";
import {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
} from "./services/taskService";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import { Task } from "./types/task";

export default function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

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
    <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <header className="mb-10 text-center">
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
            Gestor de Tareas de Software
          </h1>
          <p className="mt-2 text-sm text-gray-500">
            Administra tus proyectos, sprints y asignaciones.
          </p>
        </header>

        <TaskForm
          onSubmit={handleCreateOrUpdate}
          editingTask={editingTask}
          onCancel={() => setEditingTask(null)}
        />

        <TaskList
          tasks={tasks}
          onEdit={setEditingTask}
          onDelete={handleDelete}
          onFinish={handleFinish}
        />
      </div>
    </div>
  );
}
