<?php

namespace App\Providers;

// use Illuminate\Support\Facades\Gate;
use App\Models\AplicacaoAcessoToken;
use Illuminate\Http\Request;

class AuthServiceProvider extends \Illuminate\Support\ServiceProvider
{
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        //
    }

    /**
     * Boot the authentication services for the application.
     *
     * @return void
     */
    public function boot()
    {
        // Here you may define how you wish users to be authenticated for your Lumen
        // application. The callback which receives the incoming request instance
        // should return either a User instance or null. You're free to obtain
        // the User instance via an API token or any other method necessary.

        $this->app['auth']->viaRequest('auth', function (Request $request) {

            $authorization = $request->header('TokenUser', '');
            if (strlen($authorization) <= 0) return null;

            $authorization = explode(':', $authorization);
            if (count($authorization) < 3) return null;

            $user_id = intval($authorization[0]);
            $token_api = $authorization[1];
            $app_key = $authorization[2];

            if ($user_id <= 0 || strlen($token_api) <= 0 || strlen($app_key) <= 0)
                return null;

            #try{
                $co = AplicacaoAcessoToken::check($user_id, $token_api, $app_key);
                $co->renew();
                $request->merge(['__token_id' => $co->id]);
                return $co->usuario;
            #}catch (\Exception $ex){}

            #return null;

        });
    }
}
