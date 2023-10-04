import { useNavigate } from "react-router-dom";

export const SolicitudEnviada = ({ setRfc }) => {
    const navigate = useNavigate();
    const handleLogout = () => {
        setRfc("");
        navigate("/");
    };
    return (
        <div className="border rounded-lg m-20 p-10 w-8/12 mx-auto">
            <h1 className="font-semibold text-4xl text-center">
                Solicitud enviada correctamente.
            </h1>
            <button
                onClick={handleLogout}
                className="mt-5 p-2 px-5 border rounded-lg bg-orange-500 hover:bg-orange-600 text-white"
            >
                Salir
            </button>
        </div>
    );
};
