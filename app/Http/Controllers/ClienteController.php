<?php

namespace App\Http\Controllers;

use App\Cliente;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ClienteController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:sanctum');
    }

    public function index()
    {
        $clientes = Cliente::with('domicilio', 'credito')->get();
        return response()->json($clientes);
    }

    public function showPorRFC($rfc)
    {
        $cliente = Cliente::where('rfc', $rfc)->with('domicilio', 'credito')->first();

        if (!$cliente) {
            return response()->json(['message' => 'Cliente no encontrado'], 404);
        }
        return response()->json($cliente);
    }

    public function showPorFechas(Request $request)
    {
        $rules = [
            'fechaInicio' => 'required|date',
            'fechaFin' => 'required|date|after_or_equal:fechaInicio',
        ];

        $messages = [
            'fechaInicio.required' => 'El campo Fecha de Inicio es obligatorio.',
            'fechaFin.required' => 'El campo Fecha de Fin es obligatorio.',
            'fechaInicio.date' => 'El campo Fecha de Inicio debe ser una fecha válida.',
            'fechaFin.date' => 'El campo Fecha de Fin debe ser una fecha válida.',
            'fechaFin.after_or_equal' => 'El campo Fecha de Fin debe ser igual o posterior a la Fecha de Inicio.',
        ];

        $validator = Validator::make($request->all(), $rules, $messages);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 400);
        }

        $fechaInicio = $request->input('fechaInicio');
        $fechaFin = $request->input('fechaFin');

        $clientes = Cliente::with('domicilio', 'credito')
            ->whereBetween('created_at', [$fechaInicio, $fechaFin])
            ->get();

        return response()->json($clientes);
    }
}