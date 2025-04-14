<?php


namespace App\Http\Controllers;


use App\Exceptions\ValidationException;
use App\Repository\AlunoRepository;
use App\Repository\GrauInstrucaoRepository;
use App\Repository\InstituicaoEnsinoRepository;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class InstituicaoEnsinoController extends BaseCrudController {

    protected function setupRepository() {
        $this->repository = new InstituicaoEnsinoRepository($this->getUserSession());
    }

}
