import { useEffect, useState } from 'react';
import type { Client } from '../types/Client';
import type { Project } from '../types/Project';

type Props = {
    clients: Client[];
    onSave: (data: Omit<Project, 'id' | 'client'>) => void;
    initialData?: Project;
    onCancel?: () => void;
};

export function ProjectForm({ clients, onSave, initialData, onCancel }: Props) {
    const [form, setForm] = useState({
        title: '',
        description: '',
        value: '',
        deadline: '',
        clientId: '',
    });

    useEffect(() => {
        if (initialData) {
            setForm({
                title: initialData.title,
                description: initialData.description,
                value: initialData.value.toString(),
                deadline: initialData.deadline.slice(0, 10),
                clientId: initialData.clientId,
            });
        }
    }, [initialData]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave({
            ...form,
            value: parseFloat(form.value),
        });
        setForm({
            title: '',
            description: '',
            value: '',
            deadline: '',
            clientId: '',
        });
    };

    return (
        <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow mb-4">
            <h2 className="text-xl font-semibold mb-2">
                {initialData ? 'Editar Projeto' : 'Novo Projeto'}
            </h2>

            <input name="title" placeholder="Título" value={form.title} onChange={handleChange} required
                className="border p-2 rounded w-full mb-2" />
            <textarea name="description" placeholder="Descrição" value={form.description} onChange={handleChange} required
                className="border p-2 rounded w-full mb-2" />
            <input name="value" type="number" placeholder="Valor" value={form.value} onChange={handleChange} required
                className="border p-2 rounded w-full mb-2" />
            <input name="deadline" type="date" value={form.deadline} onChange={handleChange} required
                className="border p-2 rounded w-full mb-2" />

            <select name="clientId" value={form.clientId} onChange={handleChange} required className="border p-2 rounded w-full mb-2">
                <option value="">Selecione um cliente</option>
                {clients.map((client) => (
                    <option key={client.id} value={client.id}>
                        {client.name}
                    </option>
                ))}
            </select>

            <div className="flex gap-2">
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Salvar</button>
                {onCancel && (
                    <button type="button" onClick={onCancel} className="text-red-500">
                        Cancelar
                    </button>
                )}
            </div>
        </form>
    );
}
