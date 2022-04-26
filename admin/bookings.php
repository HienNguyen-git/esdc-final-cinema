<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Admin</title>
    <link rel="icon" type="image/png" href="../img/logo.png">
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.16.0/umd/popper.min.js"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>
    <link rel="stylesheet" href="../style/styles2.css">
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.7.2/css/all.css"
        integrity="sha384-fnmOCqbTlWIlj8LyTjo7mOUStjsKC4pOpQbqyi7RrhN7udi9RwhKkMHpvLbHG9Sr" crossorigin="anonymous">
</head>

<body>
    
    <div class="admin-section-header">
        <div class="admin-logo">
            <i class="fas fa-video"></i>
            Mlem Cinema System
        </div>
        <div class="admin-login-info">
            <a href="#">Welcome, Admin</a>
            <img class="admin-user-avatar" src="../img/avatar.png" alt="">
        </div>
    </div>
    <div class="admin-container">
        <div class="admin-section admin-section1 ">
            <ul>
                <a href="admin.php"><li><i class="fas fa-sliders-h"></i>Dashboard</li></a>
                <a href="bookings.php"><li class="active-menu"><i class="fas fa-ticket-alt"></i>Bookings </i></li></a>
                <ul class="admin-navigation-schedule-dropdwn hidden-div">
                    <li>View Schedule</li>
                    <li>Edit Schedule</li>
                </ul>
                <a href="movies.php"><li><i class="fas fa-film"></i>Movies </li></a>
                <a href="hall.php"><li><i class="fas fa-video"></i>Hall</li></a>
                <a href="employee.php"><li><i class="fas fa-user-tie"></i>Employee</li></a>
            </ul>
        </div>
        <div class="admin-section admin-section2">
            <div class="admin-section-column">
                <div class="admin-section-panel admin-section-panel2 w-60vw">
                    <div class="admin-panel-section-header">
                        <h2>Bookings</h2>
                    </div>
                    <div class="admin-panel-section-content">
                        <?php
                        $link = mysqli_connect("localhost", "root", "", "cinema_db");
                        $sql = "SELECT * FROM bookingTable";
                        if($result = mysqli_query($link, $sql)){
                            if(mysqli_num_rows($result) > 0){
                                while($row = mysqli_fetch_array($result)){
                                    echo "<div class=\"admin-panel-section-booking-item\">\n";
                                    echo "                            <div class=\"admin-panel-section-booking-response\">\n";
                                    echo "                                <a href=changePaymentStatus.php?id=".$row['bookingID']."'><i class=\"fas fa-wrench accept-booking\" title=\"Change payment status\"></i></a>\n";
                                    echo "                                <a href='deleteBooking.php?id=".$row['bookingID']."'><i class=\"fas fa-times decline-booking\" title=\"Reject booking\"></i></a>\n";
                                    echo "                            </div>\n";
                                    echo "                            <div class=\"admin-panel-section-booking-info\">\n";
                                    echo "                                <div>\n";
                                    echo "                                    <h3>". $row['movieName'] ."</h3>\n";
                                    echo "                                    <i class=\"fas fa-grip-lines-vertical \"></i>\n";
                                    echo "                                    <h4>". $row['bookingTheatre'] ."</h4>\n";
                                    echo "                                    <i class=\"fas fa-grip-lines-vertical \"></i>\n";
                                    echo "                                    <h4>". $row['bookingDate'] ."</h4>\n";
                                    echo "                                    <i class=\"fas fa-grip-lines-vertical \"></i>\n";
                                    echo "                                    <h4>". $row['bookingTime'] ."</h4>\n";
                                    echo "                                </div>\n";
                                    echo "                                <div>\n";
                                    echo "                                    <h4>". $row['bookingFName'] ." ". $row['bookingLName'] ."</h4>\n";
                                    echo "                                    <i class=\"fas fa-grip-lines-vertical\"></i>\n";
                                    echo "                                    <h4>". $row['bookingPNumber'] ."</h4>\n";
                                    echo "                                    <i class=\"fas fa-grip-lines-vertical\"></i>\n";
                                                                            if ($row['paymentStatus']){
                                    echo "                                    <i class=\"fas fa-check-circle\" style='color:lightblue'></i>\n";
                                    echo "                                    <h4>Paid</h4>\n";
                                                                            }else{
                                    echo "                                    <i class=\"fas fa-exclamation-circle\" style='color:orange'></i>\n";
                                    echo "                                    <h4>Not yet paid</h4>\n";
                                                                            }
                                    echo "                                </div>\n";
                                    echo "                            </div>\n";
                                    echo "                        </div>";
                                }
                                $sql2 = "select sum(ticketPrice) as 'totalRevenue' from bookingTable left join movieTable on bookingTable.movieName = movieTable.movieTitle;";
                                if($result2 = mysqli_query($link, $sql2)){
                                    $revenue = mysqli_fetch_assoc($result2)['totalRevenue'];
                                    echo "<div class='alert alert-info' style='display: inline-block;
                                    right: 0;
                                    margin-right: 0;
                                    position: absolute;
                                    top: 11vh;'>Estimate total revenue:  <span class='h3 ml-3'>$revenue</span> VND</div>";
                                }
                                
                                mysqli_free_result($result);
                            } else{
                                echo '<h4 class="no-annot">No Bookings right now</h4>';
                            }
                        } else{
                            echo "ERROR: Could not able to execute $sql. " . mysqli_error($link);
                        }
                        ?>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <script src="../scripts/jquery-3.3.1.min.js "></script>
    <script src="../scripts/owl.carousel.min.js "></script>
    <script src="../scripts/script.js "></script>
</body>

</html>