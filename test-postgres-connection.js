const { Pool } = require('pg');
const pool = new Pool({
  connectionString: 'postgresql://postgres:QmRAgZksrHrWCDhkIMVmwypWnlOMijrO@maglev.proxy.rlwy.net:51712/railway'
});

pool.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.error('Connection failed:', err);
  } else {
    console.log('Connected! Server time:', res.rows[0]);
  }
  pool.end();
});
