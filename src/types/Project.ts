import type { Client } from './Client';

export interface Project {
    id: string;
    title: string;
    description: string;
    value: number;
    deadline: string; // ISO string (ex: 2025-07-01T00:00:00Z)
    clientId: string;
    client?: Client;
}
