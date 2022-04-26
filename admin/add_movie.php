<?php
    $link = mysqli_connect("localhost", "root", "", "cinema_db");
    $sql = "SELECT * FROM bookingTable";
    if(isset($_POST['submit'])){
        $insert_query = "INSERT INTO 
        movieTable (  movieImg,
                        movieTitle,
                        movieGenre,
                        movieDuration,
                        movieRelDate,
                        movieDirector,
                        movieActors,
                        ticketPrice)
        VALUES (        'img/".$_POST['movieImg']."',
                        '".$_POST["movieTitle"]."',
                        '".$_POST["movieGenre"]."',
                        '".$_POST["movieDuration"]."',
                        '".$_POST["movieRelDate"]."',
                        '".$_POST["movieDirector"]."',
                        '".$_POST["movieActors"]."',
                        '".$_POST["ticketPrice"]."'
                        )";
                        mysqli_query($link,$insert_query);
                    }
    header('Location: movies.php');
?>