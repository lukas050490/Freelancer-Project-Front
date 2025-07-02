import { api } from './api';

import type { Client } from '../types/Client';

export const clientService = {
    getAll: async (): Promise<Client[]> => {
        const res = await api.get('/clients');
        return res.data;
    },
    create: async (data: Omit<Client, 'id'>): Promise<Client> => {
        const res = await api.post('/clients', data);
        return res.data;
    },
    update: async (id: string, data: Omit<Client, 'id'>): Promise<Client> => {
        const res = await api.put(`/clients/${id}`, data);
        return res.data;
    },
    delete: async (id: string): Promise<void> => {
        await api.delete(`/clients/${id}`);
    },
};

