import type { Client } from "../types/Client";

type Props = {
    clients: Client[];
    onEdit: (client: Client) => void;
    onDelete: (id: string) => void;
};

export function ClientList({ clients, onEdit, onDelete }: Props) {
    return (
        <div className="bg-white p-4 rounded shadow">
            <h2 className="text-xl font-semibold mb-4">Clientes</h2>
            {clients.length === 0 && <p>Nenhum cliente cadastrado.</p>}
            <ul>
                {clients.map((client) => (
                    <li key={client.id} className="border-b py-2 flex justify-between items-center">
                        <div>
                            <strong>{client.name}</strong> – {client.email} – {client.phone}
                        </div>
                        <div className="flex gap-2">
                            <button
                                onClick={() => onEdit(client)}
                                className="text-blue-500 hover:underline"
                            >
                                Editar
                            </button>
                            <button
                                onClick={() => onDelete(client.id)}
                                className="text-red-500 hover:underline"
                            >
                                Remover
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}
