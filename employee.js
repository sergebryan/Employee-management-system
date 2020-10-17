var db = require('./databaseConfig.js');

var employeeDB = {
    getAllEmployees: function (callback) {
        var conn = db.getConnection();
        conn.connect(function (err) {
            if (err) {
                console.log(err);
                return callback(err, null);
            }
            else {
                var sql = 'SELECT * FROM employee';
                conn.query(sql, function (err, result) {
                    conn.end();
                    if (err) {
                        console.log(err);
                        return callback(err, null);
                    } else {
                        return callback(null, result);
                    }
                });
            }
        });
    },

    insertEmployee: function (firstName, lastName, roleId, managerId, callback) {
        var conn = db.getConnection();
        conn.connect(function (err) {
            if (err) {
                console.log(err);
                return callback(err, null);
            }
            else {
                var sql = null;
                if (managerId == '') {
                    sql = 'INSERT INTO employee(first_name, last_name, role_id) values (?,?,?)';
                    values = [firstName, lastName, roleId];
                }
                else {
                    sql = 'INSERT INTO employee(first_name, last_name, role_id, manager_id) values (?,?,?,?)';
                    values = [firstName, lastName, roleId, managerId];
                }
                conn.query(sql, values, function (err, result) {
                    conn.end();
                    if (err) {
                        return callback(err, null);
                    } else {
                        return callback(null, result);
                    }
                });
            }
        });
    },

    updateRole: function (employeeId, roleId, callback) {
        var conn = db.getConnection();
        conn.connect(function (err) {
            if (err) {
                console.log(err);
                return callback(err, null);
            }
            else {
                var sql = 'UPDATE employee set role_id = ? where id = ?';
                conn.query(sql, [employeeId, roleId], function (err, result) {
                    conn.end();
                    if (err) {
                        return callback(err, null);
                    } else {
                        return callback(null, result);
                    }
                });
            }
        });
    }
}

module.exports = employeeDB
