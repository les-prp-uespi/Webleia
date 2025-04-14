<?php


namespace App\Http\Controllers;


use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use App\Config\Constantes;

abstract class BaseCrudController extends BaseListController {

    /**
     * @param Request $request
     * @return JsonResponse
     */
    public function save(Request $request) : JsonResponse{
        return $this->responseJson($this->repository->saveByRequest($request)->toFullArray(), 201);
    }

    /**
     * @param Request $request
     * @param int $id
     * @return JsonResponse
     */
    public function update(Request $request, int $id) : JsonResponse{
        return $this->responseJson($this->repository->saveByRequest($request, $id)->toFullArray());
    }

    /**
     * @param int $id
     * @return JsonResponse
     */
    public function delete(int $id) : JsonResponse{
        if($this->repository->delete($id))
            return $this->responseJsonSucess(Constantes::MSG_SUCCESS);
        return $this->responseJsonError('Erro interno ao excluir este dado.');
    }

    /**
     * @param int $id
     * @return JsonResponse
     */
    public function restore(int $id) : JsonResponse{
        if($this->repository->restore($id))
            return $this->responseJsonSucess(Constantes::MSG_SUCCESS);
        return $this->responseJsonError('Erro interno ao restaurar este dado.');
    }

    /**
     * @param int $id
     * @param $status
     * @return JsonResponse
     */
    public function status(int $id, $status) : JsonResponse{
        if($this->repository->status($id, $status))
            return $this->responseJsonSucess(Constantes::MSG_SUCCESS);
        return $this->responseJsonError('Erro interno ao alterar o status deste registro.');
    }

}
