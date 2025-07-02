import { useState } from 'react';
import axios from 'axios';

type Props = {
    projectId: string;
};

export function DocumentButton({ projectId }: Props) {
    const [loading, setLoading] = useState(false);
    const [content, setContent] = useState('');
    const [type, setType] = useState<'PROPOSAL' | 'CONTRACT' | 'RECEIPT'>('PROPOSAL');

    const handleGenerate = async () => {
        setLoading(true);
        try {
            const token = localStorage.getItem('token');
            const res = await axios.post('http://localhost:3000/api/documents/generate', {
                projectId,
                type,
            },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            setContent(res.data.content);
        } catch {
            alert('Erro ao gerar documento.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="my-4 p-4 border rounded bg-white">
            <h3 className="font-semibold mb-2">Gerar Documento com IA</h3>
            <select
                value={type}
                onChange={(e) => setType(e.target.value as 'PROPOSAL' | 'CONTRACT' | 'RECEIPT')}
                className="border p-2 rounded mr-2"
            >
                <option value="PROPOSAL">Proposta</option>
                <option value="CONTRACT">Contrato</option>
                <option value="RECEIPT">Recibo</option>
            </select>
            <button onClick={handleGenerate} className="bg-blue-500 text-white px-4 py-2 rounded">
                {loading ? 'Gerando...' : 'Gerar'}
            </button>

            {content && (
                <div className="mt-4 whitespace-pre-wrap border-t pt-4 text-sm">
                    <h4 className="font-semibold mb-2">Documento Gerado:</h4>
                    {content}
                </div>
            )}
        </div>
    );
}
