class EmployeeManager {
    constructor() {
        this.arrEmployee = [];
    }

    addEmployee(employee) {
        this.arrEmployee.push(employee);
    }

    findIndexEmployee (user) {
        let index = -1;

        for (let i = 0; i < this.arrEmployee.length; i++) {
            const userItem = this.arrEmployee[i];
            if (userItem.user === user) {
                index = i;
                break;
            }
        }
        return index;
    }

    deleteUserItem (user) {
        const index = this.findIndexEmployee(user);
        if (index != -1) {
            this.arrEmployee.splice(index, 1);
        }
    }

    getEmployeeByUser (user) {
        const index = this.findIndexEmployee(user);
        if (index != -1) {
            return this.arrEmployee[index];
        }
    }

    updateEmployeeItem (employee) {
        const index = this.findIndexEmployee(employee.user);
        if (index != -1) {
            return this.arrEmployee[index] = employee;
        }
    }
}

export default EmployeeManager;