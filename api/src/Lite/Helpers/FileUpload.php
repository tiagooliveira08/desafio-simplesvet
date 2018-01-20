<?php
namespace SimplesVet\Lite\Helpers;

use Slim\Http\UploadedFile;

class FileUpload
{
    public static function imageUpload($file)
    {
        $methodSupportedFormats = [
            'image/png',
            'image/jpeg',
            'image/gif',
            'image/bmp'
        ];
        
        if (empty($file)) {
            return ['error' => 'Você não escolheu um arquivo'];
        }

        if (!in_array($file->getClientMediaType(), $methodSupportedFormats)) {
            return ['error' => 'Arquivo inválido'];
        }

        if ($file->getError() === UPLOAD_ERR_OK) {
            $filename = FileUpload::moveUploadedFile(UPLOAD_DIRECTORY, $file);
            
            return ['file' => $filename];
        }

        return ['error' => 'Erro ao enviar o arquivo'];
    }

    /**
     * Moves the uploaded file to the upload directory and assigns it a unique name
     * to avoid overwriting an existing uploaded file.
     *
     * @param string $directory directory to which the file is moved
     * @param UploadedFile $uploaded file uploaded file to move
     * @return string filename of moved file
     */
    public static function moveUploadedFile($directory, UploadedFile $uploadedFile)
    {
        $extension = pathinfo($uploadedFile->getClientFilename(), PATHINFO_EXTENSION);
        $basename = bin2hex(random_bytes(8)); // see http://php.net/manual/en/function.random-bytes.php
        $filename = sprintf('%s.%0.8s', $basename, $extension);

        $uploadedFile->moveTo($directory . DIRECTORY_SEPARATOR . $filename);

        return $filename;
    }
}
