import { useState, useEffect } from 'react';
import type { Client } from '../types/Client';

type Props = {
    onSave: (data: Omit<Client, 'id'>) => void;
    initialData?: Omit<Client, 'id'> | Client;
    onCancel?: () => void;
};

export function ClientForm({ onSave, initialData, onCancel }: Props) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');

    useEffect(() => {
        if (initialData) {
            setName(initialData.name);
            setEmail(initialData.email);
            setPhone(initialData.phone);
        }
    }, [initialData]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave({
            name,
            email,
            phone
        });
        setName('');
        setEmail('');
        setPhone('');
    };

    return (
        <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow mb-4">
            <h2 className="text-xl font-semibold mb-2">
                {initialData ? 'Editar Cliente' : 'Novo Cliente'}
            </h2>
            <input
                type="text"
                placeholder="Nome"
                className="border p-2 rounded w-full mb-2"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
            />
            <input
                type="email"
                placeholder="Email"
                className="border p-2 rounded w-full mb-2"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
            />
            <input
                type="text"
                placeholder="Telefone"
                className="border p-2 rounded w-full mb-2"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
            />
            <div className="flex gap-2">
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
                    Salvar
                </button>
                {onCancel && (
                    <button type="button" onClick={onCancel} className="text-red-500">
                        Cancelar
                    </button>
                )}
            </div>
        </form>
    );
}
