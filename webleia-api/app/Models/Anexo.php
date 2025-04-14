<?php

namespace App\Models;

use App\Storage\MobiStorage;
use App\Util\Util;
use Illuminate\Support\Facades\File;

class Anexo extends AppModel {
    protected $table = 'anexo';

    const TP_PDF = 1;
    const TP_IMG = 2;
    const TP_URL = 3;

    public static $validations = [
        'nome' => 'required',
        'arquivo' => 'required|url',
        'relacionado_id' => 'required',
        'relacionado_model' => 'required',
        'tipo' => 'required|numeric|gt:0',
        'usuario_id' => 'required|exists:usuario,id',
    ];

    public function usuario() { return $this->belongsTo(Usuario::class); }

    public function getRelacionadoHumanAttribute(){
        return Util::getModelHuman($this->relacionado_model);
    }

    public function getArquivoNomeAttribute():string{
        return $this->nome.'.'.strtolower(File::extension($this->arquivo));
    }

    public function getRelacionadoAttribute(){
        $md = Util::getModelAnexo($this->relacionado_model);
        return $md::find($this->relacionado_id);
    }

    protected static function booted() {
        static::deleted(function (Anexo $anexo) {
            MobiStorage::makeDefault()->remove($anexo->arquivo);
        });
    }

    public function checkUser(?Usuario $usuario): bool {
        return $usuario != null && $usuario->is_admin;
    }

    public static function tiposExtensoes(int $tipo) {
        return match ($tipo){
            self::TP_PDF => ['pdf'],
            self::TP_IMG => ["jpg", "png", "jpeg"],
        };
    }

    public static function getNanoSelect($tb_name = ''): array{
        if(!empty($tb_name)) $tb_name .= '.';
        return [
            $tb_name.'id',
            $tb_name.'nome',
            $tb_name.'arquivo',
            $tb_name.'tipo',
            $tb_name.'usuario_id',
            $tb_name.'created_at',
            $tb_name.'updated_at'
        ];
    }
}
