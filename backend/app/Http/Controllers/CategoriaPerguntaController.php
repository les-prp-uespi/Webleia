<?php


namespace App\Http\Controllers;


use App\Repository\CategoriaPerguntaRepository;

class CategoriaPerguntaController extends BaseCrudController {

    protected function setupRepository() {
        $this->repository = new CategoriaPerguntaRepository($this->getUserSession());
    }

}
