<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::post('/guardarRegistro', 'DatosClienteController@store'); 
Route::post('/estatus/actualizar/{rfc}', 'DatosClienteController@updateEstatus');
Route::get('/estatus/{rfc}', 'DatosClienteController@showEstatus');

Route::post('/domicilio/{rfc}', 'DatosClienteController@showDomicilio');
Route::post('/domicilio/actualizar/{rfc}', 'DatosClienteController@updateDomicilio');
Route::post('/credito/{rfc}', 'DatosClienteController@showCredito');

// Enviar emails
Route::post('/credito/{rfc}/mail', 'MailController@sendEmail');
Route::get('/credito/aceptar', 'MailController@emailAceptar');
Route::get('/credito/rechazar', 'MailController@emailRechazar');

// Todos los registros
Route::post('/users', 'UserController@store');
Route::post('/login', 'AuthController@login');
Route::post('/logout', 'AuthController@logout')->middleware('auth:sanctum');
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/registros', 'ClienteController@index');
    Route::get('/registros/{rfc}', 'ClienteController@showPorRFC');
    Route::get('/registros/fecha/{fechaInicio}/{fechaFin}', 'ClienteController@showPorFechas');
});