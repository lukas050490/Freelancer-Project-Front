import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import type { Project } from '../types/Project';
import type { Task } from '../types/Task';
import type { Payment } from '../types/Payment';
import type { Document } from '../types/Document';
import { projectService } from '../services/projectService';
import { taskService } from '../services/taskService';
import { paymentService } from '../services/paymentService';
import { documentService } from '../services/documentService';
import { DocumentButton } from '../components/DocumentButton';
import { jsPDF } from 'jspdf';

export function ProjectDetails() {
    const { id } = useParams();
    const [project, setProject] = useState<Project | null>(null);
    const [tasks, setTasks] = useState<Task[]>([]);
    const [payments, setPayments] = useState<Payment[]>([]);
    const [documents, setDocuments] = useState<Document[]>([]);

    const exportToPdf = (content: string, filename = 'documento.pdf') => {
        const doc = new jsPDF();
        const lines = doc.splitTextToSize(content, 180);
        doc.text(lines, 10, 10);
        doc.save(filename);
    };

    const load = async () => {
        if (!id) return;

        const [proj, taskList, paymentList, docList] = await Promise.all([
            projectService.getById(id),
            taskService.getByProject(id),
            paymentService.getByProject(id),
            documentService.getByProject(id),
        ]);

        setProject(proj);
        setTasks(taskList);
        setPayments(paymentList);
        setDocuments(docList);
    };

    useEffect(() => {
        load();
    }, [id]);

    if (!project) return <div className="p-8">Carregando...</div>;

    return (
        <div className="p-8">
            <h1 className="text-3xl font-bold mb-4">Detalhes do Projeto</h1>

            <div className="bg-white p-4 rounded shadow mb-6">
                <h2 className="text-xl font-semibold">{project.title}</h2>
                <p>{project.description}</p>
                <p className="text-sm text-gray-600">
                    Cliente: <strong>{project.client?.name}</strong> • Prazo:{' '}
                    {new Date(project.deadline).toLocaleDateString('pt-BR')} • Valor: R${' '}
                    {project.value.toFixed(2)}
                </p>
            </div>

            <div className="mb-6">
                <DocumentButton projectId={project.id} />
            </div>

            <div className="mb-6">
                <h2 className="text-xl font-bold mb-2">Documentos Gerados</h2>
                <ul className="bg-white p-4 rounded shadow text-sm">
                    {documents.length === 0 && <p>Nenhum documento gerado ainda.</p>}
                    {documents.map((doc) => (
                        <li key={doc.id} className="border-b py-2">
                            <div className="flex justify-between items-center">
                                <div>
                                    <strong>{doc.type}</strong> –{' '}
                                    {new Date(doc.createdAt).toLocaleDateString('pt-BR')}
                                </div>
                                <button
                                    onClick={() => exportToPdf(doc.fileUrl, `${doc.type}-${doc.id}.pdf`)}
                                    className="bg-green-600 text-white text-xs px-3 py-1 rounded hover:bg-green-700"
                                >
                                    Baixar PDF
                                </button>
                            </div>
                            <pre className="mt-1 text-gray-700 whitespace-pre-wrap">{doc.fileUrl}</pre>
                        </li>
                    ))}
                </ul>
            </div>

            <div className="mb-6">
                <h2 className="text-xl font-bold mb-2">Tarefas</h2>
                <ul className="bg-white p-4 rounded shadow text-sm">
                    {tasks.length === 0 && <p>Nenhuma tarefa vinculada.</p>}
                    {tasks.map((task) => (
                        <li key={task.id} className="border-b py-1">
                            {task.title} –{' '}
                            <span className={task.completed ? 'text-green-600' : 'text-yellow-600'}>
                                {task.completed ? 'Concluída' : 'Pendente'}
                            </span>
                        </li>
                    ))}
                </ul>
            </div>

            <div>
                <h2 className="text-xl font-bold mb-2">Pagamentos</h2>
                <ul className="bg-white p-4 rounded shadow text-sm">
                    {payments.length === 0 && <p>Nenhum pagamento registrado.</p>}
                    {payments.map((pay) => (
                        <li key={pay.id} className="border-b py-1">
                            <strong>R${pay.amount.toFixed(2)}</strong> – {pay.type} –{' '}
                            <span className={pay.status === 'PAID' ? 'text-green-600' : 'text-yellow-600'}>
                                {pay.status === 'PAID' ? 'Pago' : 'Pendente'}
                            </span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
