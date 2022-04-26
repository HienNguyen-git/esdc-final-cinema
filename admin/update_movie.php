<?php
    require_once('admindb.php');

    if($_SERVER['REQUEST_METHOD']!='POST'){
        http_response_code(405);
        die(json_encode(array('code' => 1, 'message' => 'API chỉ hỗ trợ POST')));
    }

    $input = json_decode(file_get_contents('php://input'));

    if(is_null($input)){
        die(json_encode(array('code' => 2, 'message' => 'Chỉ hỗ trợ JSON')));
        
    }
    // if(!property_exists($input,'name') || !property_exists($input,'price') || !property_exists($input,'desc')){
    //     http_response_code(400);
    //     die(json_encode(array('code' => 3, 'message' => 'Thiếu thông tin đầu vào')));
        
    // }
    // if(empty($input->name)|| empty($input->price) || empty($input->desc)){
    //     http_response_code(405);
    //     die(json_encode(array('code' => 4, 'message' => 'Thông tin không hợp lệ')));
        
    // }

    $movieID = $input->movieID;
    $movieTitle = $input->movieTitle;
    $movieGenre = $input->movieGenre;
    $movieDuration = $input->movieDuration;
    $movieDate = $input->movieRelDate;
    $movieDirector = $input->movieDirector;
    $movieActors = $input->movieActors;
    $ticketPrice = $input->ticketPrice;

    $sql = 'update movieTable set movieTitle=?, movieGenre=?, movieDuration=?, movieRelDate=?, movieDirector=?,movieActors=?, ticketPrice=? where movieID=?';
    $conn = open_database();

    $stm = $conn->prepare($sql);
    $stm->bind_param('ssisssii',$movieTitle,$movieGenre,$movieDuration,$movieDate,$movieDirector,$movieActors,$ticketPrice,$movieID);

    if(!$stm->execute()){
        die(json_encode(array('code' => 5, 'message' => 'Execute thất bại')));

    }
    die(json_encode(array('code' => 0, 'message' => 'Sửa sp thành công')));
    
    
?>