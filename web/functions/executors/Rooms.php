<?php

class Rooms {

    function __construct($url, $key, $schoolID, $building) {
        $this->url = $url;
        $this->key = $key;
        $this->schoolID = $schoolID;
        $this->building = $building;
    }

    function execute() {
        if (!isset($this -> schoolID) || !is_numeric($this-> schoolID) || $this->schoolID < 1) {
            return ['error', 'SchoolID is invalid'];
        }
        if (!isset($this -> building)) {
            return ['error', 'Building code is invalid'];
        }
        $rooms = [];
        $response = functions::makeAPICall($this->url . $this -> schoolID .'?access_token=' . $this->key);
        if (empty($response)) {
            return ['Error' => 'No school with the id: ' . $this->schoolID];
        }
        if (!array_key_exists($this->building, $response)) {
            return ['Error' => 'No building with the code: ' . $this->building];
        }
        $temprooms = $response[$this->building];
        foreach ($temprooms as $room) {
            array_push($rooms, ['name'=>$room[0], 'time_left' => functions::timeToHumanReadable(intval($room[1]))]);
        }
        usort($rooms, function ($room1, $room2) {
            if ($room1['name'] == $room2['name']) {
                return 0;
            }
            return $room1['name'] < $room2['name'] ? -1 : 1;
        });
        return !empty($rooms) ? $rooms : ['error' => 'No rooms rooms are available in the building.'];
    }

}