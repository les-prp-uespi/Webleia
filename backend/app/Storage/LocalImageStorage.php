<?php

namespace App\Storage;

use App\Config\Constantes;

class LocalImageStorage
{
    /**
     * @var string
     */
    protected string $folderBase;

    public function __construct(string $folderBase = '')
    {
        $this->folderBase = $folderBase;
    }

    public static function make(string $folderBase = ''): self
    {
        return new self($folderBase);
    }

    public static function makeDefault(): self
    {
        return new self(Constantes::APP_FOLDER);
    }

    public function upload($file, $name, $folder = '', $max = 819200)
    {
        if (empty($file)) {
            throw new \Exception("Arquivo não encontrado!");
        }

        if (filesize($file) > $max) {
            throw new \Exception("O arquivo excede o tamanho máximo permitido de " . ($max / 1024) . " KB");
        }

        $uploadDir = $this->getUploadPath($folder);
        if (!file_exists($uploadDir)) {
            mkdir($uploadDir, 0755, true);
        }

        $extension = pathinfo($name, PATHINFO_EXTENSION);
        $filename = uniqid() . '.' . $extension;
        $destination = $uploadDir . '/' . $filename;

        if (!move_uploaded_file($file, $destination)) {
            throw new \Exception("Falha ao mover o arquivo enviado");
        }

        $cleanFolder = trim($folder, '/');
        $path = $cleanFolder ? $cleanFolder . '/' . $filename : $filename;

        return (object)[
            'success' => true,
            'path' => $this->getUrl($path)
        ];
    }

    public function rotate($path, $degrees)
    {
        $localPath = $this->getLocalPath($path);

        $image = $this->loadImage($localPath);

        $rotated = imagerotate($image, $degrees, 0);

        $this->saveImage($rotated, $localPath, $this->getImageType($localPath));

        return (object)[
            'success' => true,
            'path' => $path
        ];
    }

    public function remove($path)
    {
        $localPath = $this->getLocalPath($path);

        if (file_exists($localPath)) {
            unlink($localPath);
            return (object)['success' => true];
        }

        throw new \Exception("Arquivo não encontrado", 404);
    }

    public function thumb($path, $size = 150)
    {
        $localPath = $this->getLocalPath($path);
        $thumbPath = $this->generateThumbPath($localPath);

        $image = $this->loadImage($localPath);

        $width = imagesx($image);
        $height = imagesy($image);

        $ratio = $width / $height;
        if ($width > $height) {
            $newWidth = $size;
            $newHeight = $size / $ratio;
        } else {
            $newHeight = $size;
            $newWidth = $size * $ratio;
        }

        $thumb = imagecreatetruecolor($newWidth, $newHeight);
        imagecopyresampled($thumb, $image, 0, 0, 0, 0, $newWidth, $newHeight, $width, $height);

        $this->saveImage($thumb, $thumbPath, $this->getImageType($localPath));

        return (object)[
            'success' => true,
            'path' => $this->getUrl(str_replace($this->getUploadPath(), '', $thumbPath))
        ];
    }

    protected function getUploadPath(string $subfolder = ''): string
    {
        return __DIR__ . '/../../public/uploads/' . $this->folderBase . $subfolder;
    }

    protected function getUrl(string $path): string
    {
        $base = rtrim('/api/uploads/' . $this->folderBase, '/');
        $path = ltrim($path, '/');

        return $base . '/' . $path;
    }

    protected function getLocalPath(string $url): string
    {
        $basePath = '/api/uploads/' . $this->folderBase;
        if (strpos($url, $basePath) === false) {
            throw new \InvalidArgumentException("Caminho inválido: não pertence ao storage");
        }
        return $this->getUploadPath() . str_replace($basePath, '', $url);
    }

    protected function generateThumbPath(string $originalPath): string
    {
        $info = pathinfo($originalPath);
        return $info['dirname'] . '/' . $info['filename'] . '_thumb.' . $info['extension'];
    }

    protected function loadImage(string $path)
    {
        $type = $this->getImageType($path);

        switch ($type) {
            case IMAGETYPE_JPEG:
                return imagecreatefromjpeg($path);
            case IMAGETYPE_PNG:
                return imagecreatefrompng($path);
            case IMAGETYPE_GIF:
                return imagecreatefromgif($path);
            default:
                throw new \Exception("Tipo de imagem não suportado");
        }
    }

    protected function saveImage($image, string $path, int $type)
    {
        switch ($type) {
            case IMAGETYPE_JPEG:
                return imagejpeg($image, $path);
            case IMAGETYPE_PNG:
                return imagepng($image, $path);
            case IMAGETYPE_GIF:
                return imagegif($image, $path);
            default:
                throw new \Exception("Tipo de imagem não suportado");
        }
    }

    public function getThumbDefault($path)
    {
        if ($path == null) return null;
        if (empty($path)) return "";

        $pathInfo = pathinfo($path);
        $thumbPath = $pathInfo['dirname'] . '/' . $pathInfo['filename'] . '_thumb.' . $pathInfo['extension'];

        $fullThumbPath = $this->getLocalPath($thumbPath);

        if (!file_exists($fullThumbPath)) {
            return 'https://webleia.uespi.br/api/' . ltrim($path, '/');
        }

        return 'https://webleia.uespi.br/api/' . ltrim($thumbPath, '/');
    }

    protected function getImageType(string $path): int
    {
        return exif_imagetype($path);
    }
}
