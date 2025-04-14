<?php

namespace App\Http\Controllers;

use App\Repository\AlunoRepository;
use App\Repository\ProducaoTextualRepository;
use App\Repository\UsuarioRepository;
use Illuminate\Http\Request;

class DashController extends ApiController {

    public function counts(Request $request){

        $resposta = [];

        $repository = new UsuarioRepository($this->getUserSession());
        $resposta['counts_perfil_usuario'] = $repository->groupByPerfil($request->duplicate());

        $repository = new ProducaoTextualRepository($this->getUserSession());
        $resposta['count_producoes_textuais_by_status'] = $repository->groupByStatus($request->duplicate());
        $resposta['count_producoes_textuais_by_genero_textual'] = $repository->groupByGeneroTextual($request->duplicate());

        $repository = new AlunoRepository($this->getUserSession());
        $resposta['count_ies_aluno'] = $repository->countInstituicaoEnsino($request->duplicate());

        return $this->responseJson($resposta);
    }

}
