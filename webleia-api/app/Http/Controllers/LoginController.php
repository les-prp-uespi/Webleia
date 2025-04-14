<?php


namespace App\Http\Controllers;


use App\Config\Constantes;
use App\Exceptions\ValidationException;
use App\Http\Requests\CustomEmailVerificationRequest;
use App\Models\Aplicacao;
use App\Models\AplicacaoAcessoLog;
use App\Models\AplicacaoAcessoToken;
use App\Models\AppModel;
use App\Models\Usuario;
use App\Repository\AlunoRepository;
use App\Repository\AplicacaoRepository;
use App\Util\Util;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Password;
use Illuminate\Support\Str;

class LoginController extends ApiController {

    protected static bool $escapeAuth = true;

    private function validate_aplicacao(Request $request) : Aplicacao{
        $app_key = $request->header('AppKey', '');
        if(empty($app_key))
            throw new \Exception('Aplicação não econtrada!', 401);

        $app_key = AplicacaoRepository::check($app_key);
        if($app_key == null)
            throw new \Exception('Aplicação não econtrada!', 401);

        return $app_key;
    }

    public function run(Request $request, bool $escapeThrow = false) : JsonResponse{
        $request->validate([
            'email' => 'required|email',
            'senha' => 'required',
        ]);

        try{
            $app = $this->validate_aplicacao($request);

            if(!$app->segurancaNormal())
                throw new \Exception('Login não pode ser relizado por este EP, Aplicação requer autenticação em 2 passos!', 401);

            $senha = $request->senha;
            $long_token = $request->get('long_token', Constantes::NAO) == Constantes::SIM;
            $perfil = $request->get('perfil', 0);

            $query = Usuario::where('email', $request->email);

            if(intval($perfil) > 0)  $query->where('perfil', $perfil);

            $usuario = $query->first();
            if($usuario == null || !Hash::check($senha, $usuario->senha))
                throw new \Exception('Usuário ou Senha Inválidos!', 401);

            if(!$usuario->hasVerifiedEmail())
                throw new \Exception('E-mail não verificado, verifique o link de ativação no seu e-mail!', 401);

            $rel = $usuario->getObjRelacionado();
            if(!$usuario->is_admin && $rel == null)
                throw new \Exception('Usuário sem perfil associado ou com relacionado inativo!', 401);

            $data = $usuario->toLoginArray($app->id);
            if($long_token)
                $data['token'] = $usuario->getLongToken();

            $at = AplicacaoAcessoToken::createDefault($data['id'], $data['token'], $app->id);

            AplicacaoAcessoLog::createDefault($at->id, $request->path(), $request->method(), $request->except(['usuario_session_id', 'token_api', '__token_id', 'senha', 'app_key']));

            $data['token'] = $at->token; //pode ter mudado (reproveitando)
            return $this->responseJson($data);

        }catch (\Exception $ex){
            if($escapeThrow === true) throw $ex;
            return $this->responseJsonError($ex->getMessage(), $ex->getCode());
        }

    }

    public function check_token(Request $request) : JsonResponse{

        $authorization = explode(':', $request->header('TokenUser', ''));
        if (count($authorization) < 3) $this->responseJsonError('Token inválido!', 401);

        $user_id = intval($authorization[0]);
        $token_api = $authorization[1];
        $app_key = $authorization[2];

        if ($user_id <= 0 || strlen($token_api) <= 0 || strlen($app_key) <= 0)
            return $this->responseJsonError('Token inválido!', 401);

        try{
            AplicacaoAcessoToken::check($user_id, $token_api, $app_key);
            return $this->responseJsonSucess(Constantes::MSG_SUCCESS);
        }catch (\Exception $ex){
            return $this->responseJsonError($ex->getMessage(), $ex->getCode());
        }

    }

    public function check_app_versao(Request $request) : JsonResponse{
        try{
            $aplicacao = AplicacaoRepository::check($request->get('codigo', ''));
            if($aplicacao == null)
                return $this->responseJsonError('Aplicação não econtrada!', 404);

            $versao_app = $aplicacao->versao;
//            if(intval($request->os) == Constantes::SYS_IOS)
//                $versao_app = $aplicacao->versao_ios;

            if(intval($request->versao) < $versao_app)
                return $this->responseJsonError('Aplicação desatualizada!');

            return $this->responseJsonSucess(Constantes::MSG_SUCCESS);

        }catch(\Exception $ex){
            return $this->responseJsonError($ex->getMessage(), $ex->getCode());
        }
    }

    public function cadastro_aluno(Request $request) : JsonResponse{
        try{

            $app = $this->validate_aplicacao($request);
            $repository = new AlunoRepository();
            $params = $request->all();
            $obj = $repository->createAlunoAndUser($params, true);

            return $this->cadastro_externo($request, $obj, $app);

        }catch (ValidationException $ex){
            return $this->responseJsonErrorData($ex->getMsg(), $ex->getErros(), $ex->getCode());
        }catch (\Exception $ex){
            return $this->responseJsonError($ex->getMessage(), $ex->getCode());
        }
    }


    private function cadastro_externo(Request $request, AppModel $obj, Aplicacao $app) : JsonResponse{

        AplicacaoAcessoLog::createDefault(1, $request->path(), $request->method(), $request->except(['usuario_session_id', 'token_api', '__token_id', 'senha', 'app_key']));
        $data = $obj->toFullArray();

        //comentado pq deve ativar o cadastrado via email...
//        if($request->get('run_login', Constantes::NAO) == Constantes::SIM){
//            $data = $obj->usuario->toLoginArray($app->id);
//            if($request->get('long_token', Constantes::NAO) == Constantes::SIM)
//                $data['token'] = $obj->usuario->getLongToken();
//
//            $at = AplicacaoAcessoToken::createDefault($data['id'], $data['token'], $app->id);
//            $data['token'] = $at->token;
//        }

        return $this->responseJson($data);

    }

    public function recuperarSenha(Request $request) {

        $request->validate([
            'email' => 'required|email',
        ]);

        if(!Usuario::where('email', $request->email)->exists())
            throw new \Exception('Usuário não econtrado!', 401);

        $status = Password::sendResetLink(
            ['email' => $request->email]
        );

        if($status === Password::RESET_LINK_SENT){
            return $this->responseJsonSucess('E-mail de recuperação de senha enviado');
        }

        return $this->responseJsonError('Erro ao enviar E-mail de recuperação de senha!');

    }

    public function resetarSenha(Request $request){
        $request->validate([
            'token' => 'required',
            'email' => ['required', 'email'],
            'senha' => 'required|min:6|max:100',
        ]);

        $values = $request->only('email', 'senha', 'token');
        Util::replaceKey($values, 'senha', 'password');

        $status = Password::reset(
            $values,
            function (Usuario $user, string $password) {
                $user->forceFill([
                    'senha' => Hash::make($password)
                ])->setRememberToken(Str::random(60));

                $user->save();
            }
        );

        if($status === Password::PASSWORD_RESET){
            return $this->responseJsonSucess('Senha atualizada com sucesso!');
        }

        return $this->responseJsonError('Erro ao atualizar sua senha verifique os dados informados ou solicite uma nova recuperação de senha!');

    }


    public function verificarEmail(CustomEmailVerificationRequest $request){
        $request->fulfill();
        return redirect(env('APP_WEB_URL').'/auth/login?validacao=1');
    }
}
