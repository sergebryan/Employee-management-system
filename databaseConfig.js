var mysql = require('mysql');
var dbconnect = {
    getConnection: function () {
        var conn = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: 'Prosper@2020',
            database: 'EmployeeTracker_db'
        });     
        return conn;
    }
};
module.exports = dbconnect