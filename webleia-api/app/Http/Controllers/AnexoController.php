<?php


namespace App\Http\Controllers;


use App\Repository\AnexoRepository;

class AnexoController extends BaseCrudController {

    protected function setupRepository() {
        $this->repository = new AnexoRepository($this->getUserSession());
    }

}
