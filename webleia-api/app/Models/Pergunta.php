<?php

namespace App\Models;

use Illuminate\Database\Eloquent\SoftDeletes;

class Pergunta extends AppModel {
    use SoftDeletes;
    protected $table = 'pergunta';

    const TP_TEXT = 1;
    const TP_NUMBER = 2;
    const TP_SELECAO_UNICA = 3;
    const TP_SELECAO_MULTIPLA = 4;

    public static $validations = [
        'titulo' => 'required',
        'descricao' => 'required',
        'tipo' => 'required|numeric|gt:0',
        'ordem' => 'required|numeric|gt:0',
        'resposta_texto_final' => 'required|numeric|gt:-1',
        'genero_textual_id' => 'required|exists:genero_textual,id',
        'categoria_pergunta_id' => 'required|exists:categoria_pergunta,id',
    ];

    public function genero_textual() { return $this->belongsTo(GeneroTextual::class); }
    public function categoria_pergunta() { return $this->belongsTo(CategoriaPergunta::class); }

    public function anexos() {
        return $this->hasMany(Anexo::class, 'relacionado_id')
            ->where('relacionado_model', $this->table);
    }

    public function itens() { return $this->hasMany(ItemPergunta::class, 'pergunta_id')->orderBy('ordem'); }

    public function getItensString($sep = "\n") {
        return $this->itens()->chunkMap(fn($it) => $it->descricao)->join($sep);
    }

    public function hasItens(): bool{
        return $this->itens()->count() > 0;
    }

    public static function listarTipos($firstOption = ''): array {

        $list = array();

        if (strlen($firstOption) > 0)
            $list[''] = $firstOption;

        $list[self::TP_TEXT] = "Campo de Texto";
        $list[self::TP_NUMBER] = "Campo Numérico";
        $list[self::TP_SELECAO_UNICA] = "Seleção Única";
        $list[self::TP_SELECAO_MULTIPLA] = "Múltipla Seleção";

        return $list;
    }

    public static function buscarTipo($id): string {
        return match ($id) {
            self::TP_TEXT => 'Campo de Texto',
            self::TP_NUMBER => 'Campo Numérico',
            self::TP_SELECAO_UNICA => 'Seleção Única',
            self::TP_SELECAO_MULTIPLA => 'Múltipla Seleção',
            default => "",
        };
    }

    public function getTipoSAttribute(): string{
        return static::buscarTipo($this->tipo);
    }

    public function getTipoInputAttribute(): string{
        return static::buscarTipoInput($this->tipo);
    }

    public function isTipoSelecao(): bool{
        return in_array($this->tipo, [self::TP_SELECAO_UNICA, self::TP_SELECAO_MULTIPLA]);
    }

}
