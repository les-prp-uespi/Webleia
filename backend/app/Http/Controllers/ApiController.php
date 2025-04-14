<?php


namespace App\Http\Controllers;


use Illuminate\Http\JsonResponse;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\Auth;
use App\Models\Usuario;

abstract class ApiController extends Controller {

    /**
     * Define se o token nao deve ser checado
     * @var bool
     */
    static protected bool $escapeAuth = false;

    /**
     * ApiController constructor.
     */
    public function __construct() {
        if(!static::$escapeAuth){
            $this->middleware('auth');
        }
    }

    protected function responseJson($data, int $status = 200, array $headers = [], int $options = 0) : JsonResponse {
        return response()->json($data, $status, $headers, $options);
    }

    protected function responseJsonSucess(string $message, int $status = 200, array $headers = [], int $options = 0) : JsonResponse {
        return $this->responseJson(['message' => $message, 'code' => $status], $status, $headers, $options);
    }

    protected function responseJsonError(string $message, $status = 500, array $headers = [], int $options = 0) : JsonResponse {
        $status = intval($status) >= 400 && intval($status) <= 599 ? $status : 500;
        return $this->responseJson(['message' => $message, 'code' => $status], $status, $headers, $options);
    }

    protected function responseJsonErrorData(string $message, array $erros = [], $status = 500, array $headers = [], int $options = 0) : JsonResponse {
        $status = intval($status) >= 400 && intval($status) <= 599 ? $status : 500;
        return $this->responseJson(['message' => $message, 'code' => $status, 'errors' => $erros], $status, $headers, $options);
    }

    public function __get($name) {
        if($name == 'user_session' || $name == 'userSession') return $this->getUserSession();
        return null;
    }

    protected function getUserSession(): ?Usuario{
        return Auth::user();
    }

    protected function hasUserSession(): bool{
        return $this->getUserSession() != null;
    }

}
