<?php


namespace App\Repository;


use App\Models\InstituicaoEnsino;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;

class InstituicaoEnsinoRepository extends BaseCrudPerfilRepository {

    protected static $orderDefault = 'nome';
    protected function setupModel() {
        $this->model = new InstituicaoEnsino();
    }

    protected function beforeSave(array &$data) {
        if(isset($data['sigla'])) $data['sigla'] = strtoupper($data['sigla']);
        parent::beforeSave($data);
    }

    protected function where(Builder &$query, Request $request) {
        if($request->filled('busca')){
            $query->where(function ($q) use($request){
                $q->where('nome', 'like', "%".$request->busca."%");
                $q->orWhere('sigla', 'like', "%".$request->busca."%");
            });
        }
        if($request->filled('nome')) $query->where('nome', 'like', "%".$request->nome."%");
        if($request->filled('sigla')) $query->where('sigla', $request->sigla);
        if($request->filled('cidade_id')) $query->where('cidade_id', $request->cidade_id);
        if($request->filled('inep')) $query->where('inep', $request->inep);
    }

}
