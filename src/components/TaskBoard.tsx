import type { Task, TaskStatus } from '../types/Types';

type Props = {
    tasks: Task[];
    onMove: (id: string, status: TaskStatus) => void;
    onDelete: (id: string) => void;
};

const statuses: TaskStatus[] = ['TODO', 'DOING', 'DONE'];
const statusLabels = {
    TODO: 'A Fazer',
    DOING: 'Em Progresso',
    DONE: 'Concluído',
};

export function TaskBoard({ tasks, onMove, onDelete }: Props) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {statuses.map((status) => (
                <div key={status} className="bg-gray-100 p-4 rounded shadow">
                    <h3 className="text-xl font-bold mb-4">{statusLabels[status]}</h3>
                    {tasks.filter((t) => t.status === status).map((task) => (
                        <div key={task.id} className="bg-white p-3 mb-3 rounded shadow">
                            <h4 className="font-semibold">{task.title}</h4>
                            <p className="text-sm mb-2">{task.description}</p>
                            <div className="flex justify-between text-sm">
                                <div className="flex gap-1">
                                    {statuses.map(
                                        (s) =>
                                            s !== status && (
                                                <button
                                                    key={s}
                                                    onClick={() => onMove(task.id, s)}
                                                    className="text-blue-500 hover:underline"
                                                >
                                                    Mover para {statusLabels[s]}
                                                </button>
                                            )
                                    )}
                                </div>
                                <button onClick={() => onDelete(task.id)} className="text-red-500 hover:underline">
                                    Remover
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
}
