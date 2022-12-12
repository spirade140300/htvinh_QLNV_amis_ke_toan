$("#header").load("../Common/header.html"); 
$("#footer").load("../Common/footer.html"); 
$("#sidemenu").load("../Common/sidemenu.html"); 

$(function(){
    $( "#detail-dialog" ).dialog({
        autoOpen: false,
        width: 1024,
        height: 720,
        maxwidth: 800
      });

    this.addNewOnClick = function(){
        $("#detail-dialog").dialog(
            'open'
            );
    }

})

this.CallAPIToGetData = function(){
    $.ajax({
        url: "https://amis.manhnv.net/api/v1/Employees",
        type: "GET",
        success: function(result){
            LoadDataToGrid(result)
        },
        done : function(result){
            console.log(result);
        }
    });
}

this.LoadDataToGrid = function(data){
    if(!data){
        return;
    }

    var arrayLength = data.length;
    for (var i = 0; i < arrayLength; i++) {
        let employeeCode = data[i]["EmployeeCode"] ? data[i]["EmployeeCode"] : "Không có";
        let employeeName = data[i]["EmployeeName"] ? data[i]["EmployeeName"] : "Không có";
        let employeeGender = data[i]["EmployeeGender"] ? data[i]["EmployeeGender"] : "Không có";
        let employeeBirthDate = data[i]["EmployeeBirthDate"] ? data[i]["EmployeeBirthDate"] : "Không có";
        let employeeSocialId = data[i]["EmployeeSocialId"] ? data[i]["EmployeeSocialId"] : "Không có";
        let employeeTitle = data[i]["EmployeeTitle"] ? data[i]["EmployeeTitle"] : "Không có";
        let employeeUnit = data[i]["EmployeeUnit"] ? data[i]["EmployeeUnit"] : "Không có";
        let employeeBankNumber = data[i]["EmployeeBankNumber"] ? data[i]["EmployeeBankNumber"] : "Không có";
        let employeeBankName = data[i]["EmployeeBankName"] ? data[i]["EmployeeBankName"] : "Không có";
        let employeeBankBranch = data[i]["EmployeeBankBranch"] ? data[i]["EmployeeBankBranch"] : "Không có";
        let employeeOption = `<p class="inline-block">sửa </p><select id="${employeeCode}" class="selector inline-block w-20">
                                <option style="display: none"> </option>
                                <option value="duplicate">Nhân bản</option>
                                <option value="delete">Xóa</option>
                                <option value="deactivate">Ngừng sử dụng</option>
                            </select>`;
        let newRow = 
        `<tr id="table-row-${i}">
        <th id="column-checkbox"><input type="checkbox"></th>
        <th id="employee-code">${employeeCode}</th>
        <th id="employee-name">${employeeName}</th>
        <th id="employee-gender">${employeeGender}</th>
        <th id="employee-birthdate">${employeeBirthDate}</th>
        <th id="employee-social-id">${employeeSocialId}</th>
        <th id="employee-title">${employeeTitle}</th>
        <th id="employee-unit">${employeeUnit}</th>
        <th id="employee-bank-numder">${employeeBankNumber}</th>
        <th id="employee-bank-name">${employeeBankName}</th>
        <th id="employee-bank-branch">${employeeBankBranch}</th>
        <th id="employee-option">${employeeOption}</th>
        </tr>`;

        $('#employee-table').append(newRow);
    }
    

    
}

AppenDataToGrid = function(){}

CallAPIToGetData();