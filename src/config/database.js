// import database mysql
const mysql = require("mysql2");

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  database: "express_mysql",
  password: "",
});

module.exports = pool.promise();
