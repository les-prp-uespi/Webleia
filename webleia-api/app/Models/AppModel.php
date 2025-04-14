<?php

namespace App\Models;

use App\Database\AppBuilder;
use App\Util\Util;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;

/**
 * Class AppModel
 *
 * Classe generica para futuras abstrações
 *
 * @package App\Models\Base
 * @mixin Builder
 */
abstract class AppModel extends Model {

    /**
     * Guardando o id como default
     * @var array
     */
    protected $guarded = ['id'];

    /**
     * Array de validacoes pra usar no save
     * @var array
     */
    protected static $validations = [];

    protected bool $bootValidate = true;

    protected $hidden = ['deleted_at'];

    public $timestamps = true;

    protected static $tbColumns = [];

    /**
     * Validacoes, nao usar o metodo estatico publico, pq assim deixa mais flexivel
     * @param array $data parametros
     * @param int $id id
     * @return array
     */
    public function getValidations(array $data = [], int $id = 0): array {
        return static::$validations;
    }

    /**
     * Magno Leal modificado para o seguinte padrao:
     * Soh utiliza o visible caso seja um select contendo os campos dele ou seja um select padrao
     * Select especificos com group, count, etc, nao serao impactados
     * @return string[]
     */
    public function getVisible(): array {
        if(empty($this->visible)) return $this->visible;
        return array_merge(array_intersect($this->visible, array_keys($this->getAttributes())), $this->getQueueableRelations());
    }

    public static function getTableName() : string{
        return with(new static)->getTable();
    }

    public static function getDatabaseAndTableName() : string{
        return static::getDatabaseName().".".(with(new static)->getTable());
    }

    public function getDatabaseWithTableName() : string{
        return static::getDatabaseName().".".$this->getTable();
    }

    public static function getDatabaseName(): string{
        return env('DB_DATABASE', '');
    }

    public static function getPrimaryKey() : string{
        return with(new static)->primaryKey;
    }

    public function getIdAttribute(){
        return $this->attributes[$this->primaryKey] ?? null;
    }

    public function setIdAttribute($val): void{
        $this->attributes[$this->primaryKey] = $val;
    }

    public function getShortClassName(): string {
        return preg_replace('/^([\w\\\\]+\\\\)?([^\\\\]+)$/', '$2', get_class($this));
    }

    /**
     * Metodo pra fins de validacao se o usuario tem acesso ao objeto correspondente
     * @param Usuario $usuario
     * @return bool
     */
    public function checkUser(?Usuario $usuario) : bool {

        if ($usuario == null) return false;
        if ($usuario->is_admin) return true;
        if ($usuario->is_aluno && $this->aluno_id != $usuario->aluno_id) return false;

        return true;
    }

    public function toFullArray(): array{
        return $this->toArray();
    }

    public function toArray(): array {
        $fields = parent::toArray();
        if(array_key_exists('deleted_at', $fields) && is_null($fields['deleted_at'])) unset($fields['deleted_at']);
        return $fields;
    }

    protected function validate(){}

    protected static function booted() {
        static::creating(function ($model) {
            if($model->bootValidate) $model->validate();
        });
        static::updating(function ($model) {
            if($model->bootValidate) $model->validate();
        });
    }

    public function saveWhitoutValidations(array $options = []){
        $this->bootValidate = false;
        return parent::save($options);
    }

    public function updateWhitoutValidations(array $attributes = [], array $options = []){
        $this->bootValidate = false;
        return parent::update($attributes, $options);
    }

    public function replaceKey(array &$data, string $old, string $new){
        Util::replaceKey($data, $old, $new);
    }

    public function isGuarded($key){
        return !$this->hasSetMutator($key) && parent::isGuarded($key);
    }

    protected function isGuardableColumn($key){
        if (! isset(static::$guardableColumns[get_class($this)])) {
            $columns = $this->getConnection()
                ->getSchemaBuilder()
                ->getColumnListing($this->getTable());

            if (empty($columns)) {
                return true;
            }

            //tive que fazer isso, pq tem tabela na mobi com coluna com maiusculo
            static::$guardableColumns[get_class($this)] = array_map('strtolower', $columns);
        }

        return parent::isGuardableColumn($key);
    }

    protected function getColumns(): array{
        if (empty(static::$tbColumns)) {
            $tbColumns = $this->getConnection()
                ->getSchemaBuilder()
                ->getColumnListing($this->getTable());
            static::$tbColumns = array_map('strtolower', $tbColumns);
        }
        return static::$tbColumns;
    }

    protected function hasColumn($key): bool{
        $cols = $this->getColumns();
        return in_array($key, $cols);
    }

    public function newEloquentBuilder($query): AppBuilder {
        return new AppBuilder($query);
    }
}
