let mysql = require('mysql');

function createDBconnection () {
    return mysql.createConnection({
        host:'localhost',
        user: 'root',
        password:'reroside',
        database: 'pagamento'
    });
}
module.exports = () => {return createDBconnection;}