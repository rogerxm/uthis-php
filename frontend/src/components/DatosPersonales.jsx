import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const DatosPersonales = ({
    dataCliente,
    rfc,
    setRfc,
    setDataDomicilio,
}) => {
    const [estatus, setEstatus] = useState("OFERTA ACEPTADA");
    const [nuevoRegistro, setNuevoRegistro] = useState("");
    const { datos_personales } = dataCliente;
    const navigate = useNavigate();
    // console.log(datos_personales);

    useEffect(() => {
        fetch(
            `http://127.0.0.1:8000/api/estatus/actualizar/${datos_personales.rfc}`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    estatus: "PRE-REGISTRO",
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

    const handleMostrarDomicilio = () => {
        fetch(`http://127.0.0.1:8000/api/domicilio/${datos_personales.rfc}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ rfc: datos_personales.rfc }),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Error de red al hacer la solicitud POST");
                }
                return response.json();
            })
            .then((responseData) => {
                // console.log("DOMICILIO DESDE LA DB:", responseData);
                setDataDomicilio(responseData);
                navigate(`/${rfc}/domicilio`);
            })
            .catch((error) => {
                console.error("Error al hacer la solicitud POST:", error);
            });
    };

    const handleLogout = () => {
        setRfc("");
        navigate("/");
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
                        Aquí está tu información
                    </h1>
                    <div className="mt-10 text-xl">
                        <p>Nombre: {datos_personales.nombre}</p>
                        <p>
                            Apellido Paterno:{" "}
                            {datos_personales.apellido_paterno}
                        </p>
                        <p>
                            Apellido Materno:{" "}
                            {datos_personales.apellido_materno}
                        </p>
                        <p>RFC: {datos_personales.rfc}</p>
                        <p>
                            Fecha de nacimiento:{" "}
                            {datos_personales.fecha_nacimiento}
                        </p>
                        <p>Ingresos: {datos_personales.ingresos}</p>
                        <p>Egresos: {datos_personales.egresos}</p>
                        <p>
                            Número de dependientes:{" "}
                            {datos_personales.no_dependientes}
                        </p>
                        <p>Género: {datos_personales.genero}</p>
                        <p>
                            Último grado de estudios:{" "}
                            {datos_personales.ultimo_grado_estudios}
                        </p>
                    </div>
                    <button
                        onClick={handleMostrarDomicilio}
                        className="mt-5 p-2 px-5 border rounded-lg bg-orange-500 hover:bg-orange-600 text-white"
                    >
                        Continuar
                    </button>{" "}
                </>
            )}
        </div>
    );
};
