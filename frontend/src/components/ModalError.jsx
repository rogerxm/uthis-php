export const ModalError = ({ setModalError }) => {
    const handleError = () => {
        setModalError((e) => !e);
    };

    return (
        <div className="border rounded-lg m-20 p-10 w-6/12 mx-auto text-center">
            <h1 className="font-semibold text-4xl text-center text-red-600">
                RFC no existe
            </h1>
            <h3 className="font-semibold text-lg text-center">
                El rfc ingresado no es válido, intentar de nuevo
            </h3>
            <button
                onClick={handleError}
                className="border mt-5 disabled:bg-slate-500 disabled:cursor-not-allowed rounded-lg p-2 w-4/12 mx-auto text-center bg-orange-500 hover:bg-orange-600 text-white"
            >
                Volver
            </button>
        </div>
    );
};
