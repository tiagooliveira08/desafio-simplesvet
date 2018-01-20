<?php
namespace SimplesVet\Lite\Controllers;

use Psr\Http\Message\{
    ServerRequestInterface as Request,
    ResponseInterface as Response
};
use SimplesVet\Lite\Entities\Usuario as UsuarioEntity;
use SimplesVet\Lite\Models\Usuario as UsuarioModel;

class Usuario
{
    public function show(Request $request, Response $response, $args)
    {
        $codigo = $request->getAttribute('codigo');
    
        $usuario = new UsuarioEntity();
        $usuario->setCodigo($codigo);

        $data = UsuarioModel::selectByIdForm($usuario);
        $code = count($data) > 0 ? 200 : 404;

        return $response->withJson($data, $code);
    }

    public function store(Request $request, Response $response, $args)
    {
        $body = $request->getParsedBody();

        $usuario = new UsuarioEntity();
        $usuario->setNome($body['nome']);
        $usuario->setEmail($body['email']);
        $usuario->setStatus($body['status']);

        $data = UsuarioModel::insert($usuario);
        $code = ($data['status']) ? 201 : 500;

        return $response->withJson($data, $code);
    }

    public function update(Request $request, Response $response, $args)
    {
        $body = $request->getParsedBody();
        $codigo = $request->getAttribute('codigo');
        
        $usuario = new UsuarioEntity();
        $usuario->setCodigo($codigo);
        $usuario->setNome($body['nome']);
        $usuario->setEmail($body['email']);
        $usuario->setStatus($body['status']);

        $data = UsuarioModel::update($usuario);
        $code = ($data['status']) ? 200 : 500;

        return $response->withJson($data, $code);
    }

    public function destroy(Request $request, Response $response, $args)
    {
        $codigo = $request->getAttribute('codigo');
    
        $usuario = new UsuarioEntity();
        $usuario->setCodigo($codigo);

        $data = UsuarioModel::delete($usuario);
        $code = ($data['status']) ? 200 : 500;

        return $response->withJson($data, $code);
    }
}
