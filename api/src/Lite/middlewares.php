<?php
use Psr\Http\Message\{
    ServerRequestInterface as Request,
    ResponseInterface as Response
};

$app->add(new \Slim\Middleware\JwtAuthentication([
    "secure" => false,
    'path' => ['/'],
    "passthrough" => ["/auth/login", "/auth/validate"],
    "secret" => JWT_SECRET,
    "error" => function (Request $request, Response $response, $args) {
        $data['status'] = false;
        $data["error"] = $args["message"];
        return $response->withJson($data, 500);
    }
]));
