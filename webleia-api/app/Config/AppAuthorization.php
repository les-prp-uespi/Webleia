<?php


namespace App\Config;


use Illuminate\Http\Request;

class AppAuthorization extends Authorization {

    /**
     * @var AppAuthorization|null
     */
    private static ?AppAuthorization $instance = null;
    private array $userProfiles;

    private function __construct($userProfiles = []){
        $this->userProfiles = $userProfiles;
        $this->data = [];
        $this->init();
    }

    public static function getInstance($userProfiles = array()) : AppAuthorization{
        if(static::$instance == null)
            static::$instance = new AppAuthorization($userProfiles);
        return static::$instance;
    }

    public function init(){

        $this->superAdminGroup = Constantes::PERFIL_ADMIN;

        //livre para todos

        $this->addController('', 'LoginController');
        $this->addAction('', 'GrauInstrucaoController', 'all'); //para todos
        $this->addAction('', 'InstituicaoEnsinoController', 'all'); //para todos
        $this->addAction('', 'CidadeController', 'all'); //para todos

        if(empty($this->userProfiles)) return;

        if(in_array(Constantes::PERFIL_ALUNO, $this->userProfiles)){
            $this->addController('', 'AlunoController', Constantes::PERFIL_ALUNO);
            $this->addController('', 'UsuarioController', Constantes::PERFIL_ALUNO);
            $this->addController('', 'ProducaoTextualController', Constantes::PERFIL_ALUNO);
            $this->addController('', 'ProducaoTextualRespostaController', Constantes::PERFIL_ALUNO);
            $this->addAction('', 'GeneroTextualController', 'all', Constantes::PERFIL_ALUNO);
            $this->addAction('', 'PerguntaController', 'all', Constantes::PERFIL_ALUNO);
            $this->addAction('', 'CategoriaPerguntaController', 'all', Constantes::PERFIL_ALUNO);
        }

    }

    public function can(Request $request) : bool {

        if($this->isAuthorized($request, 'L')) return true; //livre para todos

        if(empty($this->userProfiles)) return false;

        foreach ($this->userProfiles as $p) {
            if($this->isAuthorized($request, $p))
                return true;
        }

        return false;

    }

}
