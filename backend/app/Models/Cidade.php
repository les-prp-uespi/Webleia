<?php

namespace App\Models;

class Cidade extends AppModel {

    protected $table = 'cidade';

    public static $validations = [
        'nome' => 'required',
        'uf' => 'required|max:2',
    ];

    public function __toString() {
        return "{$this->nome} - {$this->uf}";
    }

}
