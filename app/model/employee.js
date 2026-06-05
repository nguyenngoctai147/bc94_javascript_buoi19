class Employee {
    constructor(_user, _fullName, _email, _password, _startDate, _basicSalary, _position, _timeWork) {
        this.user = _user;
        this.fullname = _fullName;
        this.email = _email;
        this.password = _password;
        this.startDate = _startDate;
        this.basicSalary = _basicSalary;
        this.position = _position;
        this.timeWork = _timeWork;
        this.totalSalary = 0;
        this.rating = "";
    }

    calcTotalSalary(position) {
        switch (position) {
            case "Sếp":
                this.totalSalary = this.basicSalary * 3;
                break;
            case "Trưởng phòng":
                this.totalSalary = this.basicSalary * 2;
                break;
            default:
                this.totalSalary = this.basicSalary;
        }
        return this.totalSalary;
    }

    employeeRating(timeWork) {
        if (timeWork >= 192) {
            this.rating = "Xuất sắc";
        } else if (timeWork >= 176) {
            this.rating = "Giỏi";
        } else if (timeWork >= 160) {
            this.rating = "Khá";
        } else {
            this.rating = "Trung bình";
        }
        return this.rating;
    }
}

export default Employee;