<?php


namespace App\Http\Controllers;


use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use App\Repository\BaseListRepository;

abstract class BaseListController extends ApiController {

    /**
     * @var BaseListRepository
     */
    protected BaseListRepository $repository;

    public function __construct(){
        parent::__construct();
        $this->setupRepository();
    }

    protected abstract function setupRepository();

    /**
     * @param Request $request
     * @return JsonResponse | array
     */
    public function all(Request $request) : JsonResponse{
        return $this->responseJson($this->repository->all($request));
    }

    /**
     * @param Request $request
     * @return JsonResponse
     */
    public function count(Request $request) : JsonResponse{
        return $this->responseJson(['total' => $this->repository->count($request)]);
    }

    /**
     * @param int $id
     * @return JsonResponse
     */
    public function find(int $id) : JsonResponse{
        return $this->responseJson($this->repository->find($id)->toFullArray());
    }

}
