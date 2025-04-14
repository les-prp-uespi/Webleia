<?php


namespace App\Models;


use App\Config\Constantes;
use App\Models\AppModel;
use App\Util\Util;

/**
 * Class AplicacaoConfiguracao
 * @package App\Models\Academico
 */
class AplicacaoConfiguracao extends AppModel {

    protected $table = 'aplicacao_configuracao';
    public $timestamps = false;
    public function aplicacao() { return $this->belongsTo(Aplicacao::class); }

}
