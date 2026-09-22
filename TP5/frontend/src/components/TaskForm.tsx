import { useState, useEffect, ChangeEvent, SubmitEvent } from "react";
import { Task } from "../types/task";

interface TaskFormProps {
  onSubmit: (task: Task) => void;
  editingTask: Task | null;
  onCancel: () => void;
}

const initialState: Task = {
  nombre_proyecto: "",
  tipo_actividad: "Desarrollo",
  estado: "Pendiente",
  resumen: "",
  descripcion: "",
  prioridad: "Media",
  informador: "",
  persona_asignada: "",
  precondicion: "",
  fecha_creacion: new Date().toISOString().split("T")[0],
  fecha_cierre: "",
  sprint: "Sprint 1",
};

export default function TaskForm({
  onSubmit,
  editingTask,
  onCancel,
}: TaskFormProps) {
  const [formData, setFormData] = useState<Task>(initialState);

  useEffect(() => {
    setFormData(editingTask ? editingTask : initialState);
  }, [editingTask]);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    const taskPayload = { ...formData };
    // Si la fecha de cierre está vacía, se elimina del objeto para que no de error
    if (taskPayload.fecha_cierre === '') {
      delete taskPayload.fecha_cierre;
    }

    onSubmit(taskPayload);
    setFormData(initialState);
  };
  const inputClass =
    "w-full mt-1 border border-gray-300 dark:border-gray-600 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:bg-white dark:focus:bg-gray-600 transition-colors";
  const labelClass = "block text-sm font-medium text-gray-700 dark:text-gray-300";

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white dark:bg-gray-800 p-6 md:p-8 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 mb-8 grid grid-cols-1 md:grid-cols-2 gap-6 transition-colors duration-200"
    >
      <div className="col-span-1 md:col-span-2 border-b border-gray-100 dark:border-gray-700 pb-4 mb-2">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white transition-colors">
          {editingTask ? "Editar Tarea" : "Nueva Tarea"}
        </h2>
      </div>

      <div>
        <label className={labelClass}>Nombre del Proyecto</label>
        <input
          name="nombre_proyecto"
          required
          value={formData.nombre_proyecto}
          onChange={handleChange}
          className={inputClass}
        />
      </div>
      <div>
        <label className={labelClass}>Resumen</label>
        <input
          name="resumen"
          required
          value={formData.resumen}
          onChange={handleChange}
          className={inputClass}
        />
      </div>
      <div>
        <label className={labelClass}>Tipo de Actividad</label>
        <select
          name="tipo_actividad"
          value={formData.tipo_actividad}
          onChange={handleChange}
          className={inputClass}
        >
          <option value="Desarrollo">Desarrollo</option>
          <option value="Bug">Bug</option>
          <option value="Investigación">Investigación</option>
        </select>
      </div>
      <div>
        <label className={labelClass}>Estado</label>
        <select
          name="estado"
          value={formData.estado}
          onChange={handleChange}
          className={inputClass}
        >
          <option value="Pendiente">Pendiente</option>
          <option value="En Progreso">En Progreso</option>
          <option value="Finalizada">Finalizada</option>
        </select>
      </div>
      <div>
        <label className={labelClass}>Prioridad</label>
        <select
          name="prioridad"
          value={formData.prioridad}
          onChange={handleChange}
          className={inputClass}
        >
          <option value="Baja">Baja</option>
          <option value="Media">Media</option>
          <option value="Alta">Alta</option>
        </select>
      </div>
      <div>
        <label className={labelClass}>Informador</label>
        <input
          name="informador"
          required
          value={formData.informador}
          onChange={handleChange}
          className={inputClass}
        />
      </div>
      <div>
        <label className={labelClass}>Persona Asignada</label>
        <input
          name="persona_asignada"
          required
          value={formData.persona_asignada}
          onChange={handleChange}
          className={inputClass}
        />
      </div>
      <div>
        <label className={labelClass}>Sprint</label>
        <input
          name="sprint"
          required
          value={formData.sprint}
          onChange={handleChange}
          className={inputClass}
        />
      </div>
      <div>
        <label className={labelClass}>Fecha de Creación</label>
        <input
          type="date"
          name="fecha_creacion"
          required
          value={formData.fecha_creacion}
          onChange={handleChange}
          className={inputClass}
        />
      </div>
      <div>
        <label className={labelClass}>Fecha de Cierre</label>
        <input
          type="date"
          name="fecha_cierre"
          value={formData.fecha_cierre || ""}
          onChange={handleChange}
          className={inputClass}
        />
      </div>
      <div className="col-span-1 md:col-span-2">
        <label className={labelClass}>Precondición</label>
        <textarea
          name="precondicion"
          rows={2}
          value={formData.precondicion}
          onChange={handleChange}
          className={inputClass}
        />
      </div>
      <div className="col-span-1 md:col-span-2">
        <label className={labelClass}>Descripción</label>
        <textarea
          name="descripcion"
          rows={3}
          value={formData.descripcion}
          onChange={handleChange}
          className={inputClass}
        />
      </div>

      <div className="col-span-1 md:col-span-2 flex items-center justify-end gap-3 mt-4">
        {editingTask && (
          <button
            type="button"
            onClick={onCancel}
            className="px-5 py-2.5 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
          >
            Cancelar
          </button>
        )}
        <button
          type="submit"
          className="px-5 py-2.5 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 shadow-sm transition-colors"
        >
          {editingTask ? "Actualizar Tarea" : "Crear Tarea"}
        </button>
      </div>
    </form>
  );
}
