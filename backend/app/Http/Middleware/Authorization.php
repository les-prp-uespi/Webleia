<?php

namespace App\Http\Middleware;

use Illuminate\Support\Facades\Log;

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
    public function handle(Request $request, Closure $next)
    {
        $userSession = Auth::user();

        // 1. Verifica autenticação
        if (!$userSession) {
            return response()->json(['message' => 'Não autenticado'], 401);
        }

        // 2. Verifica instância e pega perfil
        $perfil = [];
        if ($userSession instanceof Usuario) {
            $perfil[] = $userSession->perfil;
            Log::info("Usuário {$userSession->email} com perfil: " . json_encode($perfil));
        } else {
            Log::error("Tipo inválido para usuário: " . get_class($userSession));
            return response()->json(['message' => 'Tipo de usuário inválido'], 403);
        }

        // 3. Verifica permissões
        try {
            $ath = AppAuthorization::getInstance($perfil);

            if (!$ath->can($request)) {
                Log::warning("Acesso negado para {$userSession->email} na rota {$request->path()}");
                return response()->json(['message' => Constantes::MSG_NO_PERMISSION], 403);
            }

            return $next($request);
        } catch (\Exception $e) {
            Log::error("Erro na autorização: " . $e->getMessage());
            return response()->json(['message' => 'Erro interno na autorização'], 500);
        }
    }
}
