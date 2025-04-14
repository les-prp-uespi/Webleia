<?php

namespace App\Http\Middleware;

use App\Config\AppAuthorization;
use Closure;
use Illuminate\Contracts\Auth\Factory;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Config\Constantes;
use App\Models\Usuario;

class Authorization
{
    /**
     * The authentication guard factory instance.
     *
     * @var Factory
     */
    protected $auth;

    /**
     * Create a new middleware instance.
     *
     * @param Auth $auth
     */
    public function __construct(Auth $auth)
    {
        $this->auth = $auth;
    }

    /**
     * Handle an incoming request.
     *
     * @param Request $request
     * @param Closure $next
     * @return mixed
     */
    public function handle(Request $request, Closure $next) {
        $userSession = Auth::user();
//        if($userSession == null) throw new \Exception(Constantes::MSG_NO_PERMISSION, 403);
        $perfil = [];
        if($userSession instanceof Usuario) $perfil[] = $userSession->perfil;

        $ath = AppAuthorization::getInstance($perfil);

        if(!$ath->can($request))
            throw new \Exception(Constantes::MSG_NO_PERMISSION, 403);

        return $next($request);
    }
}
