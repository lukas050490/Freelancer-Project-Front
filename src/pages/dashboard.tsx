import BackgroundHome from "../assets/background-2.jpg";
export function Dashboard() {


    return (
        <div
            className="min-h-screen w-full bg-cover bg-center flex flex-col"
            style={{
                backgroundImage: `url(${BackgroundHome})`,
            }}
        >
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-blue-500 text-center pt-8 drop-shadow-lg">
                Dashboard
            </h1>
            <div className="flex-1 flex items-center justify-center">
                <p className="text-lg sm:text-2xl md:text-3xl text-blue-500 text-center font-semibold drop-shadow-lg max-w-2xl px-4">
                    Bem-vindo ao seu gerenciador, ele vai te ajudar a ter um controle melhor do seu trabalho!
                </p>
            </div>
        </div>
    );

}
