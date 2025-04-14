<?php


namespace App\Http\Controllers;


use App\Config\Constantes;
use App\Repository\UsuarioRepository;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class UsuarioController extends BaseCrudController {

    protected function setupRepository() {
        $this->repository = new UsuarioRepository($this->getUserSession());
    }

    public function save(Request $request): JsonResponse {
        if(!$this->getUserSession()->is_admin) abort(403, Constantes::MSG_NO_PERMISSION);
        return parent::save($request);
    }

    public function delete(int $id): JsonResponse {
        if(!$this->getUserSession()->is_admin) abort(403, Constantes::MSG_NO_PERMISSION);
        return parent::delete($id);
    }

    public function restore(int $id): JsonResponse {
        if(!$this->getUserSession()->is_admin) abort(403, Constantes::MSG_NO_PERMISSION);
        return parent::restore($id);
    }

    public function alterarSenha(Request $request): JsonResponse {

        $request->validate([
            'senha_atual' => 'required',
            'senha_nova' => 'required|min:6|max:100',
        ]);

        if($this->repository->alterarSenha($request->senha_atual, $request->senha_nova))
            return $this->responseJsonSucess(Constantes::MSG_SUCCESS);

        return $this->responseJsonError('Erro ao alterar senha.');
    }

}
