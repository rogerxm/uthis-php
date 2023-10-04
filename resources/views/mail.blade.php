<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
</head>

<body>
    <h1>Solicitud de Crédito</h1>
    <h2>Hola Uthis, hemos recibido una solicitud. Aquí está la información.</h2>

    <h4>Estatus: {{ $estatus }}</h4>
    <hr>
    <h4>Nombre: {{ $nombre }}</h4>
    <h4>Domicilio: {{ $domicilio }}</h4>
    <h4>Monto: {{ $monto }}</h4>
    <h4>Plazo: {{ $plazo }}</h4>
    <h4>Pago mensual: {{ $pago }}</h4>
    <h4>Interés: {{ $interes }}</h4>

    <a href="http://127.0.0.1:8000/api/credito/aceptar"><button>ACEPTAR</button></a>
    <a href="http://127.0.0.1:8000/api/credito/rechazar"><button>RECHAZAR</button></a>

</body>

</html>
