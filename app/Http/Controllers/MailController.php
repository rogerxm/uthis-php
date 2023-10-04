<?php

namespace App\Http\Controllers;

use App\Cliente;
use App\Credito;
use App\Domicilio;
use App\Mail\MailConfirmacion;
use Illuminate\Http\Request;
use App\Mail\MailCredito;
use App\Mail\MailRejected;
use Illuminate\Support\Facades\Mail;

class MailController extends Controller
{
    public function sendEmail($rfc)
    {
        $cliente = Cliente::where('rfc', $rfc)->first();
        $domicilio = Domicilio::where('id', $cliente->id)->first();
        $credito = Credito::where('id', $cliente->id)->first();

        $data = ['nombre' => $cliente->nombre . ' ' . $cliente->apellido_paterno . ' ' . $cliente->apellido_materno, 'domicilio' => $domicilio->calle . ' ' . $domicilio->no_exterior . ' ' . $domicilio->no_interior . ' ' . $domicilio->colonia . ' ' . $domicilio->municipio . ' ' . $domicilio->estado . ' ' . $domicilio->cp, 'estatus' => $cliente->estatus, 'monto' => $credito->monto, 'plazo' => $credito->plazo, 'pago' => $credito->pago_mensual, 'interes' => $credito->tasa_interes];

        Mail::to('rmonteso1700@alumno.ipn.mx')->send(new MailCredito($data));

        return response()->json(['message' => $data]);
    }

    public function emailAceptar()
    {
        $data = ['mensaje' => 'Solicitud aceptada'];
        Mail::to('rmonteso1700@alumno.ipn.mx')->send(new MailConfirmacion($data));
    }
    
    public function emailRechazar()
    {
        $data = ['mensaje' => 'Solicitud rechazada'];
        Mail::to('rmonteso1700@alumno.ipn.mx')->send(new MailRejected($data));
    }
}
