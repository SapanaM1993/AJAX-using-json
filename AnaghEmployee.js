var allSrc;
var showImageBool = false;
//for add employee and edit
function resetModalValues(){
    document.getElementById("modal-title").innerHTML="Add Employee";
    document.getElementById("addEmployee").innerHTML="Add";
    document.getElementById("addEmployee").setAttribute("onClick", "addNewEmployee()");
    document.getElementById("name").value=null;
    document.getElementById("salary").value=null;
    document.getElementById("joinDate").value=null;
}
//for changing the values
function changeModalValues(recordIdx){
    recordIdx = Number(recordIdx);
        document.getElementById("modal-title").innerHTML="Edit Employee";
        document.getElementById("addEmployee").innerHTML="Submit";
        document.getElementById("addEmployee").setAttribute("onClick", "editExistingEmployee("+recordIdx+")");
        document.getElementById("code").value=parseInt(allSrc[recordIdx]["code"].slice(2));
        document.getElementById("name").value=allSrc[recordIdx]["name"];
        document.getElementById("salary").value=allSrc[recordIdx]["salary"];
        document.getElementById("joinDate").value=allSrc[recordIdx]["joining"];

}
//edit button
function editExistingEmployee(i){
    document.getElementById(i+"-code").innerHTML = "E-" + document.getElementById("code").value;
    document.getElementById(i+"-name").innerHTML = document.getElementById("name").value;
    document.getElementById(i+"-joinDate").innerHTML= document.getElementById("joinDate").value;
    document.getElementById(i+"-salary").innerHTML = document.getElementById("salary").value;
    document.getElementById(i+"-image").innerHTML;

}
//Add employee in navigation bar
function addNewEmployee(){
        var empCode = "E-" + document.getElementById("code").value;
        var EmplName = document.getElementById("name").value;
        var emplJoinDate = document.getElementById("joinDate").value;
        var emplSal = document.getElementById("salary").value;
        var emplPic = document.getElementById("upload").value;

        console.log("code:" + empCode + "name: " + EmplName + ", joinDate: " + emplJoinDate + ", salary: " + emplSal + "image" + emplPic);
        var dataDiv = document.getElementById('dataEntry');

        var newRow = document.createElement('div');
        newRow.setAttribute('class', 'row dataRow');

        var code = document.createElement('div');
        code.setAttribute('class', 'col-sm-1');
        code.innerHTML = empCode;

        var name = document.createElement('div');
        name.setAttribute('class', 'col-sm-4');
        name.innerHTML = EmplName;

        var joinDate = document.createElement('div');
        joinDate.setAttribute('class', 'col-sm-2');
        joinDate.innerHTML = emplJoinDate;

        var salary = document.createElement('div');
        salary.setAttribute('class', 'col-sm-1');
        salary.innerHTML = emplSal;

        var image = document.createElement('div');
        var imgPlaceHolder = document.createElement('div');
        imgPlaceHolder.setAttribute('id', "emp_"+empCode);
        image.setAttribute('class', 'col-sm-2');
        image.appendChild(imgPlaceHolder);

        var pic = document.createElement('img');
        pic.setAttribute('src',emplPic);
        pic.setAttribute('height', '100px');
        pic.setAttribute('width', '100px');
        imgPlaceHolder.appendChild(pic);


        var editBtnDiv = document.createElement('div');
        var editBtn = document.createElement('button');
        editBtn.setAttribute('class', 'btn btn-primary btn-sm');
        editBtn.innerHTML = "edit";

        editBtnDiv.setAttribute('class', 'col-sm-2');
        editBtnDiv.appendChild(editBtn);

        newRow.appendChild(code);
        newRow.appendChild(name);
        newRow.appendChild(joinDate);
        newRow.appendChild(salary);
        newRow.appendChild(image);
        newRow.appendChild(editBtnDiv);
        dataDiv.appendChild(newRow);


}

function loadXMLDocShow() {
    var request;
    if (window.XMLHttpRequest) {// code for IE7+, Firefox, Chrome, Opera, Safari
        request = new XMLHttpRequest();
    }
    else {// code for IE6, IE5
        request = new ActiveXObject("Microsoft.XMLHTTP");
    }
    //getting image from JSON file
    request.open("GET", 'Employee.json');

    request.onreadystatechange = function () {
        if (request.status === 200 && request.readyState === 4) {
            allSrc = JSON.parse(request.responseText);
            console.log(allSrc.length);

            var dataDiv = document.getElementById('dataEntry');
            dataDiv.innerHTML="";

            for (var i = 0; i < allSrc.length; i++) {
                console.log(allSrc[i].code);
                var newRow = document.createElement('div');
                newRow.setAttribute('class', 'row dataRow');

                var code = document.createElement('div');
                code.setAttribute('class', 'col-sm-1');
                code.setAttribute('id', i+"-"+"code");
                code.innerHTML = allSrc[i].code;

                var name = document.createElement('div');
                name.setAttribute('class', 'col-sm-4');
                name.setAttribute('id', i+"-"+"name");
                name.innerHTML = allSrc[i].name;

                var joinDate = document.createElement('div');
                joinDate.setAttribute('class', 'col-sm-2');
                joinDate.setAttribute('id', i+"-" +"joinDate");
                joinDate.innerHTML = allSrc[i].joinDate;

                var salary = document.createElement('div');
                salary.setAttribute('class', 'col-sm-1');
                salary.setAttribute('id', i+"-"+"salary");
                salary.innerHTML = allSrc[i].salary;

                var image = document.createElement('div');
                var imgPlaceHolder = document.createElement('div');
                imgPlaceHolder.setAttribute('id', "emp_"+i);
                image.setAttribute('class', 'col-sm-2');
                image.setAttribute('id', i+"-"+"image");
                image.appendChild(imgPlaceHolder);

                var editBtnDiv = document.createElement('div');
                var editBtn = document.createElement('button');
                editBtn.setAttribute("data-toggle", "modal");
                editBtn.setAttribute("data-target","#addModal");
                editBtn.setAttribute("onClick", "changeModalValues(\'" +i+ "\')");
                editBtn.setAttribute('class', 'btn btn-primary btn-sm');
                editBtn.innerHTML = "edit";

                editBtnDiv.setAttribute('class', 'col-sm-2');
                editBtnDiv.appendChild(editBtn);

                newRow.appendChild(code);
                newRow.appendChild(name);
                newRow.appendChild(joinDate);
                newRow.appendChild(salary);
                newRow.appendChild(image);
                newRow.appendChild(editBtnDiv);
                dataDiv.appendChild(newRow);

            }
        }
    }
    request.send();
}

//getting image and fixing the length
function showImage(){
    var showImageBtn = document.getElementById("showImage");

    if(!showImageBool){
        for(var i = 0; i < allSrc.length; i++){
            var imageDiv = document.getElementById("emp_"+i);
            var image = document.createElement("img");
            image.setAttribute("src", allSrc[i].image);
            image.setAttribute("width", "100px");
            image.setAttribute("height", "100px");
            imageDiv.appendChild(image);
        }
        showImageBtn.innerHTML="Hide Image";
        showImageBool = true;
    }else{
        for(var i = 0; i < allSrc.length; i++){
            var imageDiv = document.getElementById("emp_"+i);
            imageDiv.removeChild(imageDiv.firstChild);
        }
        showImageBtn.innerHTML="Show Image";
        showImageBool = false;
    }
}