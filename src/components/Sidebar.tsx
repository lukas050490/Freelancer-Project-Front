import { Link, useLocation } from 'react-router-dom';

export function Sidebar() {
    const location = useLocation();

    const links = [
        { to: '/dashboard', label: 'Dashboard' },
        { to: '/clients', label: 'Clientes' },
        { to: '/projects', label: 'Projetos' },
        { to: '/tasks', label: 'Tarefas' },
        { to: '/payments', label: 'Pagamentos' },
    ];

    return (
        <aside
            className="
                fixed
                bottom-0 left-0 right-0
                sm:static sm:left-0 sm:top-0
                z-20
                w-full sm:w-60
                h-20 sm:h-auto
                flex sm:flex-col items-center sm:items-stretch
                bg-gradient-to-b from-black via-blue-600 to-white
                sm:min-h-screen
                shadow-lg
            "
        >
            <nav className="flex flex-1 flex-row sm:flex-col items-center justify-center gap-2 sm:gap-8 w-full overflow-x-auto sm:overflow-visible px-2 sm:px-0">
                {links.map((link) => (
                    <Link
                        key={link.to}
                        to={link.to}
                        className={`min-w-[90px] sm:w-4/5 text-center p-2 sm:p-3 rounded transition-all duration-200 font-medium text-white ${location.pathname === link.to
                                ? 'bg-blue-700 shadow-lg'
                                : 'hover:bg-blue-600 hover:text-white'
                            }`}
                    >
                        {link.label}
                    </Link>
                ))}
            </nav>
            <div className="hidden sm:flex justify-center mb-8">
                <button
                    className="text-red-400 hover:text-red-600 font-semibold"
                    onClick={() => {
                        localStorage.removeItem('token');
                        window.location.href = '/login';
                    }}
                >
                    Sair
                </button>
            </div>
            {/* Botão sair visível no mobile, fixo à direita */}
            <button
                className="block sm:hidden absolute right-4 bottom-4 text-red-400 bg-white/80 px-3 py-1 rounded font-semibold shadow hover:text-red-600"
                onClick={() => {
                    localStorage.removeItem('token');
                    window.location.href = '/login';
                }}
            >
                Sair
            </button>
        </aside>
    );
}