<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class DatosCreditoTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('creditos', function(Blueprint $table){
            $table->id();
            $table->integer('monto');
            $table->string('plazo');
            $table->decimal('pago_mensual');
            $table->string('tasa_interes');
            $table->date('fechaDecision')->nullable();  
            $table->date('nuevoRegistro')->nullable();  
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('creditos');
    }
}
