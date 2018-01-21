<?php
namespace SimplesVet\Lite\Controllers;

use Psr\Http\Message\{
    ServerRequestInterface as Request,
    ResponseInterface as Response
};
use Lcobucci\JWT\{
    Builder,
    Parser,
    Valid,
    ValidationData
};
use Lcobucci\JWT\Signer\Hmac\Sha384;
use SimplesVet\Lite\Entities\Usuario as UsuarioEntity;
use SimplesVet\Lite\Models\Usuario as UsuarioModel;

class Autenticacao
{
    public function login(Request $request, Response $response, $args)
    {
        $body = $request->getParsedBody();

        $usuario = new UsuarioEntity;
        $usuario->setEmail(trim($body['email']));

        $usuarioEncontrado = UsuarioModel::findByEmail($usuario);

        if (is_null($usuarioEncontrado) || !password_verify($body['senha'], $usuarioEncontrado['senha'])) {
            return $response->withJson(['error' => 'Usuário não encontrado'], 404);
        }

        $usuario->setCodigo($usuarioEncontrado['codigo']);
        $usuario->setNome($usuarioEncontrado['nome']);
        $usuario->setStatus($usuarioEncontrado['user_status']);

        $date = new \DateTime;
        $signer = new Sha384;
        $token = (new Builder)->setIssuer(JWT_ISSUER)
                ->setSubject($usuario->getEmail())
                ->setAudience($usuario->getCodigo())
                ->setIssuedAt($date->getTimestamp())
                ->setNotBefore($date->getTimestamp())
                ->setExpiration($date->getTimestamp() + 86400)
                ->set('codigo_usuario', $usuario->getCodigo())
                ->set('email', $usuario->getEmail())
                ->sign($signer, JWT_SECRET)
                ->getToken();

        $data = [
            'token' => (string) $token,
            'usuario' => [
                'id' => $usuario->getCodigo(),
                'nome' => $usuario->getNome()
            ]
        ];

        return $response->withJson($data, 200);
    }

    public function validateToken(Request $request, Response $response, $args)
    {
        $body = $request->getParsedBody();
        try {
            $token = (new Parser())->parse((string) $body['token']);
        
            $data = new ValidationData;
            $data->setIssuer(JWT_ISSUER);
            $data->setSubject($token->getClaim('sub'));
            $data->setAudience($token->getClaim('aud'));

            if (!$token->validate($data)) {
                return $response->withJson(['status' => false, 'error' => 'Token inválido'], 200);
            }

            return $response->withJson(['status'=> true], 200);
        } catch (\RuntimeException $e) {
            return $response->withJson(['status' => false, 'error' => $e->getMessage()], 500);
        }
    }
}
