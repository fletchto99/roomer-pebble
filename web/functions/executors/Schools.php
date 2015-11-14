<?php

class Schools {

    function __construct($url, $key) {
        $this->url = $url;
        $this->key = $key;
    }

    function execute() {
        $response = functions::makeAPICall($this->url . '?access_token=' . $this->key);
        return !empty($response) ? $response : ['error' => 'Could not determine available schools!'];
    }

}