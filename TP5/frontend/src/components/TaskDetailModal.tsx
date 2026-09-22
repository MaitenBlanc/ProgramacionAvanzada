import { Task } from "../types/task";

interface TaskDetailModalProps {
  task: Task;
  onClose: () => void;
}

export default function TaskDetailModal({ task, onClose }: TaskDetailModalProps) {
  // Prevent closing when clicking inside the modal
  const handleModalClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  const fieldClass = "mb-4";
  const labelClass = "block text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1";
  const valueClass = "text-sm text-gray-900 dark:text-gray-100 bg-gray-50 dark:bg-gray-700/50 p-3 rounded-lg border border-gray-100 dark:border-gray-600";

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm transition-opacity"
      onClick={onClose}
    >
      <div 
        className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto border border-gray-100 dark:border-gray-700"
        onClick={handleModalClick}
      >
        <div className="sticky top-0 z-10 flex items-center justify-between p-6 border-b border-gray-100 dark:border-gray-700 bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Detalles de la Tarea
          </h2>
          <button
            onClick={onClose}
            className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
            title="Cerrar"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className={fieldClass}>
            <span className={labelClass}>Proyecto</span>
            <div className={valueClass}>{task.nombre_proyecto}</div>
          </div>
          <div className={fieldClass}>
            <span className={labelClass}>Resumen</span>
            <div className={valueClass}>{task.resumen}</div>
          </div>
          
          <div className={fieldClass}>
            <span className={labelClass}>Tipo de Actividad</span>
            <div className={valueClass}>{task.tipo_actividad}</div>
          </div>
          <div className={fieldClass}>
            <span className={labelClass}>Estado</span>
            <div className={valueClass}>
              <span className={`px-2.5 py-1 text-xs font-medium rounded-full border 
                ${task.estado === 'Pendiente' ? 'bg-yellow-100 text-yellow-800 border-yellow-200 dark:bg-yellow-900/30 dark:text-yellow-400 dark:border-yellow-700' : 
                  task.estado === 'En Progreso' ? 'bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900/30 dark:text-blue-400 dark:border-blue-700' : 
                  task.estado === 'Finalizada' ? 'bg-green-100 text-green-800 border-green-200 dark:bg-green-900/30 dark:text-green-400 dark:border-green-700' : 
                  'bg-gray-100 text-gray-800 border-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600'}`}>
                {task.estado}
              </span>
            </div>
          </div>

          <div className={fieldClass}>
            <span className={labelClass}>Prioridad</span>
            <div className={valueClass}>{task.prioridad}</div>
          </div>
          <div className={fieldClass}>
            <span className={labelClass}>Sprint</span>
            <div className={valueClass}>{task.sprint}</div>
          </div>

          <div className={fieldClass}>
            <span className={labelClass}>Informador</span>
            <div className={valueClass}>{task.informador}</div>
          </div>
          <div className={fieldClass}>
            <span className={labelClass}>Persona Asignada</span>
            <div className={valueClass}>{task.persona_asignada}</div>
          </div>

          <div className={fieldClass}>
            <span className={labelClass}>Fecha de Creación</span>
            <div className={valueClass}>{task.fecha_creacion}</div>
          </div>
          <div className={fieldClass}>
            <span className={labelClass}>Fecha de Cierre</span>
            <div className={valueClass}>{task.fecha_cierre || "N/A"}</div>
          </div>

          <div className="col-span-1 md:col-span-2 mb-4">
            <span className={labelClass}>Precondición</span>
            <div className={`${valueClass} whitespace-pre-wrap min-h-[3rem]`}>
              {task.precondicion || "Sin precondición"}
            </div>
          </div>
          <div className="col-span-1 md:col-span-2 mb-4">
            <span className={labelClass}>Descripción</span>
            <div className={`${valueClass} whitespace-pre-wrap min-h-[4rem]`}>
              {task.descripcion || "Sin descripción"}
            </div>
          </div>
        </div>

        <div className="p-6 border-t border-gray-100 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-800/50 rounded-b-2xl flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2.5 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 shadow-sm transition-colors"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
}
