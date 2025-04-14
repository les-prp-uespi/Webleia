<?php

namespace App\Database;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Str;

class AppBuilder extends Builder {

    protected ?string $from_alias = '';

    public function from($table, $as = null){
        if($as != null) $this->from_alias = $as;
        else $this->from_alias = Str::after($table, 'as ');
        return parent::from($table, $as);
    }

    public function getTableAliasFrom(): string{
        if(!empty($this->from_alias)) return  $this->from_alias;
        if(is_string($this->from)) return $this->from;
        return '';
    }

    public function getColumnWithTableName(string $column): string{
        $tb = $this->getTableAliasFrom();
        if(!empty($tb)) $column = $tb.".".$column; //colocando o nome tabela.coluna automaticamente
        return $column;
    }

    public function where($column, $operator = null, $value = null, $boolean = 'and'){
        if(is_string($column) && !str_contains($column, ".")){
            $column = $this->getColumnWithTableName($column);
        }
        return parent::where($column, $operator, $value, $boolean);
    }


}
