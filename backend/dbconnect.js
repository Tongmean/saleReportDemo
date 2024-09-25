const { Pool } = require('pg');
require('dotenv').config();

// Create a new pool with connection details
const dbconnect = new Pool({

  user: process.env.user,
  host: process.env.host,
  database: process.env.database,
  password: process.env.password,


});
// Connect to the database
dbconnect.connect((err, client, release) => {
  if (err) {
    console.log('Error acquiring client', err);
  } else {
    console.log('Connection to PostgreSQL successful!');
    release();  // Release the client back to the pool
  }
});

module.exports = dbconnect;
