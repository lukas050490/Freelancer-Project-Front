import type { Project } from '../types/Project';

type Props = {
    projects: Project[];
    onEdit: (project: Project) => void;
    onDelete: (id: string) => void;
};

export function ProjectList({ projects, onEdit, onDelete }: Props) {
    return (
        <div className="bg-white p-4 rounded shadow">
            <h2 className="text-xl font-semibold mb-4">Projetos</h2>
            {projects.length === 0 && <p>Nenhum projeto cadastrado.</p>}
            <ul>
                {projects.map((project) => (
                    <li key={project.id} className="border-b py-2">
                        <div className="flex justify-between items-center">
                            <div>
                                <strong>{project.title}</strong> – {project.client?.name} – R$ {project.value.toFixed(2)} <br />
                                Entrega até: {new Date(project.deadline).toLocaleDateString('pt-BR')}
                            </div>
                            <div className="flex gap-2">
                                <button onClick={() => onEdit(project)} className="text-blue-500 hover:underline">Editar</button>
                                <button onClick={() => onDelete(project.id)} className="text-red-500 hover:underline">Remover</button>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}
