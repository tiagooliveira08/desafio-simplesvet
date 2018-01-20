<?php
use SimplesVet\Lite\Controllers\Proprietario;
use SimplesVet\Lite\Controllers\Usuario;

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