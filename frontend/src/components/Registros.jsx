import { useNavigate } from "react-router-dom";

export const Registros = ({ registros }) => {
    const navigate = useNavigate();
    const handleLogoutAdmin = () => {
        navigate("/admin");
    };

    return (
        <div className="border p-10 my-20 w-10/12 mx-auto">
            <h1 className="text-4xl font-bold mb-4">
                AQUÍ ESTÁN TODOS LOS REGISTROS
            </h1>
            <hr />
            <ul className="mt-4">
                {registros.map((key) => (
                    <>
                        <h2 className="text-xl font-semibold text-red-700">
                            ID: {key.id}
                        </h2>
                        <div className="flex justify-between gap-4 mb-4">
                            <div>
                                <p className="font-bold">DATOS</p>
                                <li key={key.estatus}>
                                    estatus: {key.estatus}
                                </li>
                                <li key={key.nombre}>nombre: {key.nombre}</li>
                                <li key={key.apellido_paterno}>
                                    apellido_paterno: {key.apellido_paterno}
                                </li>
                                <li key={key.apellido_materno}>
                                    apellido_materno: {key.apellido_materno}
                                </li>
                                <li key={key.rfc}>rfc: {key.rfc}</li>
                                <li key={key.fecha_nacimiento}>
                                    fecha_nacimiento: {key.fecha_nacimiento}
                                </li>
                                <li key={key.ingresos}>
                                    ingresos: {key.ingresos}
                                </li>
                                <li key={key.egresos}>
                                    egresos: {key.egresos}
                                </li>
                                <li key={key.no_dependientes}>
                                    no_dependientes: {key.no_dependientes}
                                </li>
                                <li key={key.ultimo_grado_estudios}>
                                    ultimo_grado_estudios:{" "}
                                    {key.ultimo_grado_estudios}
                                </li>
                            </div>
                            <div>
                                <p className="font-bold">DOMICILIO</p>
                                <li key={key.domicilio.calle}>
                                    calle: {key.domicilio.calle}
                                </li>
                                <li key={key.domicilio.no_exterior}>
                                    no_exterior: {key.domicilio.no_exterior}
                                </li>
                                <li key={key.domicilio.no_interior}>
                                    no_interior: {key.domicilio.no_interior}
                                </li>
                                <li key={key.domicilio.colonia}>
                                    colonia: {key.domicilio.colonia}
                                </li>
                                <li key={key.domicilio.municipio}>
                                    municipio: {key.domicilio.municipio}
                                </li>
                                <li key={key.domicilio.estado}>
                                    estado: {key.domicilio.estado}
                                </li>
                                <li key={key.domicilio.cp}>
                                    cp: {key.domicilio.cp}
                                </li>
                            </div>
                            <div>
                                <p className="font-bold">CREDITO</p>
                                <li key={key.credito.monto}>
                                    monto: {key.credito.monto}
                                </li>
                                <li key={key.credito.plazo}>
                                    plazo: {key.credito.plazo}
                                </li>
                                <li key={key.credito.pago_mensual}>
                                    pago_mensual: {key.credito.pago_mensual}
                                </li>
                                <li key={key.credito.tasa_interes}>
                                    tasa_interes: {key.credito.tasa_interes}
                                </li>
                            </div>
                        </div>
                        <hr className="py-5" />
                    </>
                ))}
            </ul>
            <button
                onClick={handleLogoutAdmin}
                className="w-1/12 px-2 py-1 bg-orange-400 rounded-lg text-white"
            >
                Salir
            </button>
        </div>
    );
};
