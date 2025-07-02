import { useState } from 'react';
import type { Project } from '../types/Project';
import type { PaymentType, PaymentStatus } from '../types/Payment';

type Props = {
    onCreate: (data: {
        amount: number;
        type: PaymentType;
        status: PaymentStatus;
        projectId: string;
    }) => void;
    projects: Project[];
};

export function PaymentForm({ onCreate, projects }: Props) {

    const [form, setForm] = useState({
        amount: '',
        type: 'PROPOSAL' as PaymentType,
        status: 'PENDING' as PaymentStatus,
        projectId: '',
        dueDate: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!form.projectId) return alert('Selecione um projeto');

        onCreate({
            ...form,
            amount: parseFloat(form.amount),
        });
        setForm({ amount: '', dueDate: '', type: 'PROPOSAL', status: 'PENDING', projectId: '' });
    };

    return (
        <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow mb-4 flex flex-col gap-2">
            <h2 className="text-xl font-bold">Novo Pagamento</h2>
            <input
                name="amount"
                type="number"
                placeholder="Valor"
                value={form.amount}
                onChange={handleChange}
                className="border p-2 rounded"
                required
            />
            <input
                name="dueDate"
                type="date"
                placeholder="Data de vencimento"
                value={form.dueDate || ''}
                onChange={handleChange}
                className="border p-2 rounded"
                required
            />
            <select name="type" value={form.type} onChange={handleChange} className="border p-2 rounded">
                <option value="PROPOSAL">Proposta</option>
                <option value="CONTRACT">Contrato</option>
                <option value="RECEIPT">Recibo</option>
            </select>
            <select name="status" value={form.status} onChange={handleChange} className="border p-2 rounded">
                <option value="PENDING">Pendente</option>
                <option value="PAID">Pago</option>
            </select>
            <select
                name="projectId"
                value={form.projectId}
                onChange={handleChange}
                className="border p-2 rounded"
                required
            >
                <option value="">Selecione o projeto</option>
                {projects.map((p) => (
                    <option key={p.id} value={p.id}>
                        {p.title}
                    </option>
                ))}
            </select>
            <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">Salvar</button>
        </form>
    );
}
