// Load các thành phần chung
$("#header").load("../Common/header.html");
$("#footer").load("../Common/footer.html");
$("#sidemenu").load("../Common/sidemenu.html");

// Event của nút thêm mới nhân viên
this.addNewOnClick = function () {
    $("#detail-dialog").removeAttr("style");
    $("#detail-code-input").focus();
}

this.$('select').on('change', function () {
    GetDataWithPaging();
});

// Đón form detail
this.closeIconClick = function () {
    $("#detail-dialog").attr("style", "display:none");
}
// Gọi API lấy tất cả các nhân viên
// this.CallAPIToGetData = function () {
//     $.ajax({
//         url: "https://amis.manhnv.net/api/v1/Employees",
//         type: "GET",
//         success: function (result) {
//             LoadDataToGrid(result)
//         },
//         done: function (result) {
//             console.log(result);
//         }
//     });
// }

this.$('.employee-option option').each(function(){
    debugger
    if($(this).is(':selected')){
        debugger
    }
})

this.$('.employee-option').on('click', '.employee-id', function(){
    debugger
})

// Lấy data nhân viên với phân trang
this.GetDataWithPaging = function () {
    var pageSize = $('#select-records-per-page').find(":selected").val();
    var pageNumber = $("#pagination a.active").attr("value");
    $.ajax({
        url: "https://amis.manhnv.net/api/v1/Employees/filter",
        type: "GET",
        data: {
            pageSize: pageSize,
            pageNumber: pageNumber
        },
        success: function (result) {
            LoadDataToGrid(result)
        },
        done: function (result) {
            console.log(result);
        }
    });
}

// Lấy thông tin phòng ban
this.GetDepartmentData = function(){
    $.ajax({
        url: "https://amis.manhnv.net/api/v1/Departments",
        type: "GET",
        success: function (result) {
            LoadDepartmentData(result)
        },
        done: function (result) {
            console.log(result);
        }
    });
}

// Load data phòng ban vào thẻ select
this.LoadDepartmentData = function(data){
    if (!data) {
        return;
    }
    var arrayLength = data.length;
    for (var i = 0; i < arrayLength; i++) {
        let departmentName = data[i]["DepartmentName"] ? data[i]["DepartmentName"] : "Không có";
        let departmentId = data[i]["DepartmentId"] ? data[i]["DepartmentId"] : "Không có";
        $("#department-select").append(`<option value="${departmentId}">${departmentName}</option>`);
    }
}

// Load data vào trong grid employee list 
this.LoadDataToGrid = function (data) {
    // check xem co data ko
    if (!data.Data) {
        return;
    }
    if ($("#employee-table tr").length > 0) {
        $("#employee-table").find("tr:gt(0)").remove();
    }
    var resultData = data.Data;
    var totalPage = data.TotalPage;
    if(totalPage > 0){
        $("#pagination").empty();
        $("#pagination").append(`<a>Trước</a>`);
        $("#pagination").append(`<a value="1" onclick="GetDataWithPaging()" class="active">1</a>`);
        for(let x = 1; x < totalPage; x++){
            $("#pagination").append(`<a value="${x+1}" onclick="GetDataWithPaging()">${x+1}</a>`)
        }
        $("#pagination").append(`<a>Sau</a>`);
    }
    var totalRecord = data.TotalRecord;
    var arrayLength = resultData.length;

    for (var i = 0; i < arrayLength; i++) {
        let employeeId =  resultData[i]["EmployeeId"] ? resultData[i]["EmployeeId"] : "Không có";
        let employeeCode = resultData[i]["EmployeeCode"] ? resultData[i]["EmployeeCode"] : "Không có";
        let employeeName = resultData[i]["EmployeeName"] ? resultData[i]["EmployeeName"] : "Không có";
        let employeeGender = resultData[i]["EmployeeGender"] ? resultData[i]["EmployeeGender"] : "Không có";
        let employeeBirthDate = resultData[i]["EmployeeBirthDate"] ? resultData[i]["EmployeeBirthDate"] : "Không có";
        let employeeSocialId = resultData[i]["EmployeeSocialId"] ? resultData[i]["EmployeeSocialId"] : "Không có";
        let employeeTitle = resultData[i]["EmployeeTitle"] ? resultData[i]["EmployeeTitle"] : "Không có";
        let employeeUnit = resultData[i]["EmployeeUnit"] ? resultData[i]["EmployeeUnit"] : "Không có";
        let employeeBankNumber = resultData[i]["EmployeeBankNumber"] ? resultData[i]["EmployeeBankNumber"] : "Không có";
        let employeeBankName = resultData[i]["EmployeeBankName"] ? resultData[i]["EmployeeBankName"] : "Không có";
        let employeeBankBranch = resultData[i]["EmployeeBankBranch"] ? resultData[i]["EmployeeBankBranch"] : "Không có";
        let employeeOption = `<p class="inline-block">sửa </p><select id="${employeeCode}" class="selector inline-block w-20" onchange="manageEmployee(this);">
                                <option style="display: none"> </option>
                                <option value="duplicate">Nhân bản</option>
                                <option value="delete" employee-id="${employeeId}">Xóa</option>
                                <option value="deactivate">Ngừng sử dụng</option>
                            </select>`;
        let newRow =
            `<tr id="table-row-${i}">
        <td id="column-checkbox"><input type="checkbox"></td>
        <td id="employee-code">${employeeCode}</td>
        <td id="employee-name">${employeeName}</td>
        <td id="employee-gender">${employeeGender}</td>
        <td id="employee-birthdate">${employeeBirthDate}</td>
        <td id="employee-social-id">${employeeSocialId}</td>
        <td id="employee-title">${employeeTitle}</td>
        <td id="employee-unit">${employeeUnit}</td>
        <td id="employee-bank-numder">${employeeBankNumber}</td>
        <td id="employee-bank-name">${employeeBankName}</td>
        <td id="employee-bank-branch">${employeeBankBranch}</td>
        <td id="employee-option">${employeeOption}</td>
        </tr>`;

        $('#employee-table').append(newRow);
    }

    $("#total-record").html(totalRecord);
}

this.manageEmployee = function(e){
    
    
}

this.addNewEmployee = function(){
    let employeeCode = $("#detail-code-input").val();
    
}

this.init = function(){
    GetDataWithPaging();
    GetDepartmentData();
}

this.init();