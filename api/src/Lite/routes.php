<?php
use SimplesVet\Lite\Controllers\Proprietario;

$app->group('/proprietarios', function(){
    $this->get('', Proprietario::class . ':index');
    $this->post('', Proprietario::class . ':store');
    $this->get('/{codigo}', Proprietario::class . ':show');
    $this->put('/{codigo}', Proprietario::class . ':update');
    $this->delete('/{codigo}', Proprietario::class . ':destroy');
});

$app->group('/usuarios', function(){
    $this->post('', Proprietario::class . ':store');
    $this->get('/{codigo}', Proprietario::class . ':show');
    $this->put('/{codigo}', Proprietario::class . ':update');
    $this->delete('/{codigo}', Proprietario::class . ':destroy');
});