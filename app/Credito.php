<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Credito extends Model
{
    public function cliente() {
        return $this->belongsTo(Cliente::class);
    }

    public $timestamps = false;
}
