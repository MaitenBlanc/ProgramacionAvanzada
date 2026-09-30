import axios from 'axios';
import { Task } from '../types/task';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export const getTasks = () => axios.get<Task[]>(`${API_URL}/tasks`);
export const createTask = (task: Task) => axios.post<Task>(`${API_URL}/tasks`, task);
export const updateTask = (id: number, task: Partial<Task>) => axios.put<Task>(`${API_URL}/tasks/${id}`, task);
export const deleteTask = (id: number) => axios.delete(`${API_URL}/tasks/${id}`);