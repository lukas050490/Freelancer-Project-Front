import axios from 'axios';
import { useAuth } from '../contexts/auth';

// 🔗 Cria a instância do axios
export const api = axios.create({
    baseURL: 'http://localhost:3000/api', // Altere se necessário
});

// 🔐 Intercepta todas as requisições e insere o token automaticamente
api.interceptors.request.use((config) => {
    const token = useAuth.getState().token;
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

