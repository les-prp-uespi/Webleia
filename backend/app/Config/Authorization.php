<?php


namespace App\Config;


use Illuminate\Http\Request;
use Illuminate\Support\Str;

abstract class Authorization {

    protected $data;
    protected $superAdminGroup = 0;

    /**
     * Retorna o array montado com as autorizacoes
     * @return array
     */
    protected function getData() {
        return $this->data;
    }

    /**
     * Adicionar todos os controllers de um namespace para
     * um determinado grupo de usuarios
     * @param String $namespace Nome do Namespace
     * @param int $group Grupo de Usuario
     */
    public function addNamespace($namespace, $group = "L") {
        $this->data[$group][$namespace]['_all']['_all'] = true;
    }

    /**
     * Adicionar todos as actions de um controller para
     * um determinado grupo de usuarios
     * @param String $namespace Nome do Namespace
     * @param String $controller Nome do Controller
     * @param int $group Grupo de Usuario
     */
    public function addController($namespace = '', $controller = '', $group = "L") {
        $this->data[$group][$namespace][$controller]['_all'] = true;
    }

    /**
     * Adicionar uma action especifico de um controller para
     * um determinado grupo de usuarios
     * @param String $namespace Nome do Namespace
     * @param String $controller Nome da Action
     * @param String $action Nome do Action
     * @param int $group Grupo de Usuario
     */
    public function addAction($namespace = '', $controller = '', $action = '', $group = "L") {
        $this->data[$group][$namespace][$controller][$action] = true;
    }

    /**
     * Verifica se o usuario pode acessar o action da controller
     * @param Request $request
     * @param int $group Grupo de Usuario
     * @return true|false
     */
    public function isAuthorized(Request $request, $group) {

        if(intval($this->superAdminGroup) > 0 && $this->superAdminGroup == $group)
            return true;

        if(isset($this->data[$group])){

            $route = $request->route()->action['uses'] ?? '';

            if(empty($route)) return false;

            if(Str::contains($route, 'App\\Modules', true)){ //modulos
                $route = str_ireplace(['App\\Modules\\', 'Controllers\\'], ['', ''], $route);
            }
            $route = explode('\\', preg_replace(['/([a-z0-9_\\\]+)Controllers\\\/i', '/@/'], ['', '\\'], $route)); //limpando

            $num_parts = count($route);
            $a = $route[--$num_parts];
            $c = $route[--$num_parts];
            $n = $num_parts > 0 ? $route[--$num_parts] : '';

            $c = isset($this->data[$group][$n]['_all']) ? '_all' : $c;
            $a = isset($this->data[$group][$n][$c]['_all']) ? '_all' : $a;

//            var_dump($this->data, $route, $a, $c, $n); die();

            return isset($this->data[$group][$n][$c][$a]);

        }

        return false;
    }

    /**
     * Metodo que deve ser implementado com as autorizacoes iniciais
     *
     * @return void
     * @author
     **/
    protected abstract function init();

}
