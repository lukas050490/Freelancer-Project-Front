import { useState } from 'react';
import type { TaskStatus } from '../types/Types';
import type { Project } from '../types/Project';

type Props = {
    onCreate: (data: { title: string; description: string; projectId: string; status: TaskStatus }) => void;
    projects: Project[];
};

export function TaskForm({ onCreate, projects }: Props) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [projectId, setProjectId] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!projectId) return alert('Selecione um projeto');
        onCreate({ title, description, projectId, status: 'TODO' });
        setTitle('');
        setDescription('');
        setProjectId('');
    };


    return (
        <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow mb-4 flex flex-col gap-2">
            <h2 className="text-xl font-bold">Nova Tarefa</h2>
            <input
                type="text"
                placeholder="Título"
                className="border p-2 rounded"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
            />
            <textarea
                placeholder="Descrição"
                className="border p-2 rounded"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
            />
            <select
                value={projectId}
                onChange={(e) => setProjectId(e.target.value)}
                className="border p-2 rounded"
                required
            >
                <option value="">Selecione um projeto</option>
                {projects.map((p) => (
                    <option key={p.id} value={p.id}>
                        {p.title}
                    </option>
                ))}
            </select>
            <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">
                Criar
            </button>
        </form>
    );
}
