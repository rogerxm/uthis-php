<?php

namespace App\Http\Controllers;

use DateTime;
use App\Cliente;
use App\Credito;
use DateInterval;
use App\Domicilio;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class DatosClienteController extends Controller
{
    public function store(Request $request)
    {
        $data = $request->json()->all();
        $datosPersonales = $data['datos_personales'];
        $datosDomicilio = $data['datos_domicilio'];
        $datosCredito = $data['datos_credito'];

        $existingCliente = Cliente::where('rfc', $datosPersonales['rfc'])->first();

        if ($existingCliente) {
            return response()->json(['message' => 'RFC duplicado. No se pudo guardar el registro.'], 400);
        }

        $cliente = new Cliente();
        $cliente->id = $datosPersonales['cliente_id'];
        $cliente->nombre = $datosPersonales['nombre'];
        $cliente->apellido_paterno = $datosPersonales['apellido_paterno'];
        $cliente->apellido_materno = $datosPersonales['apellido_materno'];
        $cliente->rfc = $datosPersonales['rfc'];
        $cliente->fecha_nacimiento = $datosPersonales['fecha_nacimiento'];
        $cliente->ingresos = $datosPersonales['ingresos'];
        $cliente->egresos = $datosPersonales['egresos'];
        $cliente->no_dependientes = $datosPersonales['no_dependientes'];
        $cliente->estado_civil = $datosPersonales['estado_civil'];
        $cliente->genero = $datosPersonales['genero'];
        $cliente->ultimo_grado_estudios = $datosPersonales['ultimo_grado_estudios'];
        $cliente->created_at = now()->format('Y-m-d');

        $domicilio = new Domicilio();
        $domicilio->id = $datosPersonales['cliente_id'];
        $domicilio->calle = $datosDomicilio['calle'];
        $domicilio->no_exterior = $datosDomicilio['no_exterior'];
        $domicilio->no_interior = $datosDomicilio['no_interior'];
        $domicilio->colonia = $datosDomicilio['colonia'];
        $domicilio->municipio = $datosDomicilio['municipio'];
        $domicilio->estado = $datosDomicilio['estado'];
        $domicilio->cp = $datosDomicilio['cp'];

        $credito = new Credito();
        $credito->id = $datosPersonales['cliente_id'];
        $credito->monto = $datosCredito['monto'];
        $credito->plazo = $datosCredito['plazo'];
        $credito->pago_mensual = $datosCredito['pago_mensual'];
        $credito->tasa_interes = $datosCredito['tasa_interes'];
        

        $cliente->save();
        $domicilio->save();
        $credito->save();


        return response()->json(['message' => 'Datos recibidos y guardados en la base de datos'], 200);

    }

    public function updateDomicilio(Request $request, $rfc)
    {
        $cliente = Cliente::where('rfc', $rfc)->first();

        if (!$cliente) {
            return response()->json(['message' => 'Cliente no encontrado'], 404);
        }

        $request->validate([
            'calle' => 'required|string',
            'no_exterior' => 'required|string',
            // 'no_interior' => 'string', // Puede ser opcional
            'cp' => 'required|string',
            'colonia' => 'required|string',
            'municipio' => 'required|string',
            'estado' => 'required|string',
        ]);

        $domicilio = Domicilio::where('id', $cliente->id)->first();

        $domicilio->calle = strtoupper($request->calle);
        $domicilio->no_exterior = strtoupper($request->no_exterior);
        $domicilio->no_interior = strtoupper($request->no_interior);
        $domicilio->cp = strtoupper($request->cp);
        $domicilio->colonia = strtoupper($request->colonia);
        $domicilio->municipio = strtoupper($request->municipio);
        $domicilio->estado = strtoupper($request->estado);

        $domicilio->save();

        return response()->json($domicilio);
    }

    public function showDomicilio($rfc)
    {
        $cliente = Cliente::where('rfc', $rfc)->first();

        if($cliente) {
            $domicilio = Domicilio::where('id', $cliente->id)->first();

            return response()->json($domicilio);
        } else {
            return response()->json(['message' => 'Cliente no encontrado'], 404);
        }
    }

    public function showCredito($rfc)
    {
        $cliente = Cliente::where('rfc', $rfc)->first();

        if($cliente) {
            $credito = Credito::where('id', $cliente->id)->first();

            return response()->json($credito);
        } else {
            return response()->json(['message' => 'Cliente no encontrado'], 404);
        }
    }

    public function updateEstatus(Request $request, $rfc)
    {
        $cliente = Cliente::where('rfc', $rfc)->first();
        $credito = Credito::where('id', $cliente->id)->first();
        
        if (!$cliente) {
            return response()->json(['message' => 'Cliente no encontrado'], 404);
        }

        $estatusActual = $cliente->estatus;
        $nuevoEstatus = $request->estatus;

        if($estatusActual === null) {
            $cliente->estatus = $nuevoEstatus;
            $cliente->save();
            return response()->json(['rfc' => $rfc, 'estatus' => $nuevoEstatus]);
        }

        if($estatusActual === 'PRE-REGISTRO' && $nuevoEstatus === 'REGISTRO') {
            $cliente->estatus = $nuevoEstatus;
            $cliente->save();
            return response()->json(['rfc' => $rfc, 'estatus' => $nuevoEstatus]);
        }


        if ($estatusActual === 'REGISTRO' && ($nuevoEstatus === 'OFERTA ACEPTADA' || $nuevoEstatus === 'OFERTA RECHAZADA')) {
            $cliente->estatus = $nuevoEstatus;
            $credito->fechaDecision = now()->format('Y-m-d');

            $fechaDecision = new DateTime($credito->fechaDecision);
            $fechaDecision->add(new DateInterval('P1M')); // Sumar 1 mes
            $credito->nuevoRegistro = $fechaDecision->format('Y-m-d');

            $cliente->save();
            $credito->save();

            return response()->json(['rfc' => $rfc, 'estatus' => $nuevoEstatus]);
        } else {
            return response()->json(['rfc' => $rfc, 'estatus' => $nuevoEstatus]);
        }
    }

    public function showEstatus($rfc)
    {
        $cliente = Cliente::where('rfc', $rfc)->first();
        $credito = Credito::where('id', $cliente->id)->first();

        return response()->json(['estatus' => $cliente->estatus, 'nuevoRegistro' => $credito->nuevoRegistro]);
    }

    public function showRegistros()
    {
        $clientes = DB::table('clientes')
        ->join('domicilios', 'clientes.id', '=', 'domicilios.id')
        ->join('creditos', 'clientes.id', '=', 'creditos.id')
        ->get();

    return response()->json($clientes);
    }
}
