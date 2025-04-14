<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class CategoriaPergunta extends AppModel {
    use SoftDeletes;
    protected $table = 'categoria_pergunta';

    public static $validations = [
        'nome' => 'required',
        'descricao' => 'required',
        'ordem' => 'required|numeric|gt:0',
        'genero_textual_id' => 'required|exists:genero_textual,id',
    ];

    public function genero_textual() { return $this->belongsTo(GeneroTextual::class); }

    public function perguntas() {
        return $this->hasMany(Pergunta::class)
            ->orderBy('ordem');
    }

}
