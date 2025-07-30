const mysql = require('mysql2');
const connection = mysql.createConnection({
  host: 'hopper.proxy.rlwy.net',
  user: 'root',
  password: 'RlswAWWsshcMxKdoTDrkfSUYfOOiNmTF',
  database: 'railway',
  port: 59822
});

const email = 'test@example.com'; // Change to desired email

connection.query('INSERT INTO diagnostics (email) VALUES (?)', [email], (err, results) => {
  if (err) {
    console.error('Insert failed:', err);
  } else {
    console.log('Inserted record with id:', results.insertId);
  }
  connection.end();
});
