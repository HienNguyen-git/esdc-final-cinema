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
                <a href="hall.php"><li><i class="fas fa-video"></i>Hall</li></a>
                <a href="employee.php" ><li class="active-menu"><i class="fas fa-user-tie"></i>Employee</li></a>
            </ul>
        </div>
        <div class="admin-section admin-section2">
            <div class="admin-section-column">
                <div class="admin-section-panel admin-section-panel4">
                    <div class="admin-panel-section-header">
                        <h2>List Employees</h2>
                    </div>
                    <table cellpadding="10" cellspacing="10" border="1" style="width: 100%;">
                        <tr class="header">
                            <td>ID</td>
                            <td>Name</td>
                            <td>Phone</td>
                            <td>Job</td>
                            <td>Gender</td>
                            <td>Action</td>
                        </tr>
                        <tbody id="tbody">
                            <!-- <tr class="item">
                                <td>1</td>
                                <td>Nguyen Van A</td>
                                <td>0908665356</td>
                                <td>Receptionist</td>
                                <td>Male</td>
                                <td ><a href="" class="btn btn-primary">Edit</a> | 
                                <a href="#" class="btn btn-danger">Delete</a></td>
                            </tr>
                            <tr class="item">
                                <td>1</td>
                                <td>Nguyen Van A</td>
                                <td>0908665356</td>
                                <td>Receptionist</td>
                                <td>Male</td>
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
                        <h2>Employees</h2>
                    </div>
                    <form id="add-employee-form" method="post"  novalidate enctype="multipart/form-data">
                        <label for="employeeName">Name: </label>
                        <input id="employeeName" placeholder="Name" type="text" name="employeeName" required>
                        <label for="employeePhone">Phone: </label>
                        <input  id="employeePhone" placeholder="Phone" type="text" name="employeePhone" required>
                        <label for="employeeJob">Job: </label>
                        <input  id="employeeJob" placeholder="Job" type="text" name="employeeJob" required>
                        <label for="employeeGender">Gender: </label>
                        <input  id="employeeGender" placeholder="Gender" type="text" name="employeeGender" required>
                        <button type="submit"  class="form-btn">Add Employee</button>
                    </form>
                </div>
            </div>
        </div>
    </div>

    <!-- Delete Confirm Modal -->
    <div id="delete-employee" class="modal fade" role="dialog">
        <div class="modal-dialog">
            <!-- Modal content-->
            <div class="modal-content">
                <div class="modal-header">
                    <hp class="modal-title">Xóa sản phẩm</hp>
                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                </div>
                
                <div class="modal-body">
                    <p>Bạn có chắc rằng muốn xóa <strong class="employee-delete-name">Nguyen Thi Tu</strong> ?</p>
                </div>
                <div class="modal-footer">
                    <input type="hidden">
                    <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                    <button id="btn-del-employee" type="submit" class="btn btn-danger" >Xóa</button>
                </div>
            </div>
        </div>
    </div>

    <!-- Edit Confirm Modal -->
    <div id="edit-employee" class="modal fade" role="dialog">
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
                            <label for="employeeName">Name:</label>
                            <input name="employeeName" required class="form-control" type="text" placeholder="Name" id="employeeNameUpdate">
                        </div>
                        <div class="form-group">
                            <label for="employeePhone">Phone: </label>
                            <input name="employeePhone" required class="form-control" type="text" placeholder="Phone" id="employeePhoneUpdate">
                        </div>
                        <div class="form-group">
                            <label for="employeeJob">Job: </label>
                            <input name="employeeJob" required class="form-control" type="text" placeholder="Job" id="employeeJobUpdate">
                        </div>
                        <div class="form-group">
                            <label for="employeeGender">Gender: </label>
                            <input name="employeeGender" required class="form-control" type="text" placeholder="Gender" id="employeeGenderUpdate">
                        </div>
                        <div class="form-group">
                            <button id="btn-edit-employee" type="submit" class="btn btn-primary px-5 mr-2">Sửa</button>
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
    let employeeSelected;
    // tải(read)
    function loadEmployee(){
        $('#tbody tr').remove();
        $.ajax({
            type: "GET",
            url: 'get_employees.php',
            success: function(data){
                // console.log(data);
                data.forEach(employee => {
                    // console.log(employee);
                    let tr = $(`<tr class="item">
                                    <td>${employee.id}</td>
                                    <td>${employee.name}</td>
                                    <td>${employee.phone}</td>
                                    <td>${employee.job}</td>
                                    <td>${employee.gender}</td>
                                    <td><a onclick="handleModalEdit(this)" href="#">Edit</a> |
                                        <a onclick="handleModalDel(this)" href="#" class="delete" >Delete</a>
                                    </td>
                                </tr>`);
                    $('#tbody').append(tr);
                    tr.attr('employee-info',JSON.stringify(employee));
                })
            },
            dataType: 'json'
        })
        
    }
    loadEmployee();

    //thêm(create)
    $('#add-employee-form').submit(e => { 
        e.preventDefault();
        // console.log('hi');
        let data = {
            name: $('#employeeName').val(),
            phone: $('#employeePhone').val(),
            job: $('#employeeJob').val(),
            gender: $('#employeeGender').val()
            
        }
        // console.log(JSON.stringify(data));
        $.ajax({
            type: "POST",
            url: 'add_employee.php',
            data: JSON.stringify(data),
            success: function(data) {
                console.log(data);
                loadEmployee();
            },
            dataType: 'json'
        })
    })

    //xóa(delete)
    function handleModalDel(e){
        console.log(e);
        let tr = e.parentNode.parentNode;
        let trStr = tr.getAttribute('employee-info');
        employeeSelected = JSON.parse(trStr);
        $('.employee-delete-name').html(employeeSelected.name);
        $('#delete-employee').modal('show');
    }
    $("#btn-del-employee").click(e => {
        let data = {
            id: employeeSelected.id
        } ;
        console.log(data);
        $.ajax({
            type: "DELETE",
            url: 'delete_employee.php',
            data: JSON.stringify(data),
            success: function(data) {
                // console.log(data);
                $('#delete-employee').modal('hide');
                loadEmployee();
            },
            dataType: 'json'
        })
    })

    //sửa(update)
    function handleModalEdit(e){
        console.log(e);
        let tr = e.parentNode.parentNode;
        let trStr = tr.getAttribute('employee-info');
        employeeSelected = JSON.parse(trStr);
        $('#employeeNameUpdate').val(employeeSelected.name);
        $('#employeePhoneUpdate').val(employeeSelected.phone);
        $('#employeeJobUpdate').val(employeeSelected.job);
        $('#employeeGenderUpdate').val(employeeSelected.gender);
 
        $('#edit-employee').modal('show');
    }
    $("#btn-edit-employee").click(e => {
        e.preventDefault();
        let data = {
            id: employeeSelected.id,
            name: $('#employeeNameUpdate').val(),
            phone: $('#employeePhoneUpdate').val(),
            job: $('#employeeJobUpdate').val(),
            gender: $('#employeeGenderUpdate').val()
        } ;
        // console.log(data);
        $.ajax({
            type: "POST",
            url: 'update_employee.php',
            data: JSON.stringify(data),
            success: function(data) {
                // console.log(data);
                $('#edit-employee').modal('hide');
                loadEmployee();
            },
            dataType: 'json'
        })
    })
    </script>
</body>

</html>