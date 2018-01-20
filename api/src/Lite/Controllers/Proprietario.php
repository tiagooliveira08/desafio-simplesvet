<?php
namespace SimplesVet\Lite\Controllers;

use Psr\Http\Message\{
    ServerRequestInterface as Request,
    ResponseInterface as Response
};
use SimplesVet\Lite\Entities\Proprietario as ProprietarioEntity;
use SimplesVet\Lite\Models\Proprietario as ProprietarioModel;

class Proprietario
{
    public function index(Request $request, Response $response, $args)
    {
        $data = ProprietarioModel::getAll();
        $code = count($data) > 0 ? 200 : 404;

        return $response->withJson($data, $code);
    }

    public function show(Request $request, Response $response, $args)
    {
        $codigo = $request->getAttribute('codigo');
    
        $proprietario = new ProprietarioEntity();
        $proprietario->setCodigo($codigo);

        $data = ProprietarioModel::selectByIdForm($proprietario);
        $code = count($data) > 0 ? 200 : 404;

        return $response->withJson($data, $code);
    }

    public function store(Request $request, Response $response, $args)
    {
        $body = $request->getParsedBody();

        $proprietario = new ProprietarioEntity();
        $proprietario->setNome($body['nome']);
        $proprietario->setEmail($body['email']);
        $proprietario->setTelefone($body['telefone']);

        $data = ProprietarioModel::insert($proprietario);
        $code = ($data['status']) ? 201 : 500;

        return $response->withJson($data, $code);
    }

    public function update(Request $request, Response $response, $args)
    {
        $body = $request->getParsedBody();
        $codigo = $request->getAttribute('codigo');
        
        $proprietario = new ProprietarioEntity();
        $proprietario->setCodigo($codigo);
        $proprietario->setNome($body['nome']);
        $proprietario->setEmail($body['email']);
        $proprietario->setTelefone($body['telefone']);

        $data = ProprietarioModel::update($proprietario);
        $code = ($data['status']) ? 200 : 500;

        return $response->withJson($data, $code);
    }

    public function destroy(Request $request, Response $response, $args)
    {
        $codigo = $request->getAttribute('codigo');
    
        $proprietario = new ProprietarioEntity();
        $proprietario->setCodigo($codigo);

        $data = ProprietarioModel::delete($proprietario);
        $code = ($data['status']) ? 200 : 500;

        return $response->withJson($data, $code);
    }
}
