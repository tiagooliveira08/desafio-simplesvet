<?php
use SimplesVet\Lite\Controllers\Proprietario;
use SimplesVet\Lite\Controllers\Usuario;
use SimplesVet\Lite\Controllers\Animal;
use SimplesVet\Lite\Controllers\Vacina;
use SimplesVet\Lite\Controllers\AnimalVacina;

$app->group('/proprietarios', function(){
    $this->get('', Proprietario::class . ':index');
    $this->post('', Proprietario::class . ':store');
    $this->get('/{codigo}', Proprietario::class . ':show');
    $this->put('/{codigo}', Proprietario::class . ':update');
    $this->delete('/{codigo}', Proprietario::class . ':destroy');
});

$app->group('/usuarios', function(){
    $this->post('', Usuario::class . ':store');
    $this->get('/{codigo}', Usuario::class . ':show');
    $this->put('/{codigo}', Usuario::class . ':update');
    $this->delete('/{codigo}', Usuario::class . ':destroy');
});

$app->group('/animais', function(){
    $this->get('', Animal::class . ':index');
    $this->post('', Animal::class . ':store');
    $this->get('/{codigo}', Animal::class . ':show');
    $this->put('/{codigo}', Animal::class . ':update');
    $this->delete('/{codigo}', Animal::class . ':destroy');
});

$app->group('/vacinas', function(){
    $this->get('', Vacina::class . ':index');
    $this->get('/animal/{codigo_animal}', AnimalVacina::class . ':showByAnimal');
    $this->post('/aplicacao', AnimalVacina::class . ':store');
    $this->get('/aplicacao/{codigo}', AnimalVacina::class . ':show');
    $this->delete('/aplicacao/{codigo}', AnimalVacina::class . ':destroy');
    $this->post('/aplicacao/{codigo}/aplicar', AnimalVacina::class . ':aplicar');
});