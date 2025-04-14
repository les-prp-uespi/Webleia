<?php


namespace App\Config;


class Constantes {

    const LIMIT_DEFAULT = 10;

    /** Tamanho maixmo de imagem em bytes **/
    const MAX_SIZE_IMG = 1024 * 2; # 2 MB

    /** Tamanho maixmo de arquivo em kilobytes **/
    const MAX_SIZE_FILE = 1024*10; # 10 MB

    const APP_FOLDER = 'webleia/';

    const MSG_SUCCESS = "Operação Realizada Com Sucesso";
    const MSG_NO_PERMISSION = "Você não pode realizar essa operação";
    const MSG_NO_ACCESS = "Você não tem acesso a essa página";
    const MSG_NO_EXIST = "Esse conteúdo não existe";

    //Constantes de Status Comum
    const ATIVO       = 1;
    const INATIVO     = 0;

    //Constantes Sim/Nao
    const SIM = 1;
    const NAO = 0;

    /** Perfis de Usuario **/
    const PERFIL_ADMIN      = 1; // Admin
    const PERFIL_ALUNO      = 2; // Aluno

    const TEMPO_LIMITE_API = 120; // 2hs
    const TEMPO_LIMITE_LONGO_API = 43200; // 1 mes

    const API_VERSION = 4;

    /** Tipos de OS **/
    const SYS_UNKNOWN = 0;
    const SYS_ANDROID = 1;
    const SYS_IOS     = 2;

    const TOKEN_OPEN = 'AczuZRcuMfZJFhmSBDDyD9I1902bZVEnKmj4aiVU0l5cvpubHIIU8fRBEM1v4Bsu';

    /** Funcoes Abaixo */
    public static function listarAtivoInativo($firstOption = '') {

        $list = array();

        if (strlen($firstOption) > 0)
            $list[''] = $firstOption;

        $list[self::ATIVO] = "Ativo";
        $list[self::INATIVO] = "Inativo";

        return $list;
    }

    public static function buscarAtivoInativo($id) {
        return match ($id) {
            self::ATIVO => 'Ativo',
            self::INATIVO => 'Inativo',
            default => "",
        };
    }

    public static function listarPerfisUsuario($firstOption = '') {

        $list = array();

        if (strlen($firstOption) > 0)
            $list[''] = $firstOption;

        $list[self::PERFIL_ADMIN] = "Administrador";

        return $list;
    }

    public static function buscarPerfilUsuario(int $id) {
        switch ($id) {
            case self::PERFIL_ADMIN : return 'Administrador';
            default : return "";
        }
    }

    public static function buscarSimNao(int $id) {
        return match ($id) {
            self::SIM => 'Sim',
            self::NAO => 'Não',
            default => "",
        };
    }

}
