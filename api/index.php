<?php
require_once 'vendor/autoload.php';

// Required environment variables
$envConfig = [
    'SERVER', 
    'MYSQL_HOST', 
    'MYSQL_PORT', 
    'MYSQL_USER', 
    'MYSQL_PASS',
    'MYSQL_BASE',
    'MYSQL_CHARSET',
    'MYSQL_TIMEZONE',
    'PHP_TIMEZONE'
];

// Load variables
try {
    $dotenv = new Dotenv\Dotenv(__DIR__);
    $dotenv->load();
    $dotenv->required($envConfig);

    foreach($envConfig as $env) {
        define($env, getenv($env));
    }
} catch(Exception $e) {
    echo $e->getMessage();
    die;
}

$settings['displayErrorDetails'] = true;
$settings['determineRouteBeforeAppMiddleware'] = true;

$app = new \Slim\App(["settings" => $settings]);

require '_genesis/genesis.php';
require 'endpoints/usuarios.php';
require 'endpoints/animais.php';

$app->run();