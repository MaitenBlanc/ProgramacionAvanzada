import { Task } from "../types/task";

interface TaskListProps {
  tasks: Task[];
  onEdit: (task: Task) => void;
  onDelete: (id: number) => void;
  onFinish: (id: number) => void;
}

export default function TaskList({
  tasks,
  onEdit,
  onDelete,
  onFinish,
}: TaskListProps) {
  const getStatusBadge = (estado: string) => {
    switch (estado) {
      case "Pendiente":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "En Progreso":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "Finalizada":
        return "bg-green-100 text-green-800 border-green-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="p-6 border-b border-gray-100 bg-white">
        <h2 className="text-xl font-semibold text-gray-800">
          Listado de Tareas
        </h2>
      </div>

      {tasks.length === 0 ? (
        <div className="p-8 text-center text-gray-500">
          No hay tareas registradas en la base de datos.
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-gray-600">
            <thead className="text-xs text-gray-500 uppercase bg-gray-50/50">
              <tr>
                <th className="px-6 py-4 font-medium">Proyecto</th>
                <th className="px-6 py-4 font-medium">Resumen</th>
                <th className="px-6 py-4 font-medium">Estado</th>
                <th className="px-6 py-4 font-medium">Prioridad</th>
                <th className="px-6 py-4 font-medium">Asignado</th>
                <th className="px-6 py-4 font-medium text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {tasks.map((task) => (
                <tr
                  key={task.id}
                  className="hover:bg-gray-50/50 transition-colors"
                >
                  <td className="px-6 py-4 font-medium text-gray-900">
                    {task.nombre_proyecto}
                  </td>
                  <td className="px-6 py-4">{task.resumen}</td>
                  <td className="px-4 py-4">
                    <span
                      className={`px-2 py-1 text-xs font-medium rounded-full border ${getStatusBadge(task.estado)}`}
                    >
                      {task.estado}
                    </span>
                  </td>
                  <td className="px-6 py-4">{task.prioridad}</td>
                  <td className="px-6 py-4">{task.persona_asignada}</td>
                  <td className="px-6 py-4 flex flex-col items-end lg:items-center justify-end gap-3 lg:gap-4">
                    <button
                      onClick={() => onEdit(task)}
                      className="font-medium text-blue-600 hover:text-blue-800 transition-colors flex items-center gap-1"
                      title="Editar"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-5 h-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                        />
                      </svg>
                      <span className="hidden sm:inline">Editar</span>
                    </button>
                    <button
                      onClick={() => onDelete(task.id!)}
                      className="font-medium text-red-600 hover:text-red-800 transition-colors flex items-center gap-1"
                      title="Eliminar"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-5 h-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                      </svg>
                      <span className="hidden sm:inline">Eliminar</span>
                    </button>
                    {task.estado !== "Finalizada" && (
                      <button
                        onClick={() => onFinish(task.id!)}
                        className="font-medium text-green-600 hover:text-green-800 transition-colors flex items-center gap-1"
                        title="Finalizar"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-5 h-5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                        <span className="hidden sm:inline">Finalizar</span>
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
