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
    'PHP_TIMEZONE',
    'UPLOAD_DIRECTORY'
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

require_once 'src/Lite/middlewares.php';
require_once 'src/Lite/routes.php';

$app->run();