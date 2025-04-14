<?php


namespace App\Repository;


use App\Config\Constantes;
use App\Models\GrauInstrucao;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;

class GrauInstrucaoRepository extends BaseCrudPerfilRepository {

    protected static $orderDefault = 'nome';
    protected function setupModel() {
        $this->model = new GrauInstrucao();
    }

    protected function where(Builder &$query, Request $request) {
        if($request->filled('nome'))
            $query->where('nome', 'like', "%".$request->nome."%");
    }

}
