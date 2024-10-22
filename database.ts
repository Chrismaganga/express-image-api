const mysql = require('mysql2');

// Create a connection to the database
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root', // replace 'root' with your MySQL username
  database: 'uploader', // replace with your MySQL database name
  password: 'your_password', // replace with your MySQL password
  port: 3306, // default MySQL port is 3306
});

// Connect to the database
connection.connect((err: { message: any; }) => {
  if (err) {
    console.log("Something went wrong!", err.message);
  } else {
    console.log("Connected to MySQL DB");
  }
});

module.exports = connection;
