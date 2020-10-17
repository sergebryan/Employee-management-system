const inquirer = require('inquirer');
const cTable = require('console.table');

var department = require('./department.js');
var role = require('./role.js');
var employee = require('./employee.js');

function addDepartment(name) {
    department.insertDepartment(name, function (err, result) {
        if (!err) {
            console.log("Department Added.");
            menu();
        }
        else {
            console.log(err);
        }
    });
}

function addRole(title, salary, department) {
    role.insertRole(title, salary, department, function (err, result) {
        if (!err) {
            console.log("Role Added.");
            menu();
        }
        else {
            console.log(err);
        }
    });
}

function addEmployee(firstName, lastName, roleId, managerId) {
    employee.insertEmployee(firstName, lastName, roleId, managerId, function (err, result) {
        if (!err) {
            console.log("Employee Added.");
            menu();
        }
        else {
            console.log(err);
        }
    });
}

function viewDepartments() {
    department.getAllDepartments(function (err, result) {
        if (!err) {
            console.table(result);
            menu();
        }
        else {
            console.log(err);
        }
    });
}

function viewRoles() {
    role.getAllRoles(function (err, result) {
        if (!err) {
            console.table(result);
            menu();
        }
        else {
            console.log(err);
        }
    });
}

function viewEmployees() {
    employee.getAllEmployees(function (err, result) {
        if (!err) {
            console.table(result);
            menu();
        }
        else {
            console.log(err);
        }
    });
}

function updateEmployeeRole(employeeId, roleId) {
    employee.updateRole(employeeId, roleId, function (err, result) {
        if (!err) {
            console.log("Employee Updated.");
            menu();
        }
        else {
            console.log(err);
        }
    });
}

function menu() {
    inquirer
        .prompt([
            {
                type: 'list',
                name: 'choice',
                message: 'What do you like to do?',
                choices: ['Add Department', 'Add Role', 'Add Employee', 'View Employees', 'View Roles', 'View Departments', 'Update Employee Role', 'Exit'],
            },
        ])
        .then(answers => {
            if (answers.choice == 'Add Department') {
                inquirer
                    .prompt([
                        {
                            name: 'deptName',
                            message: 'Enter name of department: ',
                        },
                    ])
                    .then(answers => {
                        addDepartment(answers.deptName);
                    });
            }
            else if (answers.choice == 'Add Role') {
                var title = null;
                var salary = null;
                inquirer
                    .prompt([
                        {
                            name: 'title',
                            message: 'Enter title: ',
                        },
                    ])
                    .then(answers => {
                        title = answers.title;
                        inquirer
                            .prompt([
                                {
                                    name: 'salary',
                                    message: 'Enter salary: ',
                                },
                            ])
                            .then(answers => {
                                salary = answers.salary;
                                inquirer
                                    .prompt([
                                        {
                                            name: 'department',
                                            message: 'Enter department ID: ',
                                        },
                                    ])
                                    .then(answers => {
                                        department = answers.department;
                                        addRole(title, salary, department);
                                    });
                            });
                    });
            }
            else if (answers.choice == 'Add Employee') {
                var firstName = null;
                var lastName = null;
                var roleId = null;
                inquirer
                    .prompt([
                        {
                            name: 'firstName',
                            message: 'Enter first name: ',
                        },
                    ])
                    .then(answers => {
                        firstName = answers.firstName;
                        inquirer
                            .prompt([
                                {
                                    name: 'lastName',
                                    message: 'Enter last name: ',
                                },
                            ])
                            .then(answers => {
                                lastName = answers.lastName;
                                inquirer
                                    .prompt([
                                        {
                                            name: 'roleId',
                                            message: 'Enter role ID: ',
                                        },
                                    ])
                                    .then(answers => {
                                        roleId = answers.roleId;
                                        inquirer
                                            .prompt([
                                                {
                                                    name: 'managerId',
                                                    message: 'Enter manager ID: ',
                                                },
                                            ])
                                            .then(answers => {
                                                addEmployee(firstName, lastName, roleId, answers.managerId);
                                            });
                                    });
                            });
                    });
            }
            else if (answers.choice == 'View Employees') {
                viewEmployees();
            }
            else if (answers.choice == 'View Roles') {
                viewRoles();
            }
            else if (answers.choice == 'View Departments') {
                viewDepartments();
            }
            else if (answers.choice == 'Update Employee Role') {
                var employeeId = null;
                inquirer
                    .prompt([
                        {
                            name: 'employeeID',
                            message: 'Enter employee ID: ',
                        },
                    ])
                    .then(answers => {
                        employeeId = answers.employeeId
                        inquirer
                            .prompt([
                                {
                                    name: 'roleID',
                                    message: 'Enter new role ID: ',
                                },
                            ])
                            .then(answers => {
                                updateEmployeeRole(employeeId,answers.roleId);
                            });
                    });
            }
            else if (answers.choice=='Exit') {
                
            }
        });
}

menu();


