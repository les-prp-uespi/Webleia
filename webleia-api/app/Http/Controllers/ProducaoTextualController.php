<?php


namespace App\Http\Controllers;


use App\Config\Constantes;
use App\Repository\ProducaoTextualRepository;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class ProducaoTextualController extends BaseCrudController {

    protected function setupRepository() {
        $this->repository = new ProducaoTextualRepository($this->getUserSession());
    }

    public function status(int $id, $status): JsonResponse {
        abort(403, Constantes::MSG_NO_PERMISSION);
    }

    public function clone(int $id) : JsonResponse{
        return $this->responseJson($this->repository->clone($id)->toFullArray());
    }

    public function export(Request $request, int $id) : Response{
        return $this->repository->export($id, $request->integer('docx'));
    }

    public function ranking(Request $request) : JsonResponse{
        return $this->responseJson($this->repository->groupByUsuario($request));
    }

}
