<?php


namespace App\Models;


use App\Config\Constantes;
use App\Models\AppModel;
use App\Util\Util;
use Illuminate\Support\Carbon;

/**
 * Class AplicacaoAcessoLog
 * @package App\Models\Academico
 */
class AplicacaoAcessoLog extends AppModel {

    protected $table = 'aplicacao_acesso_log';
    public $timestamps = false;

    public function token() { return $this->belongsTo(AplicacaoAcessoToken::class); }

    public static function createDefault($acesso_token_id, $url, $method, $params){

        if(is_array($params)) $params = json_encode($params);

        static::create(array(
            'url' => $url,
            'metodo' => $method,
            'params' => $params,
            'ip' => $_SERVER['REMOTE_ADDR'],
            'created_at' => Carbon::now(),
            'aplicacao_acesso_token_id' => $acesso_token_id
        ));

    }

}
