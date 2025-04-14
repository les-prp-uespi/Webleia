<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class ProducaoTextual extends AppModel {
    use SoftDeletes;
    protected $table = 'producao_textual';

    protected $hidden = ['texto']; //para diminuir o retorno

    const ST_NAO_INICIADO = 0;
    const ST_EM_ANDAMENTO = 1;
    const ST_FINALIZADO   = 2;

    public static $validations = [
        'titulo' => 'required',
        'genero_textual_id' => 'required|exists:genero_textual,id,publicado,1',
        'usuario_id' => 'required|exists:usuario,id',
        'status' => 'required|numeric|gt:-1',
        'min_palavras' => 'required|numeric|gt:0',
        'max_palavras' => 'required|numeric|gt:min_palavras',
    ];

    public function genero_textual() { return $this->belongsTo(GeneroTextual::class, 'genero_textual_id')->withTrashed(); }
    public function usuario() { return $this->belongsTo(Usuario::class, 'usuario_id')->withTrashed(); }

    public function respostas(){
        return $this->hasMany(ProducaoTextualResposta::class);
    }

    public function getAlunoIdAttribute(){
        return $this->usuario->aluno_id;
    }

    public function toFullArray(): array {
        $data = $this->toArray();
        $data['texto'] = $this->texto;
        return $data;
    }

}
