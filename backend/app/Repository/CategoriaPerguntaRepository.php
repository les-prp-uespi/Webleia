<?php


namespace App\Repository;


use App\Models\CategoriaPergunta;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;

class CategoriaPerguntaRepository extends BaseCrudPerfilRepository {

    protected static $orderDefault = 'ordem';

    protected function setupModel() {
        $this->model = new CategoriaPergunta();
    }

    protected function where(Builder &$query, Request $request) {
        if($request->filled('nome'))
            $query->where('nome', 'like', "%".$request->nome."%");
        if($request->filled('descricao'))
            $query->where('descricao', 'like', "%".$request->descricao."%");
        if($request->filled('genero_textual_id'))
            $query->where('genero_textual_id', $request->genero_textual_id);
    }

}
