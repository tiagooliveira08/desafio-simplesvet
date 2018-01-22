<?php
use Psr\Http\Message\{
    ServerRequestInterface as Request,
    ResponseInterface as Response
};
use SimplesVet\Lite\Helpers\FileUpload;
use SimplesVet\Lite\Controllers\{
    Proprietario,
    Usuario,
    Animal,
    Vacina,
    AnimalVacina,
    Raca,
    Autenticacao
};

$app->group('/proprietarios', function () {
    $this->get('', Proprietario::class . ':index');
    $this->post('', Proprietario::class . ':store');
    $this->get('/{codigo}', Proprietario::class . ':show');
    $this->put('/{codigo}', Proprietario::class . ':update');
    $this->delete('/{codigo}', Proprietario::class . ':destroy');
});

$app->group('/usuarios', function () {
    $this->get('', Usuario::class . ':index');
    $this->post('', Usuario::class . ':store');
    $this->get('/{codigo}', Usuario::class . ':show');
    $this->put('/{codigo}', Usuario::class . ':update');
    $this->delete('/{codigo}', Usuario::class . ':destroy');
});

$app->group('/animais', function () {
    $this->get('', Animal::class . ':index');
    $this->post('', Animal::class . ':store');
    $this->get('/{codigo}', Animal::class . ':show');
    $this->put('/{codigo}', Animal::class . ':update');
    $this->delete('/{codigo}', Animal::class . ':destroy');
});

$app->group('/vacinas', function () {
    $this->get('', Vacina::class . ':index');
    $this->get('/animal/{codigo_animal}', AnimalVacina::class . ':showByAnimal');
    $this->post('/aplicacao', AnimalVacina::class . ':store');
    $this->get('/aplicacao/{codigo}', AnimalVacina::class . ':show');
    $this->delete('/aplicacao/{codigo}', AnimalVacina::class . ':destroy');
    $this->post('/aplicacao/{codigo}/aplicar', AnimalVacina::class . ':aplicar');
});

$app->group('/racas', function () {
    $this->get('', Raca::class . ':index');
    $this->post('', Raca::class . ':store');
    $this->get('/{codigo}', Raca::class . ':show');
});

$app->group('/auth', function () {
    $this->post('/login', Autenticacao::class . ':login');
    $this->post('/validate', Autenticacao::class . ':validateToken');
});

$app->post('/upload', function (Request $request, Response $response, $args) {
    $upload = $request->getUploadedFiles();
    $foto = $upload['foto'];

    $fileUpload = FileUpload::imageUpload($foto);

    return $response->withJson($fileUpload, $fileUpload['code']);
});
