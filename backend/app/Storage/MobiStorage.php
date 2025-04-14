<?php

namespace App\Storage;

use App\Config\Constantes;

class MobiStorage{

    const URL_BASE = "https://www.mobifile.com.br/repo/";
    const DIR_BASE = "https://www.mobifile.com.br/files/";
    const KEY = "2E943EB546C8548F57B844C8BBA3D";

    /**
     * @var string
     */
    protected string $folderBase;

    public function __construct(string $folderBase = ''){
        $this->folderBase = $folderBase;
    }

    public static function make(string $folderBase = '') : MobiStorage{
        return new self($folderBase);
    }

    public static function makeDefault() : MobiStorage{
        return new self(Constantes::APP_FOLDER);
    }

    public function upload($file, $name, $folder = '', $max = 819200){ //800KB default
        if(empty($file))
            throw new \Exception("Arquivo não encontrado!");
        return static::send('sv', array('name' => $name, 'folder' => $this->folderBase.$folder, 'max' => $max), $file);
    }

    public function rotate($path, $graus){
        $path = str_replace(self::DIR_BASE,'', $path);
        return static::send('rt', array('path' => $path, 'graus' => $graus));
    }

    public function remove($path){
        $path = str_replace(self::DIR_BASE,'', $path);
        return static::send('rm', array('path' => $path));
    }

    public function thumb($path, $size = 150){
        $path = str_replace(self::DIR_BASE,'', $path);
        return static::send('tmb', array('path' => $path, 'size' => $size));
    }

    public function send($action, $data = array(), $file = NULL){
        $url = static::URL_BASE.$action.'.php';
        return static::request($url, $data, $file);
    }

    public function request($url, $params = array(), $file = NULL, $headers = array()) {

        $ch = curl_init($url);

        $post_params = array();
        foreach ($params as $key => $value) {
            if (is_array($value)) {
                $i = 0;
                foreach ($value as $item) {
                    $post_params[$key . "[$i]"] = $item;
                    $i++;
                }
            } else {
                $post_params[$key] = $value;
            }
        }
        if ($file) {
            if (!preg_match('/^@|^ftp:|^https?:|^s3:|^data:[^;]*;base64,([a-zA-Z0-9\/+\n=]+)$/', $file)) {
                if (function_exists("curl_file_create")) {
                    $post_params['file'] = curl_file_create($file);
                    $post_params['file']->setPostFilename($file);
                } else {
                    $post_params["file"] = "@" . $file;
                }
            } else {
                $post_params["file"] = $file;
            }
        }

        if(empty($headers))
            $headers = array('TK: '.static::KEY);

        curl_setopt($ch, CURLOPT_POST, true);
        #curl_setopt($ch, CURLOPT_TIMEOUT, 30);
        curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, 10);
        curl_setopt($ch, CURLOPT_POSTFIELDS, $post_params);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true); # no effect since PHP 5.1.3
        curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);

        $response = curl_exec($ch);
        $curl_error = NULL;
        if(curl_errno($ch)) {
            $curl_error = curl_error($ch);
        }

        $code = curl_getinfo($ch, CURLINFO_HTTP_CODE);

        curl_close($ch);
        if ($curl_error != NULL)
            throw new \Exception("Error in sending request to server - " . $curl_error);

        if ($code == 404)
            throw new \Exception('Conteúdo não encontrado!', 404);

        $response_data = json_decode($response);
        if ($response_data == NULL)
            throw new \Exception("Erro ao realizar parse da resposta do servidor!", $code);

        if ($code != 200)
            throw new \Exception($response_data->message, $response_data->code);

        return $response_data;

    }

    public static function getThumbDefault($path){
        if($path == null) return null;
        if(empty($path)) return "";

        $_filename = pathinfo($path, PATHINFO_FILENAME);
        $_ext = pathinfo($path, PATHINFO_EXTENSION);

        $path = str_replace('/'.$_filename.'.'.$_ext, '/'.$_filename.'.tmb.'.$_ext, $path);

        return self::getUrl($path);
    }

    public static function isUrlRepo($url){
        return strlen($url) > 0 && stripos($url, 'mobifile.com.br') !== FALSE;
    }

    public static function getUrl($path){
        if(stripos($path, 'https://') === FALSE && stripos($path, 'http://') === FALSE)
            $path = self::DIR_BASE.$path;
        return $path;
    }

}
