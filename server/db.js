require('dotenv').config();
const mysql = require('mysql2');

const connection = mysql.createConnection({

    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || universidad

});

connection.connect((err) => {

    if (err) {
        console.log('Error conecting to database', err);
        return;
    }

    console.log('Connected to mysql database');

})

module.exports = connection;