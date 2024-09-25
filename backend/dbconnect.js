const { Pool } = require('pg');
require('dotenv').config();

// Create a new pool with connection details
const dbconnect = new Pool({
  
  user: process.env.user,
  host: process.env.host,
  database: process.env.database,
  password: process.env.password,

  max: 20,
  idleTimeoutMillis: 600000,  // Increase idle timeout
  connectionTimeoutMillis: 100000,  // Increase connection timeout
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
