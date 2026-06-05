import Employee from "../model/employee.js";
import EmployeeManager from "../model/employeeManager.js";
import Validation from "../model/validation.js";

const employeeManager = new EmployeeManager();
const validation = new Validation();

function getID(id) {
    return document.getElementById(id);
}

function getInfoEmployee(isAdd) {
    const user = getID("tknv").value;
    const fullName = getID("name").value;
    const email = getID("email").value;
    const password = getID("password").value;
    const startDate = getID("datepicker").value;
    const basicSalary = getID("luongCB").value * 1;
    const position = getID("chucvu").value;
    const timeWork = getID("gioLam").value * 1;

    let isValid = true;

    if (isAdd) {
        isValid &= validation.checkEmpty(user, "tbTKNV", "User được không bỏ trống") &&
                   validation.checkExist(employeeManager.arrEmployee, user, "tbTKNV", "Tài khoản đã tồn tại");
    }

    isValid &= validation.checkEmpty(fullName, "tbTen", "Họ tên ko được bỏ trống") &&
               validation.checkCharacterName(fullName, "tbTen", "Vui lòng chỉ nhập chữ ko đc nhập số");

    isValid &= validation.checkEmpty(email, "tbEmail", "Email không được bỏ trống") &&
               validation.checkEmail(email, "tbEmail", "Vui lòng nhập đúng định dạng email");

    isValid &= validation.checkEmpty(password, "tbMatKhau", "Password không được bỏ trống") &&
               validation.checkPassword(password, "tbMatKhau", "Mật Khẩu từ 6-10 ký tự (chứa ít nhất 1 ký tự số, 1 ký tự in hoa, 1 ký tự đặc biệt)");

    isValid &= validation.checkEmpty(startDate, "tbNgay", "Ngày làm không được bỏ trống") &&
               validation.checkWorkDate(startDate, "tbNgay", "Vui lòng chọn đầy đủ theo định dạng mm/dd/yyyy");

    isValid &= validation.checkEmpty(basicSalary, "tbLuongCB", "Lương CB không được bỏ trống") &&
               validation.checkSalary(basicSalary, "tbLuongCB", "Lương không được thấp hơn 1.000.000", "Lương không lương không quá cao trên 20.000.000");

    isValid &= validation.checkSelectPostion("chucvu", "tbChucVu", "Bạn chưa chọn vị trí chức vụ");

    isValid &= validation.checkEmpty(timeWork, "tbGiolam", "Giờ làm không được bỏ trống") &&
               validation.checkWorkTime(timeWork, "tbGiolam", "Chỉ cho phép nhập từ phạm vi 80 - 200 giờ");

    if (!isValid) return;

    const employee = new Employee(
        user,
        fullName,
        email,
        password,
        startDate,
        basicSalary,
        position,
        timeWork
    );

    employee.calcTotalSalary(position);
    employee.employeeRating(timeWork);

    return employee;
}

function renderListEmployee(arrEmployee) {
    let content = "";
    for(let i = 0; i < arrEmployee.length; i++) {
        const employee = arrEmployee[i];
        content += `
            <tr>
                <td>${employee.user}</td>
                <td>${employee.fullname}</td>
                <td>${employee.email}</td>
                <td>${employee.startDate}</td>
                <td>${employee.position}</td>
                <td>${employee.totalSalary}</td>
                <td>${employee.rating}</td>
                <td>
                    <button onclick="handleEdit('${employee.user}');" class="btn btn-warning" data-toggle="modal" data-target="#myModal">Edit</button>
                    <button onclick="handleDelete('${employee.user}');" class="btn btn-danger">Del</button>
                </td>
            </tr>
        `;
    }

    getID("tableDanhSach").innerHTML = content;
}

// Lưu trữ vào LocalStorage (trên phía client)
function setLocalStorage() {
    const data = JSON.stringify(employeeManager.arrEmployee);
    localStorage.setItem("LIST_EMPLOYEE", data);
}

// Lấy dữ liệu để trả về để hiển thị trên giao diện
function getLocalStorage() {
    const dataString = localStorage.getItem("LIST_EMPLOYEE");
    const data = JSON.parse(dataString);
    employeeManager.arrEmployee = data;
    renderListEmployee(employeeManager.arrEmployee);
}

getLocalStorage();

// Tạo chức năng thêm người dùng
getID("btnThemNV").onclick = function () {
    const employee = getInfoEmployee(true);

    if (!employee) return;

    employeeManager.addEmployee(employee);

    renderListEmployee(employeeManager.arrEmployee);

    setLocalStorage();

    $('#myModal').modal('hide');
}

//Sự kiện khi nhấn hiển thị Modal Box khi nhấn nút thêm
getID("btnThem").onclick = function () {
    getID("header-title").innerHTML = "Thêm nhân viên mới";
    getID("btnCapNhat").style.display = "none";
    getID("btnThemNV").style.display = "block";

    getID("tknv").value = "";
    getID("tknv").disabled = false;
    getID("name").value = "";
    getID("email").value = "";
    getID("password").value = "";
    getID("datepicker").value = "";
    getID("luongCB").value = "";
    getID("chucvu").selectedIndex = 0;
    getID("gioLam").value = "";

    getID("tbTKNV").style.display = "none";
    getID("tbTen").style.display = "none";
    getID("tbEmail").style.display = "none";
    getID("tbMatKhau").style.display = "none";
    getID("tbNgay").style.display = "none";
    getID("tbLuongCB").style.display = "none";
    getID("tbChucVu").style.display = "none";
    getID("tbGiolam").style.display = "none";
}

//Tạo chức năng xóa User
function handleDelete (user) {
    employeeManager.deleteUserItem(user);
    renderListEmployee(employeeManager.arrEmployee);
    setLocalStorage();
    alert("Xóa thành công!");
}
window.handleDelete = handleDelete;

// Tạo sự kiện hiển thị form sửa User
function handleEdit (user) {
    getID("header-title").innerHTML = "Sửa thông tin người dùng";
    getID("btnThemNV").style.display = "none";
    getID("btnCapNhat").style.display = "block";

    const employee = employeeManager.getEmployeeByUser(user);
    getID("tknv").value = employee.user;
    getID("tknv").disabled = true;
    getID("name").value = employee.fullname;
    getID("email").value= employee.email;
    getID("password").value = employee.password;
    getID("datepicker").value = employee.startDate;
    getID("luongCB").value = employee.basicSalary;
    getID("chucvu").value = employee.position;
    getID("gioLam").value = employee.timeWork;

    getID("tbTKNV").style.display = "none";
    getID("tbTen").style.display = "none";
    getID("tbEmail").style.display = "none";
    getID("tbMatKhau").style.display = "none";
    getID("tbNgay").style.display = "none";
    getID("tbLuongCB").style.display = "none";
    getID("tbChucVu").style.display = "none";
    getID("tbGiolam").style.display = "none";
}
window.handleEdit = handleEdit;

// Tạo chức năng sửa User
getID("btnCapNhat").onclick = function () {
    const employee = getInfoEmployee(false);

    employeeManager.updateEmployeeItem(employee);

    renderListEmployee(employeeManager.arrEmployee);

    setLocalStorage();

    $('#myModal').modal('hide');
}