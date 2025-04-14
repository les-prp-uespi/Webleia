<?php


namespace App\Http\Controllers;


use App\Config\Constantes;
use App\Exceptions\ValidationException;
use App\Repository\AlunoRepository;
use App\Repository\ProducaoTextualRepository;
use App\Repository\ProducaoTextualRespostaRepository;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ProducaoTextualRespostaController extends BaseCrudController {

    protected function setupRepository() {
        $this->repository = new ProducaoTextualRespostaRepository($this->getUserSession());
    }

    public function usoTextoFinal(Request $request) : JsonResponse{

        $request->validate([
            'producao_textual_id' => 'required',
            'ids' => 'required|array',
        ]);


        if($this->repository->usoTextoFinal($request->producao_textual_id, $request->ids, $request->get('usar', Constantes::NAO)))
            return $this->responseJsonSucess(Constantes::MSG_SUCCESS);

        return $this->responseJsonError('Erro interno ao alterar flag de uso no texto final.');
    }

}
