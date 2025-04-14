<?php


namespace App\Repository;


use App\Models\Cidade;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;

class CidadeRepository extends BaseListRepository {

    protected static $orderDefault = 'nome';

    protected function setupModel() {
        $this->model = new Cidade();
    }

    protected function where(Builder &$query, Request $request) {

        if($request->filled('nome'))
            $query->where('nome', 'like', "%".$request->nome."%");

        if($request->filled('uf'))
            $query->where('uf', $request->uf);

    }

}
