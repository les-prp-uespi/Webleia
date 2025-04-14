<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class InstituicaoEnsino extends AppModel {
    use SoftDeletes;
    protected $table = 'instituicao_ensino';

    public static $validations = [
        'nome' => 'required',
        'inep' => 'required',
        'sigla' => 'required',
        'cidade_id' => 'required|exists:cidade,id',
    ];

    public function cidade() { return $this->belongsTo(Cidade::class, 'cidade_id'); }

}
