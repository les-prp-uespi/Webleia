<?php


namespace App\Http\Controllers;


use App\Config\Constantes;
use App\Exceptions\ValidationException;
use App\Repository\AlunoRepository;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class AlunoController extends BaseCrudController {

    protected function setupRepository() {
        $this->repository = new AlunoRepository($this->getUserSession());
    }

    /**
     * @param Request $request
     * @return JsonResponse
     */
    public function createAlunoAndUser(Request $request) : JsonResponse{
        if(!$this->getUserSession()->is_admin) abort(403, Constantes::MSG_NO_PERMISSION);
        try{
            $data = $request->all();
            return $this->responseJson($this->repository->createAlunoAndUser($data)->toFullArray());
        }catch (ValidationException $ex){
            return $this->responseJsonErrorData($ex->getMsg(), $ex->getErros(), $ex->getCode());
        }catch (\Exception $ex){
            return $this->responseJsonError($ex->getMessage(), $ex->getCode());
        }
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

    public function ranking(Request $request) : JsonResponse{
        return $this->responseJson($this->repository->groupByProducaoTextual($request));
    }

}
