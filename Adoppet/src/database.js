const mysql = require('mysql');

const mysqlConnection = mysql.createConnection({
    host: 'us-cdbr-east-04.cleardb.com',
    user: 'ba2dff65cf3e5b',
    password: '98834fe6',
    database: 'heroku_4a7b725bcc39f10',
    multipleStatements: true
});

mysqlConnection.connect(function(err) {
    if (err) {
        console.error(err);
        return;
    } else {
        console.log('db is connected');
    }
});

module.exports = mysqlConnection;