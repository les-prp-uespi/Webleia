<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

/**
 * @param string $className
 * @param string $prefix
 * @param string $namespace
 * @param string $middleware
 * @param Closure|null $callback
 */
function routeList(string $className, string $prefix, string $namespace = '', $middleware = '', \Closure $callback = null){

    $params = ['prefix' => $prefix];
    if(!empty($namespace)) $params['namespace'] = $namespace;
    if(!empty($middleware)) $params['middleware'] = $middleware;

    Route::group($params, function() use ($className, $callback) {
        Route::get('', $className.'@all');
        Route::get('count', $className.'@count');
        Route::get('{id}', $className.'@find')->where('id', '[0-9]+');
        if(is_callable($callback))
            $callback($className);
    });

}

/**
 * @param string $className
 * @param string $prefix
 * @param string $namespace
 * @param mixed $middleware
 * @param Closure|null $callback
 */
function routeCrud(string $className, string $prefix, string $namespace = '', mixed $middleware = '', \Closure $callback = null, $withStatusRestore = true){

    routeList($className, $prefix, $namespace, $middleware, function(String $_className) use ($callback, $withStatusRestore){

        Route::post('', $_className.'@save');
        Route::put('{id}', $_className.'@update')->where('id', '[0-9]+');
        Route::delete('{id}', $_className.'@delete')->where('id', '[0-9]+');

        if($withStatusRestore){
            Route::post('restore/{id}', $_className.'@restore')->where('id', '[0-9]+');
            Route::post('status/{id}/{status}', $_className.'@status')->where('id', '[0-9]+');
        }

        if(is_callable($callback))
            $callback($_className);

    });

}

Route::get('/', function () {
    return "Api Web Leia";
});

Route::group(['prefix' => 'api/acesso'], function (){
    Route::post('login', 'LoginController@run');
    Route::post('recuperar_senha', 'LoginController@recuperarSenha');
    Route::post('resetar_senha', 'LoginController@resetarSenha');
    Route::post('check_token', 'LoginController@check_token');
    Route::post('check_app_versao', 'LoginController@check_app_versao');
    Route::get('verificar/{id}/{hash}', 'LoginController@verificarEmail')->name('verification.verify');
});

Route::group(['prefix' => 'cadastro'], function (){
    Route::post('aluno', 'LoginController@cadastro_aluno');
});

routeCrud('UsuarioController','usuarios');
routeCrud('AlunoController','alunos');
routeCrud('GrauInstrucaoController','graus_instrucao');
routeCrud('InstituicaoEnsinoController','instituicoes_ensino');
routeCrud('GeneroTextualController','generos_textuais');
routeCrud('AnexoController','anexos');
routeCrud('CategoriaPerguntaController','categorias_pergunta');
routeCrud('PerguntaController','perguntas');
routeCrud('ProducaoTextualController','producoes_textual');
routeCrud('ProducaoTextualRespostaController','producao_textual_respostas');

Route::post('alunos/createAlunoAndUser', 'AlunoController@createAlunoAndUser');
Route::post('producao_textual_respostas/uso_texto_final', 'ProducaoTextualRespostaController@usoTextoFinal');
Route::get('cidades', 'CidadeController@all');
Route::post('usuarios/alterar_senha', 'UsuarioController@alterarSenha');
Route::post('producoes_textual/clone/{id}', 'ProducaoTextualController@clone')->where('id', '[0-9]+');
Route::post('producoes_textual/export/{id}', 'ProducaoTextualController@export')->where('id', '[0-9]+');
Route::get('producoes_textual/ranking', 'ProducaoTextualController@ranking');
Route::get('alunos/ranking', 'AlunoController@ranking');
Route::get('perguntas/all_tipos', 'PerguntaController@allTipos');

Route::get('dash/counts', 'DashController@counts');
