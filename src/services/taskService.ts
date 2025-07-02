import { api } from './api';
import type { Task } from '../types/Types';

export const taskService = {
    getAll: async (): Promise<Task[]> => {
        const res = await api.get('/tasks');
        return res.data;
    },

    getByProject: async (projectId: string) => {
        const res = await api.get(`/tasks/project/${projectId}`);
        return res.data;
    },

    create: async (data: Omit<Task, 'id' | 'createdAt'>): Promise<Task> => {
        const res = await api.post('/tasks', data);
        return res.data;
    },

    update: async (id: string, data: Partial<Omit<Task, 'id'>>): Promise<Task> => {
        const res = await api.put(`/tasks/${id}`, data);
        return res.data;
    },

    delete: async (id: string): Promise<void> => {
        await api.delete(`/tasks/${id}`);
    },
};
