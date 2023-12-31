<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Domicilio extends Model
{
    public function cliente() {
        return $this->belongsTo(Cliente::class);
    }

    public $timestamps = false;
}
