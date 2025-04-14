<?php


namespace App\Repository;


use App\Config\Constantes;
use App\Models\GrauInstrucao;
use App\Models\GeneroTextual;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;

class GeneroTextualRepository extends BaseCrudPerfilRepository {

    protected static $orderDefault = 'nome';
    protected function setupModel() {
        $this->model = new GeneroTextual();
    }

    protected function where(Builder &$query, Request $request) {
        if($request->filled('nome'))
            $query->where('nome', 'like', "%".$request->nome."%");
        if($request->filled('publicado'))
            $query->where('publicado', $request->publicado);
    }

}
