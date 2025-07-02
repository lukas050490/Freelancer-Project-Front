import { useEffect, useState } from 'react';
import type { Payment } from '../types/Payment';
import type { Project } from '../types/Project';
import { paymentService } from '../services/paymentService';
import { projectService } from '../services/projectService';
import { PaymentForm } from '../components/PaymentForm';
import { PaymentList } from '../components/PaymentList';

export function Payments() {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);

  const load = async () => {
    const [paymentData, projectData] = await Promise.all([
      paymentService.getAll(),
      projectService.getAll(),
    ]);
    setPayments(paymentData);
    setProjects(projectData);
  };

  const handleCreate = async (data: Omit<Payment, 'id' | 'createdAt'>) => {
    await paymentService.create(data);
    await load();
  };

  const handleDelete = async (id: string) => {
    if (confirm('Deseja remover este pagamento?')) {
      await paymentService.delete(id);
      await load();
    }
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Gerenciar Pagamentos</h1>
      <PaymentForm onCreate={handleCreate} projects={projects} />
      <PaymentList payments={payments} onDelete={handleDelete}></PaymentList>
    </div>
  );
}
