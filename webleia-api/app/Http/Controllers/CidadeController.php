<?php


namespace App\Http\Controllers;


use App\Repository\CidadeRepository;

class CidadeController extends BaseListController {

    protected function setupRepository() {
        $this->repository = new CidadeRepository();
    }

}
