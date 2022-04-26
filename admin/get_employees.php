<?php
    require_once('admindb.php');
    
    $sql = 'select * from employee';
    $conn = open_database();

    $result = $conn->query($sql);
    $data = array();

    if($result->num_rows==0){
        http_response_code(405);
        die(json_encode(array('code'=>1,'message'=>'Database is empty')));
    }else{
        while($row = $result->fetch_assoc()){
            $data[] = $row;
        }
    }

    echo json_encode($data)
?>