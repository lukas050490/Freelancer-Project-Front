export type DocumentType = 'PROPOSAL' | 'CONTRACT' | 'RECEIPT';

export type Document = {
    id: string;
    projectId: string;
    type: DocumentType;
    fileUrl: string; // aqui está vindo o conteúdo como texto, que futuramente pode ser URL de PDF
    generatedByAI: boolean;
    createdAt: string;
    updatedAt: string;
};
