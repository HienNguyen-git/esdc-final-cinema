<?php 
    require_once('admindb.php');

    $id = (int)$_GET['id'];
    // die(json_encode(array('code'=>0,'message'=>$id)));
    
    $sql = "update bookingTable set paymentStatus = not paymentStatus where bookingID=?";
    $conn = open_database();

    $stm = $conn->prepare($sql);
    $stm->bind_param('i',$id);

    if(!$stm->execute()){
        http_response_code(400);
        die(json_encode(array('code'=>5,'message'=>'Khong the thuc hien lenh')));
    }
    header('Location: bookings.php')
    // die(json_encode(array('code'=>0,'message'=>'Da cap nhat thanh cong')));
?>