<?php
namespace SimplesVet\Lite\Controllers;

use Psr\Http\Message\ServerRequestInterface as Request;
use Psr\Http\Message\ResponseInterface as Response;
use SimplesVet\Lite\Entities\Animal as AnimalEntity;
use SimplesVet\Lite\Entities\Raca as RacaEntity;
use SimplesVet\Lite\Entities\Proprietario as ProprietarioEntity;
use SimplesVet\Lite\Models\Animal as AnimalModel;

class Animal
{
    public function index(Request $request, Response $response, $args)
    {
        $data = AnimalModel::getAll();
        $code = count($data) > 0 ? 200 : 404;

        return $response->withJson($data, $code);
    }

    public function show(Request $request, Response $response, $args)
    {
        $codigo = $request->getAttribute('codigo');
    
        $animal = new AnimalEntity();
        $animal->setCodigo($codigo);

        $data = AnimalModel::selectByIdForm($animal);
        $code = count($data) > 0 ? 200 : 404;

        return $response->withJson($data, $code);
    }

    public function store(Request $request, Response $response, $args)
    {
        $body = $request->getParsedBody();

        $proprietario = new ProprietarioEntity;
        $proprietario->setCodigo($body['codigo_proprietario']);

        $raca = new RacaEntity;
        $raca->setCodigo($body['codigo_raca']);

        $animal = new AnimalEntity();
        $animal->setNome($body['nome']);
        $animal->setVivo($body['vivo']);
        $animal->setPeso($body['peso']);
        $animal->setRaca($raca);
        $animal->setProprietario($proprietario);

        $data = AnimalModel::insert($animal);
        $code = ($data['status']) ? 201 : 500;

        return $response->withJson($data, $code);
    }

    public function update(Request $request, Response $response, $args)
    {
        $body = $request->getParsedBody();
        $codigo = $request->getAttribute('codigo');

        $proprietario = new ProprietarioEntity;
        $proprietario->setCodigo($body['codigo_proprietario']);

        $raca = new RacaEntity;
        $raca->setCodigo($body['codigo_raca']);
        
        $animal = new AnimalEntity();
        $animal->setCodigo($codigo);
        $animal->setNome($body['nome']);
        $animal->setVivo($body['vivo']);
        $animal->setPeso($body['peso']);
        $animal->setRaca($raca);
        $animal->setProprietario($proprietario);

        $data = AnimalModel::update($animal);
        $code = ($data['status']) ? 200 : 500;

        return $response->withJson($data, $code);
    }

    public function destroy(Request $request, Response $response, $args)
    {
        $codigo = $request->getAttribute('codigo');
    
        $animal = new AnimalEntity();
        $animal->setCodigo($codigo);

        $data = AnimalModel::delete($animal);
        $code = ($data['status']) ? 200 : 500;

        return $response->withJson($data, $code);
    }
}
