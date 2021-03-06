<?php

header('Content-Type: application/json');
header("Cache-Control: no-cache, must-revalidate");
header("Expires: Sat, 26 Jul 1997 05:00:00 GMT");

require_once 'configuration.php';

$config = Configuration::getConfiguration();

if (!$config['MAINTENANCE_MODE'] || isset($_POST['developer'])) {
    require_once 'functions/functions.php';
    if ($config['MAINTENANCE_MODE'] && isset($_POST['developer'])) {
        ini_set('display_errors', 1);
    }
    $params = null;

    if (count($_POST) == 0) {
        $params = json_decode(file_get_contents('php://input'), true);
    } else {
        $params = $_POST;
    }

    if ($params !== null) {
        $functions = new functions($config);
        $functions->execute($params['method'], $params);
    } else {
        echo json_encode(['error' => 'Server side error, please try again later.']);
    }
} else {
    echo json_encode(['error' => 'The server is currently undergoing maintenance, please try again later.']);
}