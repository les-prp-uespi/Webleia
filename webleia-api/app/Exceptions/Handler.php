<?php

namespace App\Exceptions;

use Illuminate\Auth\Access\AuthorizationException;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Database\QueryException;
use Illuminate\Http\JsonResponse;
use Illuminate\Validation\ValidationException;
use Illuminate\Foundation\Exceptions\Handler as ExceptionHandler;
use App\Config\Constantes;
use Symfony\Component\HttpKernel\Exception\HttpException;
use Symfony\Component\HttpKernel\Exception\MethodNotAllowedHttpException;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Throwable;

class Handler extends ExceptionHandler
{
    /**
     * A list of the exception types that should not be reported.
     *
     * @var array
     */
    protected $dontReport = [
        AuthorizationException::class,
        HttpException::class,
        ModelNotFoundException::class,
        ValidationException::class,
        \App\Exceptions\ValidationException::class
    ];

    /**
     * Report or log an exception.
     *
     * This is a great spot to send exceptions to Sentry, Bugsnag, etc.
     *
     * @param  \Throwable  $exception
     * @return void
     *
     * @throws \Exception
     */
    public function report(Throwable $exception)
    {
        parent::report($exception);
    }

    /**
     * Render an exception into an HTTP response.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Throwable  $exception
     * @return \Illuminate\Http\Response|\Illuminate\Http\JsonResponse
     *
     * @throws \Throwable
     */
    public function render($request, Throwable $exception)
    {

        if ($exception instanceof AuthorizationException) {
            return $this->responseJsonError(Constantes::MSG_NO_PERMISSION, 401);
        }
        if ($exception instanceof MethodNotAllowedHttpException) {
            return $this->responseJsonError(Constantes::MSG_NO_ACCESS, 405);
        }
        if ($exception instanceof NotFoundHttpException) {
            return $this->responseJsonError(Constantes::MSG_NO_EXIST, 404);
        }
        if ($exception instanceof \App\Exceptions\ValidationException) {
            return $this->responseJsonErrorData($exception->getMsg(), $exception->getErros(), $exception->getCode());
        }
        if ($exception instanceof ValidationException) {
            return $this->responseJsonErrorData('Dados inválidos', $exception->errors(), 400);
        }

        if(!env('APP_DEBUG', false)){
            if (($exception instanceof \PDOException) || ($exception instanceof QueryException)) {
                return $this->responseJsonError('Erro ao executar instrução no banco de dados!');
            }
            return $this->responseJsonError($exception->getMessage(), $exception->getCode());
        }

        return new JsonResponse($this->convertExceptionToArray($exception), is_int($exception->getCode()) && $exception->getCode() > 0 ? $exception->getCode() : 500);
    }

    protected function responseJsonError(string $message, $status = 500, array $headers = [], int $options = 0) : JsonResponse {
        $status = intval($status) >= 400 && intval($status) <= 599 ? $status : 500;
        return response()->json(['message' => $message, 'code' => $status], $status, $headers, $options);
    }

    protected function responseJsonErrorData(string $message, array $erros = [], $status = 500, array $headers = [], int $options = 0) : JsonResponse {
        $status = intval($status) >= 400 && intval($status) <= 599 ? $status : 500;
        return response()->json(['message' => $message, 'code' => $status, 'errors' => $erros], $status, $headers, $options);
    }
}
