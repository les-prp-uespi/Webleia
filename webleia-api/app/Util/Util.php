<?php


namespace App\Util;

use App\Models\GeneroTextual;

class Util {

    /**
     * FUNCAO PARA AJUSTAR VALOR DE 10.000,00 PARA 10000.00
     * */
    static function stringToFloat($valor) {

        if (!strpos($valor, ",") && !strpos($valor, "."))
            return $valor;

        $valor = str_replace(".", "", $valor);
        $valor = str_replace(",", ".", $valor);
        return $valor;
    }

    /**
     * FUNCAO PARA AJUSTAR VALOR DE 10000.00 PARA 10.000,00
     * */
    static function floatToString($valor) {

        if (!isset($valor) || strlen($valor) <= 0)
            return "0,00";

        $valor = str_replace(",", "", $valor);
        $valor = number_format($valor, 2, ',', '.');
        return $valor;
    }

    /**
     * FUNCAO PARA MOSTRAR A DATA NA TELA DE 2010-10-10 PARA 10/10/2010
     * */
    static function dateToString($data) {
        if ($data != '') {
            return (substr($data, 8, 2) . '/' . substr($data, 5, 2) . '/' . substr($data, 0, 4));
        } else {
            return '';
        }
    }

    /**
     * FUNCAO PARA GRAVAR A DATA NO BANCO DE  22:00 10/10/2010 PARA 2010-10-10 22:00
     * */
    static function stringToDateTime($data) {

        if (strlen($data) > 0 && stripos($data, '-') === false) {
            $data = explode(" ", $data);
            return self::stringToDate($data[1]) . " " . $data[0];
        }

        return $data;

    }

    /**
     * FUNCAO PARA GRAVAR A DATA NO BANCO DE  2010-10-10 22:00 PARA 22:00 10/10/2010
     * */
    static function dateTimeToString($data) {
        if ($data != '') {
            $data = explode(" ", $data);
            return $data[1] . " " . self::dateToString($data[0]);
        } else {
            return '';
        }
    }

    /**
     * FUNCAO PARA GRAVAR A DATA NO BANCO DE 10/10/2010 PARA 2010-10-10
     * */
    static function stringToDate($data) {
        if ($data != '' && stripos($data, '-') === false) {
            return (substr($data, 6, 4) . '-' . substr($data, 3, 2) . '-' . substr($data, 0, 2));
        }
        return $data;
    }

    /**
     * FUNCAO PARA GRAVAR A DATA NO BANCO DE 10-10-2010 PARA 2010-10-10
     * */
    static function slugToDate($data) {
        if (stripos($data, '/') !== false)
            return self::stringToDate($data);
        $data = explode('-', $data);
        return implode('-', array_reverse($data));
    }

    static function slugToDateString($data) {
        return str_replace('-', '/', $data);
    }

    static function dateToSlug($data) {
        return str_replace('/', '-', $data);
    }
    public static function listMonths(){
        return array(
            'Janeiro','Fevereiro','Março','Abril',
            'Maio','Junho','Julho','Agosto',
            'Setembro','Outubro','Novembro','Dezembro'
        );
    }

    public static function month($m, $abrv = true){
        $m = intval($m);
        switch ($m) {
            case 1:    return $abrv ? 'Jan' : 'Janeiro';
            case 2:    return $abrv ? 'Fev' : 'Fevereiro';
            case 3:    return $abrv ? 'Mar' : 'Março';
            case 4:    return $abrv ? 'Abr' : 'Abril';
            case 5:    return $abrv ? 'Mai' : 'Maio';
            case 6:    return $abrv ? 'Jun' : 'Junho';
            case 7:    return $abrv ? 'Jul' : 'Julho';
            case 8:    return $abrv ? 'Ago' : 'Agosto';
            case 9:    return $abrv ? 'Set' : 'Setembro';
            case 10:   return $abrv ? 'Out' : 'Outubro';
            case 11:   return $abrv ? 'Nov' : 'Novembro';
            case 12:   return $abrv ? 'Dez' : 'Dezembro';
        }

    }

    public static function dia($m, $abrv = true){
        $m = intval($m);
        switch ($m) {
            case 0:    return $abrv ? 'Dom' : 'Domingo';
            case 1:    return $abrv ? 'Seg' : 'Segunda';
            case 2:    return $abrv ? 'Ter' : 'Terça';
            case 3:    return $abrv ? 'Qua' : 'Quarta';
            case 4:    return $abrv ? 'Qui' : 'Quinta';
            case 5:    return $abrv ? 'Sex' : 'Sexta';
            case 6:    return $abrv ? 'Sab' : 'Sábado';
        }
        return '';
    }

    public static function dateMinDiff($d1, $d2, $modulo = false){

        $diff = $d2->diff($d1);
        $ch_dia = $diff->i;

        if($diff->days > 0)
            $ch_dia += $diff->days * 24 * 60;
        if($diff->h > 0)
            $ch_dia += $diff->h * 60;
        if($diff->s > 0)
            $ch_dia += $diff->s / 60;

        $ch_dia = ceil($ch_dia);
        if(!$modulo && $diff->invert == 1)
            $ch_dia = $ch_dia * -1;

        return intval($ch_dia);
    }

    public static function fileRemoteExists($url){
        $file_headers = @get_headers($url);
        return $file_headers[0] != 'HTTP/1.1 404 Not Found';
    }

    public static function toModelArray(array $data){
        $r = [];
        foreach ($data as $id => $vl){
            $r[] = ['id' => $id, 'descricao' => $vl];
        }
        return $r;
    }

    public static function replaceKey(array &$data, string $old, string $new){
        if(array_key_exists($old, $data)) {
            $data[$new] = $data[$old];
            unset($data[$old]);
        }
    }

    public static function clearDoc($doc){
        if($doc == null) return null;
        return preg_replace('/[^0-9]/', '', $doc);
    }

    public static function normalizeNome($str){
        if($str == null) return null;
        @setlocale(LC_ALL, 'en_US.UTF-8'); #bug em producao
        $str = strtoupper(iconv('UTF-8', 'ASCII//TRANSLIT', $str));
        return trim(preg_replace('/[^a-zA-ZÇç ]/u', '', $str));
    }

    public static function removeAcentos($str){
        if($str == null) return null;
        @setlocale(LC_ALL, 'en_US.UTF-8'); #bug em producao
        $str = strtoupper(iconv('UTF-8', 'ASCII//TRANSLIT', $str));
        return trim(preg_replace('/[^a-zA-ZÇç0-9- ]/u', '', $str));
    }

    public static function getModelHuman(string $name): string{
        return match ($name){
            'genero_textual' => 'Gênero Textual',
            'producao_textual' => 'Produção Textual',
            default => ucwords($name),
        };
    }

    public static function getModelAnexo(string $name): string{
        return match ($name){
            'genero_textual' => GeneroTextual::class,
//            'producao_textual' => GeneroTextual::class,
            default => ucwords($name),
        };
    }
}
