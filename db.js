var mysql = require('mysql'); 
var config = {
    connectionLimit:100, 
    host:'localhost', 
    user:'web', 
    password:'pass', 
    database:'webdb', 
    port:'3306'
}

var pool = mysql.createPool(config); 
var connection;

exports.connect = function() {
    pool.getConnection(function(err, con) {
            if(err) {
                console.log('db접속 오류:', err)
            }else {
                console.log('db접속 완료');
                connection = con; 
            }
        }
    );
}

exports.get = function() {
    return connection;
};