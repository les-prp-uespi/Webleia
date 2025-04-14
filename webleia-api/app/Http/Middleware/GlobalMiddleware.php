<?php


namespace App\Http\Middleware;


use App\Models\AplicacaoAcessoLog;
use Closure;
use Illuminate\Http\Request;
use App\Models\ApiAcessoLog;

class GlobalMiddleware {

    /**
     * Handle an incoming request.
     *
     * @param  Request  $request
     * @param  Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        if ($request->isMethod('OPTIONS')) {
            return response('', 200, $this->cros_headers());
        }

        $this->acceptJson($request);
        $resp = $next($request);

        $resp->header('Access-Control-Allow-Origin','*');

        $this->log($request);

        return $resp;
    }

    /**
     * Retornar sempre em JSON
     * @param Request $request
     */
    protected function acceptJson(Request $request){
        $acceptHeader = strtolower($request->headers->get('accept'));

        // If the accept header is not set to application/json
        // We attach it and continue the request
        if ($acceptHeader !== 'application/json') {
            $request->headers->set('Accept', 'application/json');
        }
    }

    /**
     * Habilitando CROS Domain
     */
    protected function cros_headers(){
        return [
            'Access-Control-Allow-Origin'      => '*',
            'Access-Control-Allow-Methods'     => 'POST, GET, OPTIONS, PUT, DELETE',
            'Access-Control-Allow-Credentials' => 'true',
            // 'Access-Control-Max-Age'           => '86400',
            'Access-Control-Allow-Headers'     => 'Content-Type, Authorization, X-Requested-With, TokenApp, TokenUser, TokenApi, Appkey'
        ];
    }

    /**
     * Log da aplicacao
     * @param Request $request
     */
    protected function log(Request $request){
        if(!env('LOG_ENABLE', false) || !$request->has('__token_id')) return;
        $params = $request->except(['usuario_session_id', 'token_api', '__token_id', 'senha', 'app_key']);
        AplicacaoAcessoLog::createDefault($request->get('__token_id', 0), $request->path(), $request->method(), $params);
    }

}
