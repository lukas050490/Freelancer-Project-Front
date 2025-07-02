import { useEffect, useState } from 'react';
import { clientService } from '../services/clientService';
import { ClientForm } from '../components/ClientForm';
import { ClientList } from '../components/ClientList';
import type { Client } from '../types/Client';

export function Clients() {
    const [clients, setClients] = useState<Client[]>([]);
    const [editing, setEditing] = useState<Client | null>(null);

    const loadClients = async () => {
        const data = await clientService.getAll();
        setClients(data);
    };

    const handleCreate = async (data: Omit<Client, 'id'>) => {
        await clientService.create(data);
        await loadClients();
    };

    const handleUpdate = async (data: Omit<Client, 'id'>) => {
        if (editing) {
            await clientService.update(editing.id, { ...data });
            setEditing(null);
            await loadClients();
        }
    };

    const handleDelete = async (id: string) => {
        if (confirm('Deseja realmente remover este cliente?')) {
            await clientService.delete(id);
            await loadClients();
        }
    };

    useEffect(() => {
        loadClients();
    }, []);

    return (
        <div className="p-8">
            <h1 className="text-3xl font-bold mb-4">Gerenciar Clientes</h1>

            <ClientForm
                onSave={editing ? handleUpdate : handleCreate}
                initialData={editing ? { ...editing } : undefined}
                onCancel={() => setEditing(null)}
            />

            <ClientList clients={clients} onEdit={setEditing} onDelete={handleDelete} />
        </div>
    );
}
