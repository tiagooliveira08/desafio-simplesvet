<?php
namespace SimplesVet\Lite\Controllers;

use Psr\Http\Message\{
    ServerRequestInterface as Request,
    ResponseInterface as Response
};
use SimplesVet\Lite\Entities\Raca as RacaEntity;
use SimplesVet\Lite\Models\Raca as RacaModel;

class Raca
{
    public function index(Request $request, Response $response, $args)
    {
        $data = RacaModel::getAll();
        $code = count($data) > 0 ? 200 : 404;

        return $response->withJson($data, $code);
    }

    public function show(Request $request, Response $response, $args)
    {
        $codigo = $request->getAttribute('codigo');
    
        $raca = new RacaEntity();
        $raca->setCodigo($codigo);

        $data = RacaModel::selectByIdForm($raca);
        $code = count($data) > 0 ? 200 : 404;

        return $response->withJson($data, $code);
    }

    public function store(Request $request, Response $response, $args)
    {
        $body = $request->getParsedBody();

        $raca = new RacaEntity();
        $raca->setNome($body['nome']);

        $data = RacaModel::insert($raca);
        $code = ($data['status']) ? 201 : 500;

        return $response->withJson($data, $code);
    }
}
