<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class GrauInstrucao extends AppModel {
    use SoftDeletes;
    protected $table = 'grau_instrucao';

    public static $validations = [
        'nome' => 'required',
    ];

}
