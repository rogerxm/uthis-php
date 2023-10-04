import { useState } from "react";

export const FormActualizarDomicilio = ({
    dataCliente,
    rfc,
    setIsChecked,
    dataDomicilio,
    setDataDomicilio,
}) => {
    const [colonias, setColonias] = useState();
    const { datos_personales } = dataCliente;

    // valores para el form
    const [calle, setCalle] = useState("");
    const [no_exterior, setNo_exterior] = useState("");
    const [no_interior, setNo_interior] = useState("");
    const [cp, setCp] = useState("");
    const [colonia, setColonia] = useState("");
    const [municipio, setMunicipio] = useState("");
    const [estado, setEstado] = useState("");

    const apiLogin =
        "https://sitiowebdesarrollo.centralus.cloudapp.azure.com/api/login";

    const apiCp = `https://sitiowebdesarrollo.centralus.cloudapp.azure.com/api/codigo_postal/${cp}`;

    const handleCodigoPostal = () => {
        fetch(apiLogin, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: "rogerxmontes@gmail.com",
                password: "Roger.2023Test",
            }),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Error de red al hacer la solicitud POST");
                }
                return response.json();
            })
            .then((responseData) => {
                console.log("Respuesta de la solicitud POST:", responseData);
                // setToken(responseData.token);
                fetch(apiCp, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
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
                        console.log("COLONIAS:", responseData);
                        setColonias(
                            responseData.colonias.map((col) => col.colonia)
                        );
                        setMunicipio(responseData.delegacion_municipio);
                        setEstado(responseData.estado);
                    })
                    .catch((error) => {
                        console.error(
                            "Error al hacer la solicitud POST:",
                            error
                        );
                    });
            })

            .catch((error) => {
                console.error("Error al hacer la solicitud POST:", error);
            });
    };

    const handleCalle = (e) => {
        setCalle(e.target.value);
    };

    const handleExterior = (e) => {
        setNo_exterior(e.target.value);
    };

    const handleInterior = (e) => {
        setNo_interior(e.target.value);
    };

    const handleCp = (e) => {
        setCp(e.target.value);
    };

    const handleColonia = (e) => {
        setColonia(e.target.value);
    };

    const dataUpdate = {
        calle,
        no_exterior,
        no_interior,
        cp,
        colonia,
        municipio,
        estado,
    };

    const handleActualizarDomicilio = (e) => {
        e.preventDefault();

        console.log(dataUpdate);

        fetch(
            `http://127.0.0.1:8000/api/domicilio/actualizar/${datos_personales.rfc}`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(dataUpdate),
            }
        )
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Error de red al hacer la solicitud POST");
                }
                return response.json();
            })
            .then((responseData) => {
                console.log(responseData);
                setDataDomicilio(responseData);
                console.log(dataDomicilio);
                setIsChecked((e) => !e);
            })
            .catch((error) => {
                console.error("Error al hacer la solicitud POST:", error);
            });
    };

    return (
        <div>
            <hr className="my-5" />
            <h2 className="text-xl font-semibold">
                Llena el formulario para actualizar tu información
            </h2>
            <form
                onSubmit={handleActualizarDomicilio}
                className="mt-5 flex flex-col gap-4"
            >
                <div className="flex flex-col gap-2">
                    <label>Calle</label>
                    <input
                        type="text"
                        name="calle"
                        placeholder="Calle"
                        className="border rounded-lg p-2"
                        value={calle}
                        onChange={handleCalle}
                        required
                    />
                </div>
                <div className="flex flex-col gap-2">
                    <label>Número exterior</label>
                    <input
                        type="text"
                        name="no_exterior"
                        placeholder="Número exterior"
                        className="border rounded-lg p-2"
                        value={no_exterior}
                        onChange={handleExterior}
                        required
                    />
                </div>
                <div className="flex flex-col gap-2">
                    <label>Número interior</label>
                    <input
                        type="text"
                        name="no_interior"
                        placeholder="Número interior"
                        className="border rounded-lg p-2"
                        value={no_interior}
                        onChange={handleInterior}
                    />
                </div>

                <div className="flex flex-col gap-2">
                    <label>Código Postal</label>
                    <input
                        type="text"
                        name="cp"
                        placeholder="Código Postal"
                        className="border rounded-lg p-2"
                        value={cp}
                        onChange={handleCp}
                        maxLength={5}
                        onBlur={handleCodigoPostal}
                        required
                    />
                </div>
                <div className="flex flex-col gap-2">
                    <label>Colonia</label>
                    <select
                        value={colonia}
                        onChange={handleColonia}
                        className="border rounded-lg p-2"
                    >
                        <option value="">Selecciona una colonia</option>
                        {colonias &&
                            colonias.map((item) => (
                                <option key={item} value={item}>
                                    {item}
                                </option>
                            ))}
                    </select>
                </div>
                <div className="flex flex-col gap-2">
                    <label>Municipio</label>
                    <input
                        type="text"
                        name="municipio"
                        placeholder="Municipio"
                        className="border rounded-lg p-2"
                        value={municipio}
                        onChange={handleCp}
                        disabled
                    />
                </div>
                <div className="flex flex-col gap-2">
                    <label>Estado</label>
                    <input
                        type="text"
                        name="estado"
                        placeholder="Estado"
                        className="border rounded-lg p-2"
                        value={estado}
                        onChange={handleCp}
                        disabled
                    />
                </div>
                <button className="mt-5 p-2 px-5 border rounded-lg bg-orange-500 hover:bg-orange-600 text-white">
                    Actualizar
                </button>
            </form>
        </div>
    );
};
