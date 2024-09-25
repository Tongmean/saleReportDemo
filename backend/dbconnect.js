const { Pool } = require('pg');
require('dotenv').config();

// Create a new pool with connection details
const dbconnect = new Pool({
  user: 'warakorn',       // Your PostgreSQL username
  host: '192.168.1.29',   // Database host (e.g., localhost)
  database: 'cerp',       // Your PostgreSQL database name
  password: 'W@rnKorn',   // Your PostgreSQL password
  port: 5432,             // Default PostgreSQL port
  connectionTimeoutMillis: 50000,  // Adjust as needed
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
