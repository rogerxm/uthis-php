<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Cliente extends Model
{
    protected $fillable = [
        'nombre',
        'apellido_paterno',
        'apellido_materno',
        'rfc',
        'password',
        'fecha_nacimiento',
        'ingresos',
        'egresos',
        'no_dependientes',
        'estado_civil',
        'genero',
        'ultimo_grado_estudios',
    ];

    public function domicilio() {
        return $this->hasOne(Domicilio::class, 'id');
    }

    public function credito() {
        return $this->hasOne(Credito::class, 'id');
    }

    public $timestamps = false;
}

