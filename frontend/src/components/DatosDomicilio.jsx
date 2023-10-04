import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FormActualizarDomicilio } from "./FormActualizarDomicilio";

export const DatosDomicilio = ({
    dataCliente,
    dataDomicilio,
    rfc,
    setDataCredito,
    setDataDomicilio,
}) => {
    const [isChecked, setIsChecked] = useState(true);
    const [estatus, setEstatus] = useState("");
    const [nuevoRegistro, setNuevoRegistro] = useState("");
    const { datos_personales } = dataCliente;

    const navigate = useNavigate();
    const handleCheckbox = (e) => {
        setIsChecked((e) => !e);
    };

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

    const handleMostrarCredito = () => {
        fetch(`http://127.0.0.1:8000/api/credito/${datos_personales.rfc}`, {
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
                setDataCredito(responseData);
                navigate(`/${rfc}/credito`);
            })
            .catch((error) => {
                console.error("Error al hacer la solicitud POST:", error);
            });
    };

    return (
        <div className="border rounded-lg m-20 p-10 w-8/12 mx-auto">
            <h1 className="font-semibold text-4xl text-center">
                Aquí está tu domicilio
            </h1>
            <div className="mt-10 text-xl">
                <p>Calle: {dataDomicilio.calle}</p>
                <p>Número exterior: {dataDomicilio.no_exterior}</p>
                <p>Número interior: {dataDomicilio.no_interior}</p>
                <p>Colonia: {dataDomicilio.colonia}</p>
                <p>Municipio: {dataDomicilio.municipio}</p>
                <p>Estado: {dataDomicilio.estado}</p>
                <p>CP: {dataDomicilio.cp}</p>
            </div>
            <div className="mt-5 flex gap-2">
                {estatus !== "REGISTRO" && (
                    <>
                        <label className="text-lg">
                            ¿El domicilio es el actual?
                        </label>
                        <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={handleCheckbox}
                        />
                    </>
                )}
            </div>
            {isChecked && (
                <button
                    onClick={handleMostrarCredito}
                    className="mt-5 p-2 px-5 border rounded-lg bg-orange-500 hover:bg-orange-600 text-white"
                >
                    Continuar
                </button>
            )}

            {!isChecked && (
                <FormActualizarDomicilio
                    dataCliente={dataCliente}
                    rfc={rfc}
                    dataDomicilio={dataDomicilio}
                    setIsChecked={setIsChecked}
                    setDataDomicilio={setDataDomicilio}
                />
            )}
        </div>
    );
};
