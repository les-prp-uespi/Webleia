<?php


namespace App\Repository;


use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;
use Illuminate\Support\Arr;
use Illuminate\Support\Str;
use App\Config\Constantes;
use App\Models\AppModel;
use App\Models\Usuario;
use App\Util\Util;

abstract class BaseListRepository {

    /**
     * @var AppModel
     */
    protected AppModel $model;

    /**
     * @var ?Usuario
     */
    protected ?Usuario $userSession;

    /**
     * Flag para verificar o objeto no find e delete
     * @var boolean
     */
    static protected $checkPerfilObj = true;

    static protected $orderDefault = 'id';
    static protected $sortDefault  = 'asc';

    public function __construct(?Usuario $userSession = null){
        $this->userSession = $userSession;
        $this->setupModel();
    }

    public function hasUser(): bool{
        return $this->userSession != null;
    }

    protected abstract function setupModel();

    public function getModel() {
        return $this->model;
    }

    public function __get($name) {
        if($name == 'table_name' || $name == 'tableName')
            return $this->model->getTable();
        if($name == 'model_name' || $name == 'model_name')
            return $this->model->getShortClassName();
        return null;
    }

    protected function __get_pk_count(Builder $builder): string{
        return $builder->from.'.'.$this->model->getKeyName();
    }

    /**
     * @param Request $request
     * @param array|string $select
     * @return mixed
     */
    public function all(Request $request, array|string $select = '') {

        $query = (Constantes::SIM == $request->get('onlyTrashed', Constantes::NAO)) ? $this->model::onlyTrashed() : $this->model::query();

        $this->setupRelations($query, $request);
        $this->setupOrder($query, $request);
        $this->where($query, $request);

        if(!empty($select)) $query->select($select);

        $limit = $request->get('limit', Constantes::LIMIT_DEFAULT);
        return $this->afterAll($request, $limit > 0 ? $query->paginate($limit) : $query->get());

    }

    protected function afterAll(Request $request, $data){ return $data; }

    protected function setupOrder(Builder &$query, Request $request): void{

        $order = $request->get('order', static::$orderDefault);
        if(empty($order)) return;
        if(!is_array($order)) $order = [$order];

        $sort = $request->get('sort', static::$sortDefault);
        if(!is_array($sort)) $sort = [$sort];

        foreach ($order as $i => $o){
            $metodo = strpos($o, ".")? "orderByPowerJoins" : "orderBy";
            $query->{$metodo}($o, $sort[$i] ?? static::$sortDefault);
        }

    }

    protected function existsRelationInWith(array $withRelations, string $relation){
        return Arr::first($withRelations, function($it) use ($relation){
            //pode ser o padrao relacao sozinha ou com dependencias
            //exemplo escola ou escola.empresa
            return Str::startsWith($it, $relation);
        });
    }

    protected function setupRelations(Builder &$query, Request $request): void{
        $withRelations = $this->withRelations($request);
        if(!empty($withRelations)) $query->with($withRelations);

        $withCountRelations = $this->withCountRelations($request);
        if(!empty($withCountRelations)) $query->withCount($withCountRelations);
    }

    protected function with(string $key, Request $request, bool $excludeNoRelation = true): array{
        $with = $request->get($key, []);
        if(empty($with)) return [];
        if(is_string($with)) $with = explode(",", $with);

        if(!$excludeNoRelation) return $with;

        return array_filter($with, function($it){
            $parts = explode(".", $it);
            return $this->model->isRelation($parts[0]);
        });

    }

    protected function withRelations(Request $request, bool $excludeNoRelation = true): array{
        return $this->with('with', $request, $excludeNoRelation);
    }

    protected function withCountRelations(Request $request, bool $excludeNoRelation = true): array{
        return $this->with('withCount', $request, $excludeNoRelation);
    }

    /**
     * @param Request $request
     * @return int
     */
    public function count(Request $request) : int{

        $query = $this->model::query();
        $this->where($query, $request);

        return $query->selectRaw('COUNT('.$this->__get_pk_count($query).') as total')->first()->total;

    }

    /**
     * @param mixed $id
     * @param bool $trashed
     * @param string $field default id
     * @return AppModel
     * @throws \Exception
     */
    public function find(mixed $id, bool $trashed = false, string $field = '') : AppModel{

        if(empty($field)) $field = $this->model->getKeyName();

        $obj = !$trashed ? $this->model::where($field, $id) : $this->model::withTrashed()->where($field, $id);

        $request = request();
        $this->setupRelations($obj, $request);
        $obj = $obj->first();

        if($obj == null)
            throw new \Exception($this->model_name.' não encontrado(a)!', 404);

        if(static::$checkPerfilObj && !$obj->checkUser($this->userSession))
            throw new \Exception(Constantes::MSG_NO_PERMISSION, 401);

        return $this->afterFind($request, $obj);

    }

    protected function afterFind(Request $request, $obj){ return $obj; }

    protected function groupBy(string $select, string $group, Request $request, ?\Closure $fnQuery = null) {
        $query = (Constantes::SIM == $request->get('onlyTrashed', Constantes::NAO)) ? $this->model::onlyTrashed() : $this->model::query();

        $this->setupRelations($query, $request);
        $this->where($query, $request);
        $query
            ->selectRaw($select.', COUNT('.$this->__get_pk_count($query).') as total')
            ->groupByRaw($group);

        static::$orderDefault = 'total';
        static::$sortDefault = 'asc';
        $this->setupOrder($query, $request);

        if($fnQuery != null) $fnQuery($query);

        $limit = $request->get('limit', Constantes::LIMIT_DEFAULT);
        return $limit > 0 ? $query->paginate($limit) : $query->get();
    }

    protected function avgBy(string $select, string $group, Request $request) {
        $query = $this->model::query();
        $this->setupRelations($query, $request);
        $this->where($query, $request);
        $query
            ->selectRaw($select.', AVG('.$this->__get_pk_count($query).') as media');

        static::$orderDefault = 'media';
        static::$sortDefault = 'asc';
        $this->setupOrder($query, $request);

        $limit = $request->get('limit', Constantes::LIMIT_DEFAULT);
        return $limit > 0 ? $query->paginate($limit) : $query->get();
    }

    /**
     * @param Builder $query
     * @param Request $request
     */
    protected function where(Builder &$query, Request $request) {}

    protected function whereDates(Builder &$query, Request $request, string $field, $param_inicio = 'data_ini', $param_fim = 'data_fim', $is_datetime = false){

        $data_ini = trim($request->get($param_inicio, ''));
        $data_fim = trim($request->get($param_fim, ''));
        $has_ini = strlen($data_ini) > 0;
        $has_fim = strlen($data_fim) > 0;

        $data_ini = Util::stringToDate($data_ini);
        $data_fim = Util::stringToDate($data_fim);

        if($is_datetime){
            //mandaram soh a data
            if($has_ini && strlen($data_ini) == 10) $data_ini .= " 00:00:00";
            if($has_fim && strlen($data_fim) == 10) $data_fim .= " 23:59:59";
        }

        if($has_ini) $query->where($field, '>=', $data_ini);
        if($has_fim) $query->where($field, '<=', $data_fim);

    }

    /**
     * @param Builder $query
     * @param Request $request
     * @param string $requestKey chave dos paramatros no request
     * @param string $relationKey chave do nome da relacao (default igual $requestKey)
     * @param Usuario|null $userSession
     * @param bool $setDatabaseName se deve setar o nome do banco na query, para fins de bancos diferentes (default false)
     * @param bool $hasOrDont
     * @return void
     */
    protected static function relationWhere(Builder &$query, Request $request, string $requestKey, string $relationKey = '', ?Usuario $userSession = null, bool $setDatabaseName = false, bool $hasOrDont = true): void{
        $rel_filters = $request->get($requestKey, []);
        if(empty($relationKey)) $relationKey = $requestKey;
        if($userSession != null || (!empty($rel_filters) && is_array($rel_filters))){

            $met = $hasOrDont ? 'whereHas' : 'whereDoesntHave';
            $query->{$met}($relationKey, function(Builder $q) use ($rel_filters, $userSession, $setDatabaseName){

                $repository = new static($userSession);
                $request = new Request();

                //para fins de relacoes com bancos diferentes
                if($setDatabaseName) $q->from($repository->getModel()->getDatabaseWithTableName(), $repository->getModel()->getTable());
                $repository->where($q, $request->merge($rel_filters));

            });
        }
    }
}
