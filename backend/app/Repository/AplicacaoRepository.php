<?php


namespace App\Repository;


use App\Models\Aplicacao;
use App\Models\AplicacaoConfiguracao;
use Illuminate\Database\Eloquent\Builder;

class AplicacaoRepository {

    public static function check($key): ?Aplicacao{
        return Aplicacao::where(['codigo' => $key])->first();
    }

    public static function configuracoesByAplicacao(int $aplicacao_id, $rede_id = 0){
        $query = AplicacaoConfiguracao::where('aplicacao_id', $aplicacao_id);
        return self::mapConfiguracoes($query, $rede_id);
    }

    public static function configuracoesByAppKey(string $codigo, $rede_id = 0){
        $query = AplicacaoConfiguracao::whereRelation('aplicacao','codigo', $codigo);
        return self::mapConfiguracoes($query, $rede_id);
    }

    private static function mapConfiguracoes(Builder $query, $rede_id = 0){
        if(intval($rede_id) > 0){
            $query->where(function(Builder $q) use ($rede_id){
                $q->where('rede_id', $rede_id)->orWhereNull('rede_id');
            }) ;
        }

        if($query->count() <= 0) return null;
        $rs = array();
        foreach ($query->get() as $it) $rs[$it->chave] = $it->valor;
        return $rs;
    }

}
