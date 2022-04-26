<?php
    header("Access-Control-Allow-Origin: *");
    header("Content-Type: application/json; charset=UTF-8");
    
    define('HOST', '127.0.0.1');
    define('USER', 'root');
    define('PASS', '');
    define('DB', 'cinema_db');

    function open_database(){
        $conn = new mysqli(HOST,USER,PASS,DB);
        
        if($conn->connect_error){
            die(json_encode(array('code'=>7,'message'=>'Can not connect to database'. $conn->connect_error)));
        }
        return $conn;
    }

    function generateID($tableName){
        $sql = "select * from $tableName ORDER BY id DESC LIMIT 1";
        $conn = open_database();

        $result = $conn->query($sql);
        $id = $result->fetch_assoc()['id'];
        return $id;
    }
?>