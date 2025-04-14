<?php

namespace App\Models;

use Illuminate\Database\Eloquent\SoftDeletes;

class GeneroTextual extends AppModel {
    use SoftDeletes;
    protected $table = 'genero_textual';

    public static $validations = [
        'nome' => 'required',
        'publicado' => 'required|numeric|gt:-1',
        'min_palavras' => 'required|numeric|gt:0',
        'max_palavras' => 'required|numeric|gt:min_palavras',
    ];

    public function anexos() {
        return $this->hasMany(Anexo::class, 'relacionado_id')
            ->where('relacionado_model', $this->table);
    }

    public function perguntas() {
        return $this->hasMany(Pergunta::class)
            ->orderBy('ordem');
    }

    public function categorias_pergunta() {
        return $this->hasMany(CategoriaPergunta::class);
    }

}
