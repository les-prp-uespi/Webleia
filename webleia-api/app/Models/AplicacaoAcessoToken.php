<?php


namespace App\Models;


use App\Config\Constantes;
use App\Models\AppModel;
use App\Util\Util;
use Illuminate\Support\Facades\App;

/**
 * Class AplicacaoAcessoToken
 * @package App\Models\Academico
 */
class AplicacaoAcessoToken extends AppModel {

    protected $table = 'aplicacao_acesso_token';

    public static $validations = [
        'token' => 'required|unique:aplicacao_acesso_token',
        'ip' => 'required',
        'aplicacao_id' => 'required|numeric|gt:0',
        'usuario_id' => 'required|numeric|gt:0',
    ];

    protected $attributes = [
        'status' => Constantes::ATIVO,
    ];

    public function usuario() { return $this->belongsTo(Usuario::class); }
    public function aplicacao() { return $this->belongsTo(Aplicacao::class); }

    public static function createDefault($usuario_id, $token, $aplicacao_id) : AplicacaoAcessoToken{

        $usuario_id = intval($usuario_id);

        $params = [
            'usuario_id' => $usuario_id,
            'aplicacao_id' => $aplicacao_id,
            'ip' => $_SERVER['REMOTE_ADDR'],
            'status' => Constantes::ATIVO
        ];

        //reaproveitar tokens
        $md = self::where($params)
            ->orderByDesc('updated_at')
            ->limit(1)
            ->first();

        if($md != null){
            $tempo_limite = self::isLongToken($md->token) ? Constantes::TEMPO_LIMITE_LONGO_API : Constantes::TEMPO_LIMITE_API;
            if($tempo_limite < Util::dateMinDiff(new \DateTime(), $md->updated_at))
                $md = null;
        }

        if($md == null){
            $md = new AplicacaoAcessoToken($params);
            $md->token = $token;
        }

        if(!$md->save())
            throw new \Exception("Erro ao gerar token", 500);

        return $md;

    }

    public static function isLongToken($tk){
        return strlen($tk) == 64;
    }

    public static function check($usuario_id, $token, $app_key) : AplicacaoAcessoToken{

        $ob = self::where(['token' => $token])
            ->where('status', Constantes::ATIVO)
            ->orderByDesc('updated_at')
            ->limit(1)
            ->first();

        if($ob == null || $ob->aplicacao == null || $usuario_id != $ob->usuario_id || $ob->usuario == null)
            throw new \Exception('Acesso negado à API!', 403);
//
        if(strtoupper($app_key) != $ob->aplicacao->codigo)
            throw new \Exception('Aplicação não liberada para este token!', 401);
//
        $tempo_limite = self::isLongToken($token) ? Constantes::TEMPO_LIMITE_LONGO_API : Constantes::TEMPO_LIMITE_API;
//
        //em ambiente local nao há necessidade
        if(!App::isLocal() && $tempo_limite < Util::dateMinDiff(new \Datetime(), $ob->updated_at))
            throw new \Exception('Token expirado, efetue login novamente!', 403);

        return $ob;

    }

    public function renew(){
        $this->touch(); //atualiza automaticamente updated_at
    }

    public static function check_altera_seguranca($usuario_id, $aplicacao_id, $aplicacao_tipo){

        $query = self::where('usuario_id', $usuario_id)
            ->where('aplicacao_id', $aplicacao_id)
            ->where('status', Constantes::ATIVO)
            ->whereRaw(" DATEDIFF(now(), updated_at) < ?", [180]); //6 meses

        if($aplicacao_tipo != 2){ //checar ip se nao for mobile
            $query->where('ip', $_SERVER['REMOTE_ADDR']);
        }

        return $query->exists();

    }

}
