<?php


namespace App\Models;


use App\Config\Constantes;
use App\Models\AppModel;
use Illuminate\Database\Eloquent\SoftDeletes;

class Aplicacao extends AppModel {

    use SoftDeletes;
    protected $table = 'aplicacao';
    protected $visible = ['id', 'nome', 'identificador', 'codigo', 'status'];

    // niveis de seguranca
    const NV_SEC_NORMAL     = 1;
    const NV_SEC_2_PASSOS   = 2;

    public function segurancaNormal() : bool {
        return self::NV_SEC_NORMAL == $this->seguranca;
    }

    public function seguranca2Passos() : bool {
        return self::NV_SEC_2_PASSOS == $this->seguranca;
    }

}
