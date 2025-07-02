import { api } from './api';
import type { Document } from '../types/Document';

export const documentService = {
    getByProject: async (projectId: string): Promise<Document[]> => {
        const res = await api.get(`/documents/project/${projectId}`);
        return res.data;
    },

    // (opcional) criar documento manualmente:
    create: async (projectId: string, type: 'PROPOSAL' | 'CONTRACT' | 'RECEIPT') => {
        const res = await api.post('/documents/generate', { projectId, type });
        return res.data;
    },
};
