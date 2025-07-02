import { useState } from 'react';
import { api } from '../services/api';
import { useNavigate, Link } from 'react-router-dom';
import BackgroundLogin from '../assets/background-1.jpg';

export function Register() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await api.post('/auth/register', {
                name,
                email,
                password,
            });
            alert('Cadastro realizado com sucesso!');
            navigate('/login');
        } catch (error) {
            console.error(error);
            alert('Erro ao cadastrar. Verifique seus dados.');
        }
    };

    return (
        <div
            className="flex items-center justify-center h-screen"
            style={{ backgroundImage: `url(${BackgroundLogin})` }}
        >
            <form
                onSubmit={handleRegister}
                className="flex flex-col gap-6 bg-white p-12 rounded-xl shadow-lg w-full max-w-md"
            >
                <h1 className="text-3xl font-bold text-center mb-4">Registrar</h1>
                <input
                    type="text"
                    placeholder="Nome"
                    className="border p-3 rounded text-lg"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <input
                    type="email"
                    placeholder="Email"
                    className="border p-3 rounded text-lg"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Senha"
                    className="border p-3 rounded text-lg"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button className="bg-blue-500 text-white p-3 rounded text-lg font-semibold hover:bg-blue-600 transition">
                    Cadastrar
                </button>
                <p className="text-center text-gray-600 mt-2">
                    Já tem conta?{' '}
                    <Link to="/login" className="text-blue-600 hover:underline font-semibold">
                        Faça login
                    </Link>
                </p>
            </form>
        </div>
    );
}