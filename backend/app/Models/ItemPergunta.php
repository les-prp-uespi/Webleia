<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ItemPergunta extends AppModel {

    protected $table = 'item_pergunta';
    public $timestamps = false;

    public static $validations = [
        'descricao' => 'required',
        'ordem' => 'required|numeric|gt:0',
        'pergunta_id' => 'required|exists:pergunta_form_avaliacao,id',
    ];

    public function pergunta() { return $this->belongsTo(Pergunta::class, 'pergunta_id'); }

}
