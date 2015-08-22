<?php

require_once 'executors/Schools.php';
require_once 'executors/Buildings.php';
require_once 'executors/Rooms.php';



class Functions {

    private $result = ['error' => 'Error executing option, please try again later.'];

    function __construct($config) {
        $this->config = $config;
    }

    public function execute($method, $params) {
        switch ($method) {
            case 'schools':
                $schools = new Schools($this->config['ROOMER_API_URL'] . $this->config['SCHOOLS_ENDPOINT'], $this->config['ROOMER_API_KEY']);
                $this->result = $schools->execute();
                break;
            case 'buildings':
                $buildings = new Buildings($this->config['ROOMER_API_URL'] . $this->config['BUILDINGS_ENDPOINT'], $this->config['ROOMER_API_KEY'], $params['schoolid']);
                $this->result = $buildings->execute();
                break;
            case 'rooms':
                $rooms = new Rooms($this->config['ROOMER_API_URL'] . $this->config['BUILDINGS_ENDPOINT'], $this->config['ROOMER_API_KEY'], $params['schoolid'], $params['building']);
                $this->result = $rooms->execute();
                break;
        }
        echo json_encode($this->result, JSON_UNESCAPED_SLASHES);
    }

    public static function makeAPICall($url) {
        $response = json_decode(self::cURL($url), true);
        return !empty($key) ? $response[$key] : $response;
    }

    private static function cURL($url) {
        $ch = curl_init($url);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
        curl_setopt($ch, CURLOPT_AUTOREFERER, TRUE);
        curl_setopt($ch, CURLOPT_FOLLOWLOCATION, TRUE);
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, FALSE);
        curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, FALSE);
        curl_setopt($ch, CURLOPT_FORBID_REUSE, TRUE);
        curl_setopt($ch, CURLOPT_FRESH_CONNECT, FALSE);
        curl_setopt($ch, CURLOPT_HEADER, 0);
        $result = curl_exec($ch);
        curl_close($ch);
        return $result;
    }

    public static function timeToHumanReadable($mills) {
        $x = $mills / 1000;
        $x /= 60;
        $minutes = $x % 60;
        $x /= 60;
        $hours = $x % 24;
        $x /= 24;
        $days = floor($x);
        return $days.($days==1 ? ' day ' : ' days ') . $hours . ($hours == 1 ? ' hour ' : ' hours ') . $minutes . ($minutes == 1 ? ' minutes ' : ' minutes ');
    }

}