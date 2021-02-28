const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "MARIBEL3",
  database: "employees"
});

connection.connect();



module.exports = connection;
