<?php


namespace App\Http\Middleware;


use Closure;
use Illuminate\Http\Request;
use App\Config\Constantes;

class TokenAuthorization {

    /**
     * Handle an incoming request.
     *
     * @param  Request  $request
     * @param  Closure  $next
     * @return mixed
     */
    public function handle(Request $request, Closure $next, string $token_key = '', string $token_value = '') {

        if(!empty($token_key) && !empty($token_value)
            && $request->header($token_key, '') != $token_value){
            return response()->json(['message' => Constantes::MSG_NO_PERMISSION, 'code' => 403], 403);
        }

        return $next($request);
    }

}
