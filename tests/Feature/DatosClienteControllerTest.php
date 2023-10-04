<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class DatosClienteControllerTest extends TestCase
{
    use RefreshDatabase;
   
    public function testStoreMethodCreatesNewCliente()
    {
        $data = [
            'datos_personales' => [
                "cliente_id" => 100161,
                "nombre"=> "GENESIS",
                "apellido_paterno"=> "CARRASCO",
                "apellido_materno"=> "ROMERO",
                "rfc"=> "CARG9401019V8",
                "fecha_nacimiento"=> "1978-04-18",
                "ingresos"=> 20000,
                "egresos"=> 2800,
                "no_dependientes"=> 1,
                "estado_civil"=> "SOLTERO",
                "genero"=> "FEMENINO",
                "ultimo_grado_estudios"=> "LICENCIATURA"
            ],
            'datos_domicilio' => [
                "calle" => "CALLE FRESNO",
                "no_exterior" => "14",
                "no_interior" => "78",
                "colonia" => "LOMAS DEL PEDREGAL",
                "municipio" => "SAN DIEGO DE LA UNIÓN",
                "estado" => "GUANAJUATO",
                "cp" => "37857"
            ],
            'datos_credito' => [
                "monto" => 38000,
                "plazo" => "36 MESES",
                "pago_mensual" => 2555.55,
                "tasa_interes" => "55 %"
            ],
        ];

        $response = $this->withoutExceptionHandling()->post('/api/guardarRegistro', $data);

        $response->assertStatus(200);

        $this->assertDatabaseHas('clientes', [
            'rfc' => $data['datos_personales']['rfc'],
        ]);
    }

}
