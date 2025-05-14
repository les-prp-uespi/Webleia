<?php

namespace App\Traits;

use Illuminate\Http\Request;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Validator;
use Intervention\Image\ImageManagerStatic as Image;
use App\Exceptions\ValidationException;
use App\Storage\LocalImageStorage;

trait UploadTrait
{

    /**
     *
     * Metodo comum para upload de arquivos
     *
     * @param Request $request request
     * @param string $field campo do file
     * @param string $folder caminho a ser salvo
     * @param int $file_size_max tamanho maximo do arquivo permito em bytes
     * @param int $img_size_max tamanho maximo permito (para imagem)
     * @param array|string $types tipos (extensao) para validar
     * @param bool $thumb se deve criar thumbnail
     * @param bool $public se deve criar salvar na pasta publica
     * @return string|null retorna o caminho do arquivo salvo ou null
     * @throws \Exception caso alguma validacao barre
     */
    public function upload(
        Request $request,
        string $field,
        string $folder,
        int $file_size_max = 1000,
        int $img_size_max = 1000,
        array|string $types = [],
        bool $thumb = false,
        int $thumbSize = 120,
        bool $public = true
    ): ?string {

        //caso seja usado link no lugar de upload
        if ($request->filled($field . '_url')) return $request->get($field . '_url');

        $file = $request->file($field);
        return $this->uploadFile($file, $field, $folder, $file_size_max, $img_size_max, $types, $thumb, $thumbSize, $public);
    }

    /**
     *
     * Metodo comum para upload de arquivos
     *
     * @param UploadedFile|null $file file
     * @param string $field campo do file
     * @param string $folder caminho a ser salvo
     * @param int $file_size_max tamanho maximo do arquivo permito em bytes
     * @param int $img_size_max tamanho maximo permito (para imagem)
     * @param array|string $types tipos (extensao) para validar
     * @param bool $thumb se deve criar thumbnail
     * @param int $thumbSize
     * @param bool $public se deve criar salvar na pasta publica
     * @return string|null retorna o caminho do arquivo salvo ou null
     * @throws \Exception caso alguma validacao barre
     */
    public function uploadFile(
        ?UploadedFile $file,
        string $field,
        string $folder,
        int $file_size_max = 1000,
        int $img_size_max = 1000,
        array|string $types = [],
        bool $thumb = false,
        int $thumbSize = 120,
        bool $public = true
    ): ?string {

        if ($file == null) return null;

        if (is_array($types)) $types = implode(",", $types);

        $validation = [];
        if (!empty($types)) $validation[] = 'mimes:' . $types;
        if ($file_size_max > 0) $validation[] = 'max:' . $file_size_max;

        $validation = implode("|", $validation);
        if (!empty($validation)) {
            $validator = Validator::make([$field => $file], [
                $field => $validation
            ]);
            if ($validator->fails())
                throw new ValidationException($validator, $this->model ?? null);
        }

        $erro = $this->getErrorMsg($file->getError());
        if (!empty($erro))  throw new \Exception($erro);

        if ($img_size_max > 0) {
            Image::make($file->getRealPath())->resize($img_size_max, $img_size_max, function ($constraint) {
                $constraint->aspectRatio();
                $constraint->upsize();
            })->save();
        }

        $file_name = md5(uniqid(time())) . '.' . $file->getClientOriginalExtension();
        $repo = LocalImageStorage::makeDefault();
        $arq = $repo->upload($file->getRealPath(), $file_name, $folder, $file_size_max * 1024); //em bytes

        if (strlen($arq->path) > 0) {
            if ($thumb) {
                $repo->thumb($arq->path, 120);
            }
            return $arq->path;
        }

        return null;
    }

    public function deleteFile(string $path): bool
    {
        LocalImageStorage::makeDefault()->remove($path);
        return true;
    }

    private function getErrorMsg($error): string
    {
        $phpFileUploadErrors = array(
            //            0 => 'There is no error, the file uploaded with success',
            1 => 'Arquivo excede o máximo permitido na configuração do servidor!',
            2 => 'Arquivo excede o máximo permitido na configuração do formulário!',
            3 => 'Arquivo com upload parcial!',
            4 => 'Arquivo com upload incompleto!',
            6 => 'Erro na pasta temporária do servidor!',
            7 => 'Erro ao salvar arquivo no servidor!',
            8 => 'A PHP extension stopped the file upload.',
        );

        return $phpFileUploadErrors[$error] ?? '';
    }
}
