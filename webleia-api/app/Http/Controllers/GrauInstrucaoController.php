<?php


namespace App\Http\Controllers;


use App\Exceptions\ValidationException;
use App\Repository\AlunoRepository;
use App\Repository\GrauInstrucaoRepository;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class GrauInstrucaoController extends BaseCrudController {

    protected function setupRepository() {
        $this->repository = new GrauInstrucaoRepository($this->getUserSession());
    }

}
