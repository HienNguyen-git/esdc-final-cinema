<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Admin</title>
    <link rel="icon" type="image/png" href="../img/logo.png">
    <link rel="stylesheet" href="../style/styles2.css">
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.7.2/css/all.css"
        integrity="sha384-fnmOCqbTlWIlj8LyTjo7mOUStjsKC4pOpQbqyi7RrhN7udi9RwhKkMHpvLbHG9Sr" crossorigin="anonymous">
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">

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
                <a href="bookings.php"><li><i class="fas fa-ticket-alt"></i>Bookings </i></li></a>
                <ul class="admin-navigation-schedule-dropdwn hidden-div">
                    <li>View Schedule</li>
                    <li>Edit Schedule</li>
                </ul>
                <a href="movies.php"><li class="active-menu"><i class="fas fa-film"></i>Movies </li></a>
                <a href="hall.php"><li><i class="fas fa-video"></i>Hall</li></a>
                <a href="employee.php"><li><i class="fas fa-user-tie"></i>Employee</li></a>
            </ul>
        </div>
        <div class="admin-section admin-section2">
            <!-- <div class="admin-section-column"> -->
                <div class="admin-section-panel admin-section-panel4">
                    <div class="admin-panel-section-header">
                        <h2>List Movies</h2>
                        <a class="addbtn"  data-toggle="modal" data-target="#add-movie">Add Movie</a>

                    </div>
                    <table cellpadding="10" cellspacing="10" border="1" style="width: 100%;">
                        <tr class="header">
                            <td>ID</td>
                            <td>Title</td>
                            <td>Genre</td>
                            <td>Duration</td>
                            <td>Date</td>
                            <td>Director</td>
                            <td>Actors</td>
                            <td>Price</td>
                            <td>Image</td>
                            <td>Action</td>
                        </tr>
                        <tbody id="tbody" class="p-3">
                        </tbody>
                    </table>
                </div>
            <!-- </div> -->
            <!-- <div class="admin-section-column"> -->
            <div id="add-movie" class="modal fade" role="dialog">
                <div class="modal-dialog">
                    <!-- Modal content-->
                    <div class="modal-content">
                        <div class="modal-header">
                            <hp class="modal-title">Movies</hp>
                            <button type="button" class="close" data-dismiss="modal" >&times;</button>
                        </div>
                        <form method="post" action="add_movie.php" >
                            <div class="modal-body">
                                <div class="form-group">
                                    
                                    <label for="movieTitle">Title: </label>
                                    <input class="form-control" placeholder="Title" type="text" name="movieTitle" required>
                                </div>
                                <div class="form-group">
                                    
                                    <label for="movieGenre">Genre: </label>
                                    <input class="form-control" placeholder="Genre" type="text" name="movieGenre" required>
                                </div>
                                <div class="form-group">
                                    <label for="movieDuration">Duration: </label>
                                    <input class="form-control" placeholder="Duration" type="number" name="movieDuration" required>
                                </div>
                                <div class="form-group">
                                    
                                    <label for="movieRelDate">Date: </label>
                                    <input class="form-control" placeholder="Release Date" type="date" name="movieRelDate" required>
                                </div>
                                <div class="form-group">
                                    
                                    <label for="movieDirector">Director: </label>
                                    <input class="form-control" placeholder="Director" type="text" name="movieDirector" required>
                                </div>
                                <div class="form-group">
                                    <label for="movieActors">Actors: </label>
                                    <input class="form-control" placeholder="Actors" type="text" name="movieActors" required>
                                </div>
                                <div class="form-group">
                                    <label for="ticketPrice">Price: </label>
                                    <input class="form-control" placeholder="Price" type="number" name="ticketPrice" required>
                                </div>
                                <div class="form-group">
                                    <label for="movieImg">Image: </label>
                                    <input class="form-control" type="file" name="movieImg" accept="image/*">
                                </div>
                                <div class="form-group">
                                    <button type="submit" value="submit" name="submit" class="form-btn btn btn-primary px-5 mr-2">Add Movie</button>
                                </div>
                            </div>
                        </form>
                    </div>  
                </div>
            </div>
              
        </div>
    </div>

    <!-- Delete Confirm Modal -->
    <div id="delete-movie" class="modal fade" role="dialog">
        <div class="modal-dialog">
            <!-- Modal content-->
            <div class="modal-content">
                <div class="modal-header">
                    <hp class="modal-title">Delete Movie</hp>
                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                </div>
                
                <div class="modal-body">
                    <p>Bạn có chắc rằng muốn xóa <strong class="movie-delete-title">Captain Marvel</strong> ?</p>
                </div>
                <div class="modal-footer">
                    <input type="hidden">
                    <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                    <button id="btn-del-movie" type="submit" class="btn btn-danger" >Xóa</button>
                </div>
            </div>
        </div>
    </div>

    <!-- Edit Confirm Modal -->
    <div id="edit-movie" class="modal fade" role="dialog">
        <div class="modal-dialog">
            <!-- Modal content-->
            <div class="modal-content">
                <div class="modal-header">
                    <hp class="modal-title">Chỉnh sửa thông tin phim</hp>
                    <button type="button" class="close" data-dismiss="modal" >&times;</button>
                </div>
                <form method="post" id="update-form" novalidate enctype="multipart/form-data">
                    <div class="modal-body">
                        <div class="form-group">
                            <label for="movieTitle">Title: </label>
                            <input id="movieTitleUpdate" class="form-control" placeholder="Title" type="text" name="movieTitle" required>
                        </div>
                        <div class="form-group">
                            
                            <label for="movieGenre">Genre: </label>
                            <input id="movieGenreUpdate" class="form-control" placeholder="Genre" type="text" name="movieGenre" required>
                        </div>
                        <div class="form-group">
                            <label for="movieDuration">Duration: </label>
                            <input id="movieDurationUpdate" class="form-control" placeholder="Duration" type="number" name="movieDuration" required>
                        </div>
                        <div class="form-group">
                            
                            <label for="movieRelDate">Date: </label>
                            <input id="movieDateUpdate" class="form-control" placeholder="Release Date" type="date" name="movieRelDate" required>
                        </div>
                        <div class="form-group">
                            
                            <label for="movieDirector">Director: </label>
                            <input id="movieDirectorUpdate" class="form-control" placeholder="Director" type="text" name="movieDirector" required>
                        </div>
                        <div class="form-group">
                            <label for="movieActors">Actors: </label>
                            <input id="movieActorsUpdate" class="form-control" placeholder="Actors" type="text" name="movieActors" required>
                        </div>
                        <div class="form-group">
                            <label for="ticketPriceUpdate">Price: </label>
                            <input id="ticketPriceUpdate" class="form-control" placeholder="Price" type="number" name="ticketPriceUpdate" required>
                        </div>
                        <div class="form-group">
                            <button id="btn-edit-movie" type="submit" class="btn btn-primary px-5 mr-2">Sửa</button>
                        </div>
                    </div>
                </form>
            </div>  
        </div>
    </div>

    <script src="../scripts/jquery-3.3.1.min.js "></script>
    <script src="../scripts/owl.carousel.min.js "></script>
    <script src="../scripts/script.js "></script>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.16.0/umd/popper.min.js"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>

    <script>
    let movieSelected;
    // tải(read)
    function loadMovies(){
        $('#tbody tr').remove();
        $.ajax({
            type: "GET",
            url: 'get_movies.php',
            success: function(data){
                // console.log(data);
                data.forEach(movie => {
                    // console.log(movie);
                    let linkposter = `http://localhost/Cinema-Reservation/${movie.movieImg}`;
                    let tr = $(`<tr class="item">
                                    <td>${movie.movieID}</td>
                                    <td>${movie.movieTitle}</td>
                                    <td>${movie.movieGenre}</td>
                                    <td>${movie.movieDuration}</td>
                                    <td>${movie.movieRelDate}</td>
                                    <td>${movie.movieDirector}</td>
                                    <td>${movie.movieActors}</td>
                                    <td>${movie.ticketPrice}</td>
                                    
                                    <td><img class="tdImg" src="${linkposter}" alt=""></td>
                                    <td><a onclick="handleModalEdit(this)" href="#">Edit</a> |
                                        <a onclick="handleModalDel(this)" href="#" class="delete" >Delete</a>
                                    </td>
                                </tr>`);
                    $('#tbody').append(tr);
                    tr.attr('movie-info',JSON.stringify(movie));
                })
            },
            dataType: 'json'
        })
        
    }
    loadMovies();

    //xóa(delete)
    function handleModalDel(e){
        let tr = e.parentNode.parentNode;
        let trStr = tr.getAttribute('movie-info');
        // console.log(trStr);
        movieSelected = JSON.parse(trStr);
        $('.movie-delete-title').html(movieSelected.movieTitle);
        $('#delete-movie').modal('show');
    }
    $("#btn-del-movie").click(e => {
        let data = {
            id: movieSelected.movieID
        } ;
        // console.log(data);
        $.ajax({
            type: "DELETE",
            url: 'delete_movie.php',
            data: JSON.stringify(data),
            success: function(data) {
                // console.log(data);
                $('#delete-movie').modal('hide');
                loadMovies();
            },
            dataType: 'json'
        })
    })

    //sửa(update)
    function handleModalEdit(e){
        // console.log(e);
        let tr = e.parentNode.parentNode;
        let trStr = tr.getAttribute('movie-info');
        movieSelected = JSON.parse(trStr);
        $('#movieTitleUpdate').val(movieSelected.movieTitle);
        $('#movieGenreUpdate').val(movieSelected.movieGenre);
        $('#movieDurationUpdate').val(movieSelected.movieDuration);
        $('#movieDateUpdate').val(movieSelected.movieRelDate);
        $('#movieDirectorUpdate').val(movieSelected.movieDirector);
        $('#movieActorsUpdate').val(movieSelected.movieActors);
        $('#ticketPriceUpdate').val(movieSelected.ticketPrice);
        
        $('#edit-movie').modal('show');
    }
    $("#btn-edit-movie").click(e => {
        e.preventDefault();
        let data = {
            movieID: movieSelected.movieID,
            movieTitle: $('#movieTitleUpdate').val(),
            movieGenre: $('#movieGenreUpdate').val(),
            movieDuration: $('#movieDurationUpdate').val(),
            movieRelDate: $('#movieDateUpdate').val(),
            movieDirector: $('#movieDirectorUpdate').val(),
            movieActors: $('#movieActorsUpdate').val(),
            ticketPrice: $('#ticketPriceUpdate').val()
        } ;
        // console.log(data);
        $.ajax({
            type: "POST",
            url: 'update_movie.php',
            data: JSON.stringify(data),
            success: function(data) {
                console.log(data);
                $('#edit-movie').modal('hide');
                loadMovies();
            },
            dataType: 'json'
        })
    })
    </script>
</body>

</html>