<?php
namespace SimplesVet\Lite\Controllers;

use Psr\Http\Message\ServerRequestInterface as Request;
use Psr\Http\Message\ResponseInterface as Response;
use SimplesVet\Lite\Entities\Usuario as UsuarioEntity;
use SimplesVet\Lite\Entities\Vacina as VacinaEntity;
use SimplesVet\Lite\Entities\Animal as AnimalEntity;
use SimplesVet\Lite\Entities\AnimalVacina as AnimalVacinaEntity;
use SimplesVet\Lite\Models\AnimalVacina as AnimalVacinaModel;

class AnimalVacina
{
    public function show(Request $request, Response $response, $args) 
    {
        $codigo = $request->getAttribute('codigo');
    
        $animalVacina = new AnimalVacinaEntity();
        $animalVacina->setCodigo($codigo);

        $data = AnimalVacinaModel::selectByIdForm($animalVacina);
        $code = count($data) > 0 ? 200 : 404;

        return $response->withJson($data, $code);
    }

    public function showByAnimal(Request $request, Response $response, $args) 
    {
        $codigo = $request->getAttribute('codigo_animal');

        $animal = new AnimalEntity;
        $animal->setCodigo($codigo);
    
        $animalVacina = new AnimalVacinaEntity();
        $animalVacina->setAnimal($animal);

        $data = AnimalVacinaModel::selectByAnimalIdForm($animalVacina);
        $code = count($data) > 0 ? 200 : 404;

        return $response->withJson($data, $code);
    }

    public function store(Request $request, Response $response, $args)
    {
        $body = $request->getParsedBody();

        $usuario = new UsuarioEntity;
        $usuario->setCodigo($body['codigo_usuario']);

        $vacina = new VacinaEntity;
        $vacina->setCodigo($body['codigo_vacina']);

        $animal = new AnimalEntity;
        $animal->setCodigo($body['codigo_animal']);

        $animalVacina = new AnimalVacinaEntity;
        $animalVacina->setUsuario($usuario);
        $animalVacina->setAnimal($animal);
        $animalVacina->setVacina($vacina);
        $animalVacina->setDataProgramacao($body['data_programacao']);
        $animalVacina->setDataAplicacao($body['data_aplicacao']);

        $data = AnimalVacinaModel::insert($animalVacina);
        $code = ($data['status']) ? 201 : 500;

        return $response->withJson($data, $code);
    }

    public function destroy(Request $request, Response $response, $args) 
    {
        $codigo = $request->getAttribute('codigo');
    
        $animalVacina = new AnimalVacinaEntity();
        $animalVacina->setCodigo($codigo);

        $data = AnimalVacinaModel::delete($animalVacina);
        $code = ($data['status']) ? 200 : 500;

        return $response->withJson($data, $code);
    }

    public function aplicar(Request $request, Response $response, $args) 
    {
        $body = $request->getParsedBody();
        $codigo = $request->getAttribute('codigo');

        $usuario = new UsuarioEntity;
        $usuario->setCodigo($body['codigo_usuario']);

        $animal = new AnimalEntity;
        $animal->setCodigo($body['codigo_animal']);
    
        $animalVacina = new AnimalVacinaEntity();
        $animalVacina->setCodigo($codigo); 
        $animalVacina->setUsuario($usuario);
        $animalVacina->setAnimal($animal);

        $data = AnimalVacinaModel::aplicar($animalVacina);
        $code = ($data['status']) ? 200 : 500;

        return $response->withJson($data, $code);
    }
}