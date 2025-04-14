<?php

namespace App\Models;

use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Validation\Rule;

class Aluno extends AppModel {
    use SoftDeletes;
    protected $table = 'aluno';

    public static $validations = [
        'nome' => 'required',
        'email' => 'required|email|unique:aluno,email',
        'uf' => 'required',
        'cpf' => ['nullable', 'cpf'],
        'grau_instrucao_id' => 'required|exists:grau_instrucao,id',
        'instituicao_ensino_id' => 'nullable|exists:instituicao_ensino,id',
    ];

    public function getValidations(array $data = [], int $id = 0): array {

        $base = static::$validations;

        if(!empty($data['cpf'])){
            $base['cpf'][] = Rule::unique($this->table, 'cpf')
                ->where(fn ($query) => $query->whereNotNull('cpf'))
                ->ignore($id);
        }

        return $base;
    }

    public function grau_instrucao() { return $this->belongsTo(GrauInstrucao::class, 'grau_instrucao_id')->withTrashed(); }
    public function instituicao_ensino() { return $this->belongsTo(InstituicaoEnsino::class, 'instituicao_ensino_id')->withTrashed(); }
    public function usuario() { return $this->hasOne(Usuario::class)->withTrashed(); }

    public function getAlunoIdAttribute(){
        return $this->id;
    }

    protected static function booted(){
        static::creating(function ($model) {
            if($model->bootValidate) $model->validate();
        });
        static::updating(function ($model) {
            if($model->bootValidate) $model->validate();
        });
        static::updated(function (Aluno $obj) {
            if($obj->usuario != null){
                $pms = ['nome' => $obj->nome];
                if(!empty($obj->email)) $pms['email'] = $obj->email;
                $obj->usuario->update($pms);
            }
        });
        static::deleted(function (Aluno $obj) {
            $obj->usuario?->delete();
        });
        static::restored(function (Aluno $obj) {
            $obj->usuario?->restore();
        });
    }
}
