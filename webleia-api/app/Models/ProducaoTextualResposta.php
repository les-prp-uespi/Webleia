<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Validation\Rule;

class ProducaoTextualResposta extends AppModel {

    use SoftDeletes;
    protected $table = 'producao_textual_resposta';

    public static $validations = [
        'resposta' => 'required',
        'producao_textual_id' => ['required','exists:producao_textual,id'],
        'pergunta_id' => 'required|exists:pergunta,id',
    ];

    public function getValidations(array $data = [], int $id = 0): array {

        $base = static::$validations;
        $base['producao_textual_id'][] = Rule::unique($this->table, 'producao_textual_id')
            ->where(fn ($query) => $query
                ->where('pergunta_id', $data['pergunta_id'] ?? 0)
            )
            ->ignore($id);

        return $base;
    }

    public function producao_textual() { return $this->belongsTo(ProducaoTextual::class, 'producao_textual_id')->withTrashed(); }
    public function pergunta() { return $this->belongsTo(Pergunta::class, 'pergunta_id')->withTrashed(); }

    public function checkUser(?Usuario $usuario): bool {
        return $this->producao_textual->checkUser($usuario);
    }

    public function toArray(): array {
        $data = parent::toArray();
        if(isset($data['pergunta_id']) && $this->pergunta->isTipoSelecao()){
            $respostas = ItemPergunta::where('pergunta_id', $this->pergunta_id)
                ->whereIn('id', explode(",", $this->resposta))
                ->orderBy('ordem')
                ->get(['id', 'descricao']);

            $data['respostas_string'] = implode(",", $respostas->map(fn($it) => $it->descricao)->toArray());
            $data['itens'] = $respostas->toArray();

        }
        return $data;
    }

}
