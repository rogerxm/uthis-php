import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { Home } from "./components/Home";
import { useEffect, useState } from "react";
import { DatosPersonales } from "./components/DatosPersonales";
import { DatosDomicilio } from "./components/DatosDomicilio";
import { DatosCredito } from "./components/DatosCredito";
import { SolicitudEnviada } from "./components/SolicitudEnviada";
import { HomeAdmin } from "./components/HomeAdmin";
import { Registros } from "./components/Registros";

function App() {
    const [rfc, setRfc] = useState("");
    const [dataCliente, setDataCliente] = useState();
    const [dataDomicilio, setDataDomicilio] = useState();
    const [dataCredito, setDataCredito] = useState();
    const [registros, setRegistros] = useState();

    return (
        <BrowserRouter>
            <Routes>
                <Route
                    index
                    element={
                        <Home
                            rfc={rfc}
                            setRfc={setRfc}
                            dataCliente={dataCliente}
                            setDataCliente={setDataCliente}
                        />
                    }
                />
                <Route
                    path={`/${rfc}/datos`}
                    element={
                        rfc ? (
                            <DatosPersonales
                                rfc={rfc}
                                setRfc={setRfc}
                                dataCliente={dataCliente}
                                setDataDomicilio={setDataDomicilio}
                            />
                        ) : (
                            <Navigate to="/" replace={true} />
                        )
                    }
                />
                <Route
                    path={`/${rfc}/domicilio`}
                    element={
                        rfc ? (
                            <DatosDomicilio
                                dataCliente={dataCliente}
                                setDataCredito={setDataCredito}
                                dataDomicilio={dataDomicilio}
                                setDataDomicilio={setDataDomicilio}
                                rfc={rfc}
                            />
                        ) : (
                            <Navigate to="/" replace={true} />
                        )
                    }
                />
                <Route
                    path={`/${rfc}/credito`}
                    element={
                        rfc ? (
                            <DatosCredito
                                dataCliente={dataCliente}
                                setRfc={setRfc}
                                dataCredito={dataCredito}
                            />
                        ) : (
                            <Navigate to="/" replace={true} />
                        )
                    }
                />
                <Route
                    path={`/termino`}
                    element={<SolicitudEnviada setRfc={setRfc} />}
                />
                <Route
                    path="/admin"
                    element={<HomeAdmin setRegistros={setRegistros} />}
                />
                <Route
                    path="/registros"
                    element={<Registros registros={registros} />}
                />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
