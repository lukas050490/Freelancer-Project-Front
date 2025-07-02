export type Task = {
    id: string;
    title: string;
    status: 'TODO' | 'DOING' | 'DONE';
    completed: boolean;
    projectId: string;
    createdAt: string;
    updatedAt: string;
};
