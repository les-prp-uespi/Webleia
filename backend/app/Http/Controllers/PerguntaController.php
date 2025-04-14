<?php


namespace App\Http\Controllers;


use App\Repository\PerguntaRepository;
use Illuminate\Http\JsonResponse;

class PerguntaController extends BaseCrudController {

    protected function setupRepository() {
        $this->repository = new PerguntaRepository($this->getUserSession());
    }

    public function allTipos() : JsonResponse{
        return $this->responseJson($this->repository->allTipos());
    }

}
