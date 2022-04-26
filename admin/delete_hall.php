<?php 
    require_once('admindb.php');

    if($_SERVER['REQUEST_METHOD']!='DELETE'){
        http_response_code(405);
        die(json_encode(array('code' => 1, 'message' => 'API chỉ hỗ trợ POST')));
    }

    $input = json_decode(file_get_contents('php://input'));

    if(is_null($input)){
        die(json_encode(array('code' => 2, 'message' => 'Chỉ hỗ trợ JSON')));
        
    }
    // if(!property_exists($input,'id')){
    //     http_response_code(400);
    //     die(json_encode(array('code' => 3, 'message' => 'Thiếu thông tin đầu vào')));
        
    // }
    // if(empty($input->id)){
    //     http_response_code(405);
    //     die(json_encode(array('code' => 4, 'message' => 'Thông tin không hợp lệ')));
        
    // }
    $id = $input->id;
    $sql = 'delete from hall where id = ?';
    $conn = open_database();

    $stm = $conn->prepare($sql);
    $stm->bind_param('i',$id);
    if(!$stm->execute()){
        http_response_code(400);
        die(json_encode(array('code'=>5,'message'=>'Khong the thuc hien lenh')));
    }
    die(json_encode(array('code'=>0,'message'=>'Da xoa thanh cong')));
?>