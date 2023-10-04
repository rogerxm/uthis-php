import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const HomeAdmin = ({ setRegistros }) => {
    const [correo, setCorreo] = useState("");
    const [password, setPassword] = useState("");
    const [token, setToken] = useState("");

    const navigate = useNavigate();

    const handleSubmitLogin = (e) => {
        e.preventDefault();

        // console.log({ email: correo, password });

        fetch("http://127.0.0.1:8000/api/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email: correo, password }),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Error de red al hacer la solicitud POST");
                }
                return response.json();
            })
            .then((responseData) => {
                console.log("Respuesta de la solicitud TOKEN:", responseData);

                fetch("http://127.0.0.1:8000/api/registros", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Accept: "application/json",
                        Authorization: `Bearer ${responseData.token}`,
                    },
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
                            "Respuesta de la solicitud REGISTROS:",
                            responseData
                        );

                        setRegistros(responseData);
                        navigate("/registros");
                    })
                    .catch((error) => {});
            })
            .catch((error) => {
                alert("Credenciales incorrectas");
            });
    };

    const handleCorreo = (e) => {
        setCorreo(e.target.value);
    };

    const handlePassword = (e) => {
        setPassword(e.target.value);
    };

    return (
        <div className="border rounded-lg m-20 p-10 w-6/12 mx-auto">
            <h1 className="font-semibold text-4xl text-center">
                Bienvenido a Uthis - Administradores
            </h1>
            <form className="flex flex-col" onSubmit={handleSubmitLogin}>
                <div className="flex flex-col text-center mt-5 gap-3">
                    <label className="text-2xl">Correo</label>
                    <input
                        type="email"
                        placeholder="Correo"
                        value={correo}
                        onChange={handleCorreo}
                        className="border rounded-lg p-2 w-6/12 mx-auto text-center"
                        required
                    />
                </div>
                <div className="flex flex-col text-center mt-5 gap-3">
                    <label className="text-2xl">Contraseña</label>
                    <input
                        type="password"
                        placeholder="Contraseña"
                        value={password}
                        onChange={handlePassword}
                        className="border rounded-lg p-2 w-6/12 mx-auto text-center"
                        required
                    />
                </div>
                <button className="mt-5 border disabled:bg-slate-500 disabled:cursor-not-allowed rounded-lg p-2 w-3/12 mx-auto text-center bg-orange-500 hover:bg-orange-600 text-white">
                    Ingresar
                </button>
            </form>
        </div>
    );
};
