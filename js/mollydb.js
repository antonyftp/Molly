const mysql = require("mysql");
const database  = require("../json/database");

const mollydb = mysql.createConnection({
    host: database.host,
    user: database.user,
    password: database.password,
    database: database.database
});

module.exports = mollydb;
