import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const DatosCredito = ({ dataCliente, dataCredito, setRfc }) => {
    const [estatus, setEstatus] = useState("");
    const [nuevoRegistro, setNuevoRegistro] = useState("");
    const navigate = useNavigate();

    const { datos_personales } = dataCliente;

    useEffect(() => {
        fetch(
            `http://127.0.0.1:8000/api/estatus/actualizar/${datos_personales.rfc}`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    estatus: "REGISTRO",
                }),
            }
        )
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Error de red al hacer la solicitud POST");
                }
                return response.json();
            })
            .then((responseData) => {
                // console.log("Respuesta de la solicitud POST:", responseData);
            })
            .catch((error) => {});
    }, []);

    useEffect(() => {
        fetch(`http://127.0.0.1:8000/api/estatus/${datos_personales.rfc}`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Error de red al hacer la solicitud POST");
                }
                return response.json();
            })
            .then((responseData) => {
                // console.log("Respuesta de la solicitud POST:", responseData);
                setEstatus(responseData.estatus);
                setNuevoRegistro(responseData.nuevoRegistro);
            })
            .catch((error) => {});
    }, []);

    const handleLogout = () => {
        setRfc("");
        navigate("/");
    };

    const handleAceptarOferta = () => {
        // Primera solicitud para actualizar el estatus
        const actualizarEstatusPromise = fetch(
            `http://127.0.0.1:8000/api/estatus/actualizar/${datos_personales.rfc}`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    estatus: "OFERTA ACEPTADA",
                }),
            }
        )
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Error de red al hacer la solicitud POST");
                }
                return response.json();
            })
            .catch((error) => {
                console.error(
                    "Error en la solicitud de actualizar estatus:",
                    error
                );
                throw error;
            });

        // Segunda solicitud para enviar el correo
        const enviarCorreoPromise = fetch(
            `http://127.0.0.1:8000/api/credito/${datos_personales.rfc}/mail`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    rfc: datos_personales.rfc,
                }),
            }
        )
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Error de red al hacer la solicitud");
                }
                return response.json();
            })
            .catch((error) => {
                console.error("Error en la solicitud de enviar correo:", error);
                throw error;
            });

        Promise.all([actualizarEstatusPromise, enviarCorreoPromise])
            .then(([estatusResponse, correoResponse]) => {})
            .catch((error) => {
                console.error("Error en una de las solicitudes:", error);
            });

        setTimeout(() => {
            navigate("/termino");
        }, 4000);
    };

    const handleRechazarOferta = () => {
        fetch(
            `http://127.0.0.1:8000/api/estatus/actualizar/${datos_personales.rfc}`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    estatus: "OFERTA RECHAZADA",
                }),
            }
        )
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Error de red al hacer la solicitud POST");
                }
                return response.json();
            })
            .then((responseData) => {
                // console.log("Respuesta de la solicitud POST:", responseData);
                navigate("/termino");
            })
            .catch((error) => {});
    };

    return (
        <div className="border rounded-lg m-20 p-10 w-8/12 mx-auto">
            {estatus === "OFERTA RECHAZADA" || estatus === "OFERTA ACEPTADA" ? (
                <>
                    <h1 className="font-semibold text-4xl text-center">
                        Tu estatus es:{" "}
                        <span className="text-red-600">{estatus}</span>. Podrás
                        registrarte nuevamente el {nuevoRegistro}
                    </h1>
                    <button
                        onClick={handleLogout}
                        className="mt-5 p-2 px-5 border rounded-lg bg-orange-500 hover:bg-orange-600 text-white"
                    >
                        Salir
                    </button>
                </>
            ) : (
                <>
                    <h1 className="font-semibold text-4xl text-center">
                        Oferta de crédito
                    </h1>
                    <div className="mt-10 text-xl">
                        <p>Monto: ${dataCredito.monto}</p>
                        <p>Pago mensual: ${dataCredito.pago_mensual}</p>
                        <p>Plazo: {dataCredito.plazo}</p>
                        <p>Interés: {dataCredito.tasa_interes}</p>
                    </div>
                    <div className="flex gap-5">
                        <button
                            onClick={handleAceptarOferta}
                            className="mt-5 p-2 px-5 border rounded-lg bg-orange-500 hover:bg-orange-600 text-white"
                        >
                            Aceptar oferta
                        </button>
                        <button
                            onClick={handleRechazarOferta}
                            className="mt-5 p-2 px-5 border rounded-lg bg-slate-700 hover:bg-slate-800 text-white"
                        >
                            Rechazar
                        </button>
                        <button
                            onClick={handleLogout}
                            className="mt-5 p-2 px-5 border rounded-lg bg-slate-100 hover:bg-slate-200 text-black"
                        >
                            Salir
                        </button>
                    </div>{" "}
                </>
            )}
        </div>
    );
};
