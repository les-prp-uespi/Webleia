<?php


namespace App\Http\Middleware;


use Closure;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Str;
use App\Config\Constantes;

class CacheMiddleware {

    protected string $cacheKey = '';
    const KEY_SEP = '-';

    /**
     * Handle an incoming request.
     *
     * @param  Request  $request
     * @param  Closure  $next
     * @param  ?int      $time tempo em minutos
     * @return mixed
     */
    public function handle(Request $request, Closure $next, ?int $time = 60)
    {
        //soh para metodos GET
        if(!$request->isMethod(Request::METHOD_GET)) return $next($request);

        $this->cacheKey = '';
        $cacheDir = $this->getCacheDir($request);

        if(!empty($cacheDir)){
            $this->extractParams($this->cacheKey, $request->except(['usuario_session_id', 'token_api', '__token_id', 'senha', 'app_key', 'renew_cache']));
            $this->cacheKey = Str::slug($cacheDir.'-'.$this->cacheKey);
        }

        if ($request->get('renew_cache', Constantes::NAO) != Constantes::SIM) {
            //checar se ja ta no cache
            if($resp = $this->checkCache($request))
                return $resp;
        }

        $resp = $next($request);

        if (!empty($this->cacheKey) && ($resp instanceof JsonResponse)) {
            //colocar no cache
            $time = (is_null($time) || $time <= 0) ? null : ($time * 60);
            Cache::put($this->cacheKey,  $resp->content(), $time); //todo: tempo configuravel
        }

        return $resp;
    }

    protected function checkCache(Request $request){



        if (Cache::has($this->cacheKey)){
            $dataCache = Cache::get($this->cacheKey);
            return new JsonResponse($dataCache, 200, [
                'FROM_CACHE' => 'true',
                #'DATE_CACHE' => '...' //todo:
                'Access-Control-Expose-Headers' => 'FROM_CACHE, DATE_CACHE'
            ], json: true);
        }

        return null;

    }

    protected function getCacheDir(Request $request): string{

        $userSession = Auth::user();
        $dir = str_replace('/', self::KEY_SEP, $userSession != null ? $userSession->cache_dir : ('geral/'));

        $route = $request->route()->action['uses'] ?? '';
        if(empty($route)) return '';
        if(Str::contains($route, 'App\\Modules', true)){ //modulos
            $route = str_ireplace(['App\\Modules\\', 'Controllers\\'], ['', ''], $route);
        }
        $route = explode('\\', preg_replace(['/([a-z0-9_\\\]+)Controllers\\\/i', '/@/'], ['', '\\'], $route)); //limpando

        $num_parts = count($route);
        $a = $route[--$num_parts];
        $c = str_ireplace('Controller', '', $route[--$num_parts]);
        $n = $num_parts > 0 ? $route[--$num_parts] : '';

        $dir = $c.self::KEY_SEP.$a.self::KEY_SEP.$dir;
        if(!empty($n)) $dir = $n.self::KEY_SEP.$dir;

        return $dir;
    }

    protected function extractParams(string &$val, array $array, string $xkey = ''): void{

        if(!empty($xkey)) $val .= $xkey.'_';
        foreach ($array as $key => $value) {
            $key = $key.'';
            if(is_array($value)) {
                $this->extractParams($val, $value, $key);
                continue;
            }
            if(is_string($value) && strlen($value) > 50) $value = substr($value, 0, 50);
            $val .= $key.'_'.$value.'-';
        }

    }

}
