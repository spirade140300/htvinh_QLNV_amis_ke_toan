$("#header").load("../Common/header.html");
$("#footer").load("../Common/footer.html");
$("#sidemenu").load("../Common/sidemenu.html");

this.addNewOnClick = function () {
    $("#detail-dialog").removeAttr("style");
    $("#detail-code-input").focus();
}

this.$('select').on('change', function () {
    GetDataWithPaging();
});

this.detailHelpClick = function () {

}

this.changePage = function(event){
    console.log(this);
}

this.closeIconClick = function () {
    $("#detail-dialog").attr("style", "display:none");
}

this.CallAPIToGetData = function () {
    $.ajax({
        url: "https://amis.manhnv.net/api/v1/Employees",
        type: "GET",
        success: function (result) {
            LoadDataToGrid(result)
        },
        done: function (result) {
            console.log(result);
        }
    });
}

$('.employee-delete').click(function() {
    console.log(this.employee-code);
  });

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

this.deleteEmployee = function(){
    var employeeCode = option
    $.ajax({
        url: "https://amis.manhnv.net/api/v1/Employees/",
        type: "POST",
        data: {
            
        },
        success: function (result) {
            LoadDataToGrid(result)
        },
        done: function (result) {
            console.log(result);
        }
    });
}

this.LoadDataToGrid = function (data) {
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
        $("#pagination").append(`<a value="1" onclick="changePage()" class="active">1</a>`);
        for(let x = 1; x < totalPage; x++){
            $("#pagination").append(`<a value="${x+1}" onclick="changePage()">${x+1}</a>`)
        }
        $("#pagination").append(`<a>Sau</a>`);
    }
    var totalRecord = data.TotalRecord;
    var arrayLength = resultData.length;

    for (var i = 0; i < arrayLength; i++) {
        let employeeId = resultData[i]["EmployeeId"] ? resultData[i]["EmployeeId"] : "Không có";
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
        let employeeOption = `<p class="inline-block">sửa </p><select id="${employeeCode}" class="selector inline-block w-20">
                                <option style="display: none""> </option>
                                <option value="duplicate">Nhân bản</option>
                                <option value="delete" employee-code="${employeeCode}" >Xóa</option>
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

this.initPaging = function(){
    
}

AppenDataToGrid = function () { }

GetDataWithPaging();