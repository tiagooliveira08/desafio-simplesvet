<?php
namespace SimplesVet\Lite\Controllers;

use Psr\Http\Message\ServerRequestInterface as Request;
use Psr\Http\Message\ResponseInterface as Response;
use SimplesVet\Lite\Entities\Vacina as VacinaEntity;
use SimplesVet\Lite\Models\Vacina as VacinaModel;

class Vacina
{
    public function index(Request $request, Response $response, $args)
    {
        $data = VacinaModel::getAll();
        $code = count($data) > 0 ? 200 : 404;

        return $response->withJson($data, $code);
    }
}
