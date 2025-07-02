import { api } from './api';
import type { Payment } from '../types/Payment';

export const paymentService = {
    getAll: async (): Promise<Payment[]> => {
        const res = await api.get('/payments');
        return res.data;
    },

    getByProject: async (projectId: string) => {
        const res = await api.get(`/payments/project/${projectId}`);
        return res.data;
    },

    create: async (data: Omit<Payment, 'id' | 'createdAt'>): Promise<Payment> => {
        const res = await api.post('/payments', data);
        return res.data;
    },

    update: async (id: string, data: Partial<Omit<Payment, 'id'>>): Promise<Payment> => {
        const res = await api.put(`/payments/${id}`, data);
        return res.data;
    },

    delete: async (id: string): Promise<void> => {
        await api.delete(`/payments/${id}`);
    },
};
