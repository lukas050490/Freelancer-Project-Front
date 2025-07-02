import { Link } from 'react-router-dom';

export function Home() {
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
            <h1 className="text-4xl font-bold mb-4">Freelancer Manager</h1>
            <p className="text-lg mb-8">Organize seus projetos, clientes e tarefas de forma simples e eficiente.</p>

            <div className="flex gap-4">
                <Link
                    to="/login"
                    className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 transition"
                >
                    Login
                </Link>
                <Link
                    to="/register"
                    className="bg-gray-300 text-gray-700 px-6 py-2 rounded hover:bg-gray-400 transition"
                >
                    Registrar
                </Link>
            </div>
        </div>
    );
}
