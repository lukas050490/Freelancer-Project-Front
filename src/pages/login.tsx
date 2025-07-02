import { useState } from 'react';
import { useAuth } from '../contexts/auth';
import { api } from '../services/api';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import BackgroundLogin from '../assets/background-1.jpg';

export function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { setToken } = useAuth();
    const navigate = useNavigate();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await api.post('/auth/login', { email, password });
            setToken(response.data.token);
            navigate('/dashboard');
        } catch {
            alert('Erro ao fazer login');
        }
    };

    return (
        <div
            className="flex items-center justify-center h-screen"
            style={{
                backgroundImage: `url(${BackgroundLogin})`,
            }}
        >
            <form
                onSubmit={handleLogin}
                className="flex flex-col gap-6 bg-white p-12 rounded-xl shadow-lg w-full max-w-md"
            >
                <h1 className="text-3xl font-bold text-center mb-4">Login</h1>
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
                    Entrar
                </button>
                <p className="text-center text-gray-600 mt-2">
                    Não tem conta?{' '}
                    <Link to="/register" className="text-blue-600 hover:underline font-semibold">
                        Cadastre aqui
                    </Link>
                </p>
            </form>
        </div>
    );
}
