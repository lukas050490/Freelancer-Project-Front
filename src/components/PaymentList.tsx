import type { Payment } from '../types/Payment';

type Props = {
    payments: Payment[];
    onDelete: (id: string) => void;
};

export function PaymentList({ payments, onDelete }: Props) {
    return (
        <div className="bg-white p-4 rounded shadow">
            <h2 className="text-xl font-semibold mb-4">Pagamentos</h2>
            {payments.length === 0 && <p>Nenhum pagamento registrado.</p>}
            <ul>
                {payments.map((payment) => (
                    <li key={payment.id} className="border-b py-2 flex justify-between items-center">
                        <div>
                            <strong>R$ {payment.amount.toFixed(2)}</strong> – {payment.type} –{' '}
                            <span className={payment.status === 'PAID' ? 'text-green-600' : 'text-yellow-600'}>
                                {payment.status === 'PAID' ? 'Pago' : 'Pendente'}
                            </span>
                            <br />
                            Criado em: {new Date(payment.createdAt).toLocaleDateString('pt-BR')}
                        </div>
                        <button
                            onClick={() => onDelete(payment.id)}
                            className="text-red-500 hover:underline"
                        >
                            Remover
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}
