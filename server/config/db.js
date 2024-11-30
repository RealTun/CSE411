const mysql = require('mysql2/promise');
require("dotenv").config();

// Cấu hình pool
const pool = mysql.createPool({
    host: 'localhost',
    user: process.env.DBusername,
    password: process.env.DBusername,
    database: process.env.DBname,
    waitForConnections: true,
    connectionLimit: 20,
    queueLimit: 0
});

module.exports = pool;

