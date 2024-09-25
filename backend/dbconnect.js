const { Pool } = require('pg');
require('dotenv').config();

// Create a new pool with connection details
const dbconnect = new Pool({
  user: 'warakorn',
  host: '192.168.1.29',
  database: 'cerp',
  password: 'W@rnKorn',
  max: 20,
  idleTimeoutMillis: 60000,  // Increase idle timeout
  connectionTimeoutMillis: 10000,  // Increase connection timeout
  keepAlive: false,  // Disable keep-alive for now
});
// Connect to the database
dbconnect.connect((err, client, release) => {
  if (err) {
    console.error('Error acquiring client', err);
  } else {
    console.log('Connection to PostgreSQL successful!');
    release();  // Release the client back to the pool
  }
});

module.exports = dbconnect;
