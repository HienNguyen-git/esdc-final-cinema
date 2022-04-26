<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Admin</title>
    <link rel="icon" type="image/png" href="../img/logo.png">
    <link rel="stylesheet" href="../style/styles2.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
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
                <a href="movies.php"><li><i class="fas fa-film"></i>Movies </li></a>
                <a href="hall.php"><li class="active-menu"><i class="fas fa-video"></i>Hall</li></a>
                <a href="employee.php"><li><i class="fas fa-user-tie"></i>Employee</li></a>
            </ul>
        </div>
        <div class="admin-section admin-section2">
            <div class="admin-section-column">
                <div class="admin-section-panel admin-section-panel4">
                    <div class="admin-panel-section-header">
                        <h2>List Halls</h2>
                    </div>
                    <table cellpadding="10" cellspacing="10" border="1" style="width: 100%;">
                        <tr class="header">
                            <td>ID</td>
                            <td>Name</td>
                            <td>Chairs</td>
                            <td>Action</td>
                        </tr>
                        <tbody id="tbody">
                            <!-- <tr class="item">
                                <td>1</td>
                                <td>A</td>
                                <td>100</td>
                                <td ><a href="" class="btn btn-primary">Edit</a> | 
                                <a href="#" class="btn btn-danger">Delete</a></td>
                            </tr>
                            <tr class="item">
                                <td>2</td>
                                <td>B</td>
                                <td>200</td>
                                <td ><a href="" class="btn btn-primary">Edit</a> | 
                                <a href="#" class="btn btn-danger">Delete</a></td>
                            </tr> -->
                        </tbody>
                    </table>
                </div>
            </div>
            <div class="admin-section-column">
                <div class="admin-section-panel admin-section-panel2">
                    <div class="admin-panel-section-header">
                        <h2>Halls</h2>
                    </div>
                    <form id="add-hall-form" method="post"  novalidate enctype="multipart/form-data">
                        <label for="hallName">Name: </label>
                        <input id="hallNameAdd" placeholder="Name" type="text" name="hallName" required>
                        <label for="hallChairs">Chairs: </label>
                        <input id="hallChairsAdd" placeholder="Chairs" type="number" name="hallChairs" required>
                        <button type="submit" class="form-btn">Add Hall</button>
                    </form>
                </div>
            </div>

            
        </div>
    </div>

    <!-- Delete Confirm Modal -->
    <div id="delete-hall" class="modal fade" role="dialog">
        <div class="modal-dialog">
            <!-- Modal content-->
            <div class="modal-content">
                <div class="modal-header">
                    <hp class="modal-title">Xóa sản phẩm</hp>
                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                </div>
                
                <div class="modal-body">
                    <p>Bạn có chắc rằng muốn xóa <strong class="hall-delete-name">Main Hall</strong> ?</p>
                </div>
                <div class="modal-footer">
                    <input type="hidden">
                    <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                    <button id="btn-del-hall" type="submit" class="btn btn-danger" >Xóa</button>
                </div>
            </div>
        </div>
    </div>

    <!-- Edit Confirm Modal -->
    <div id="edit-hall" class="modal fade" role="dialog">
        <div class="modal-dialog">
            <!-- Modal content-->
            <div class="modal-content">
                <div class="modal-header">
                    <hp class="modal-title">Chỉnh sửa thông tin nhân viên</hp>
                    <button type="button" class="close" data-dismiss="modal" >&times;</button>
                </div>
                <form method="post" id="update-form" novalidate enctype="multipart/form-data">
                    <div class="modal-body">
                        <div class="form-group">
                            <label for="hallName">Name: </label>
                            <input id="hallNameUpdate" placeholder="Name" type="text" name="hallName" required class="form-control">
                        </div>
                        <div class="form-group">
                            <label for="hallChairs">Chairs: </label>
                            <input id="hallChairsUpdate" placeholder="Chairs" type="text" name="hallChairs" required class="form-control">
                        </div>
                        
                        <div class="form-group">
                            <button id="btn-edit-hall" type="submit" class="btn btn-primary px-5 mr-2">Sửa</button>
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
    let hallSelected;
    // tải(read)
    function loadHall(){
        $('#tbody tr').remove();
        $.ajax({
            type: "GET",
            url: 'get_halls.php',
            success: function(data){
                console.log(data);
                data.forEach(hall => {
                    // console.log(hall);
                    let tr = $(`<tr class="item">
                                    <td>${hall.id}</td>
                                    <td>${hall.name}</td>
                                    <td>${hall.chairs}</td>
                                    <td><a onclick="handleModalEdit(this)" href="#">Edit</a> |
                                        <a onclick="handleModalDel(this)" href="#" class="delete" >Delete</a>
                                    </td>
                                </tr>`);
                    $('#tbody').append(tr);
                    tr.attr('hall-info',JSON.stringify(hall));
                })
            },
            dataType: 'json'
        })
        
    }
    loadHall();

    //thêm(create)
    $('#add-hall-form').submit(e => { 
        e.preventDefault();
        // console.log('hi');
        let data = {
            name: $('#hallNameAdd').val(),
            chairs: $('#hallChairsAdd').val(),
            
            
        }
        // console.log(JSON.stringify(data));
        $.ajax({
            type: "POST",
            url: 'add_hall.php',
            data: JSON.stringify(data),
            success: function(data) {
                // console.log(data);
                loadHall();
            },
            dataType: 'json'
        })
    })

    //xóa(delete)
    function handleModalDel(e){
        // console.log(e);
        let tr = e.parentNode.parentNode;
        let trStr = tr.getAttribute('hall-info');
        hallSelected = JSON.parse(trStr);
        $('.hall-delete-name').html(hallSelected.name);
        $('#delete-hall').modal('show');
    }
    $("#btn-del-hall").click(e => {
        let data = {
            id: hallSelected.id
        } ;
        // console.log(data);
        $.ajax({
            type: "DELETE",
            url: 'delete_hall.php',
            data: JSON.stringify(data),
            success: function(data) {
                // console.log(data);
                $('#delete-hall').modal('hide');
                loadHall();
            },
            dataType: 'json'
        })
    })

    //sửa(update)
    function handleModalEdit(e){
        console.log(e);
        let tr = e.parentNode.parentNode;
        let trStr = tr.getAttribute('hall-info');
        hallSelected = JSON.parse(trStr);
        $('#hallNameUpdate').val(hallSelected.name);
        $('#hallChairsUpdate').val(hallSelected.chairs);
        
 
        $('#edit-hall').modal('show');
    }
    $("#btn-edit-hall").click(e => {
        e.preventDefault();
        let data = {
            id: hallSelected.id,
            name: $('#hallNameUpdate').val(),
            chairs: $('#hallChairsUpdate').val()
            
        } ;
        // console.log(data);
        $.ajax({
            type: "POST",
            url: 'update_hall.php',
            data: JSON.stringify(data),
            success: function(data) {
                // console.log(data);
                $('#edit-hall').modal('hide');
                loadHall();
            },
            dataType: 'json'
        })
    })
    </script>
</body>

</html>