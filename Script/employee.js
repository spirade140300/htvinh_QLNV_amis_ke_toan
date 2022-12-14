$("#header").load("../Common/header.html"); 
$("#footer").load("../Common/footer.html"); 
$("#sidemenu").load("../Common/sidemenu.html"); 

this.addNewOnClick = function(){
    $("#detail-dialog").removeAttr("style");
    $("#detail-code-input").focus();
}



this.detailHelpClick = function(){

}

this.closeIconClick = function(){
    $("#detail-dialog").attr("style", "display:none");
}

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
    

    
}

AppenDataToGrid = function(){}

CallAPIToGetData();