import { api } from './api';
import type { Project } from '../types/Project';

export const projectService = {
    getAll: async (): Promise<Project[]> => {
        const res = await api.get('/projects');
        return res.data;
    },

    getById: async (id: string) => {
        const res = await api.get(`/projects/${id}`);
        return res.data;
    },

    create: async (data: Omit<Project, 'id' | 'client'>): Promise<Project> => {
        const res = await api.post('/projects', data);
        return res.data;
    },

    update: async (id: string, data: Omit<Project, 'id' | 'client'>): Promise<Project> => {
        const res = await api.put(`/projects/${id}`, data);
        return res.data;
    },

    delete: async (id: string): Promise<void> => {
        await api.delete(`/projects/${id}`);
    }
};
