<?php

class Buildings {

    function __construct($url, $key, $schoolID) {
        $this->url = $url;
        $this->key = $key;
        $this->schoolID = $schoolID;
    }

    function execute() {
        if (!isset($this -> schoolID) || !is_numeric($this-> schoolID) || $this->schoolID < 1) {
            return ['error', 'SchoolID is invalid'];
        }
        $response = functions::makeAPICall($this->url . $this -> schoolID .'?access_token=' . $this->key);
        if (empty($response)) {
            return ['Error' => 'No school with the id: ' . $this->schoolID];
        }
        $buildings = array_keys($response);
        usort($buildings, function ($building1, $building2) {
            if ($building1['name'] == $building2['name']) {
                return 0;
            }
            return $building1['name'] < $building2['name'] ? -1 : 1;
        });
        return !empty($buildings) ? $buildings : ['error' => 'Unable to determine available buildings.'];
    }

}