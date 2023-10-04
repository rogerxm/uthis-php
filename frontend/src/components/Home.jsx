import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ModalError } from "./ModalError";

export const Home = ({ rfc, setRfc, dataCliente, setDataCliente }) => {
    const [buttonDisabled, setButtonDisabled] = useState(false);
    const [modalError, setModalError] = useState(false);
    const navigate = useNavigate();

    const apiLogin =
        "https://sitiowebdesarrollo.centralus.cloudapp.azure.com/api/login";
    const apiRfc =
        "https://sitiowebdesarrollo.centralus.cloudapp.azure.com/api/datosRenovacion";

    const dataLogin = {
        email: "rogerxmontes@gmail.com",
        password: "Roger.2023Test",
    };

    const dataRfc = {
        rfc,
    };

    const handleSubmitRfc = (e) => {
        e.preventDefault();

        setButtonDisabled((e) => !e);
        fetch(apiLogin, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(dataLogin),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Error de red al hacer la solicitud POST");
                }
                return response.json();
            })
            .then((responseData) => {
                // console.log("Respuesta de la solicitud POST:", responseData);
                // setToken(responseData.token);
                fetch(apiRfc, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${responseData.token}`,
                    },
                    body: JSON.stringify(dataRfc),
                })
                    .then((response) => {
                        if (!response.ok) {
                            throw new Error(
                                "Error de red al hacer la solicitud POST"
                            );
                        }
                        return response.json();
                    })
                    .then((responseData) => {
                        // console.log(
                        //     "Respuesta de la solicitud POST:",
                        //     responseData.datos
                        // );

                        setDataCliente(responseData.datos);
                        navigate(`/${rfc}/datos`);

                        fetch("http://127.0.0.1:8000/api/guardarRegistro", {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify(responseData.datos),
                        })
                            .then((response) => {
                                if (!response.ok) {
                                    throw new Error(
                                        "Error de red al hacer la solicitud POST"
                                    );
                                }
                                return response.json();
                            })
                            .then((responseData) => {
                                console.log(
                                    "Respuesta de la solicitud POST:",
                                    responseData
                                );
                            })
                            .catch((error) => {});
                    })
                    .catch((error) => {
                        // console.error(
                        //     "Error al hacer la solicitud POST:",
                        //     error
                        // );
                        setModalError((e) => !e);
                        setButtonDisabled((e) => !e);
                    });
            })

            .catch((error) => {
                console.error("Error al hacer la solicitud POST:", error);
            });
    };

    const handleInput = (e) => {
        setRfc(e.target.value);
        // console.log(rfc);
    };

    return (
        <>
            {!modalError ? (
                <div className="border rounded-lg m-20 p-10 w-6/12 mx-auto">
                    <h1 className="font-semibold text-4xl text-center">
                        Bienvenido a Uthis
                    </h1>
                    <form
                        onSubmit={handleSubmitRfc}
                        className="flex flex-col justify-center text-center mt-10 gap-5"
                    >
                        <label className="text-2xl">Ingresa tu RFC</label>
                        <input
                            type="text"
                            placeholder="RFC"
                            className="border rounded-lg p-2 w-6/12 mx-auto text-center"
                            value={rfc}
                            onChange={handleInput}
                            required
                        />
                        <button
                            disabled={buttonDisabled}
                            className="border disabled:bg-slate-500 disabled:cursor-not-allowed rounded-lg p-2 w-4/12 mx-auto text-center bg-orange-500 hover:bg-orange-600 text-white"
                        >
                            Continuar
                        </button>
                    </form>
                </div>
            ) : (
                <ModalError setModalError={setModalError} />
            )}
        </>
    );
};
