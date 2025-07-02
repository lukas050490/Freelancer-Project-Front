import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { projectService } from '../services/projectService';
import { clientService } from '../services/clientService';
import type { Project } from '../types/Project';
import type { Client } from '../types/Client';
import { ProjectForm } from '../components/ProjectForm';
import { DocumentButton } from '../components/DocumentButton';

export function Projects() {
    const [projects, setProjects] = useState<Project[]>([]);
    const [clients, setClients] = useState<Client[]>([]);
    const [editing, setEditing] = useState<Project | null>(null);

    const navigate = useNavigate();

    const load = async () => {
        const [projectData, clientData] = await Promise.all([
            projectService.getAll(),
            clientService.getAll(),
        ]);
        setProjects(projectData);
        setClients(clientData);
    };

    const handleCreate = async (data: Omit<Project, 'id' | 'client'>) => {
        await projectService.create(data);
        await load();
    };

    const handleUpdate = async (data: Omit<Project, 'id' | 'client'>) => {
        if (editing) {
            await projectService.update(editing.id, data);
            setEditing(null);
            await load();
        }
    };

    const handleDelete = async (id: string) => {
        if (confirm('Deseja remover este projeto?')) {
            await projectService.delete(id);
            await load();
        }
    };

    useEffect(() => {
        load();
    }, []);

    return (
        <div className="p-8">
            <h1 className="text-3xl font-bold mb-4">Projetos</h1>

            <ProjectForm
                clients={clients}
                onSave={editing ? handleUpdate : handleCreate}
                initialData={editing || undefined}
                onCancel={() => setEditing(null)}
            />

            <div className="grid gap-4 mt-6">
                {projects.map((project) => (
                    <div key={project.id} className="border p-4 rounded bg-white shadow">
                        <h3 className="text-lg font-semibold">{project.title}</h3>
                        <p className="text-sm text-gray-700">{project.description}</p>

                        <div className="mt-2 flex gap-2">
                            <button
                                onClick={() => setEditing(project)}
                                className="bg-yellow-500 text-white px-3 py-1 rounded"
                            >
                                Editar
                            </button>
                            <button
                                onClick={() => handleDelete(project.id)}
                                className="bg-red-500 text-white px-3 py-1 rounded"
                            >
                                Excluir
                            </button>
                            <button onClick={() => navigate(`/projects/${project.id}`)} className="bg-blue-600 text-white px-3 py-1 rounded">
                                Ver detalhes
                            </button>
                        </div>

                        {/* Botão para gerar documento com IA */}
                        <div className="mt-4">
                            <DocumentButton projectId={project.id} />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
