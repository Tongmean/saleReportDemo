// Import the database connection (using PostgreSQL connection pool in this case)
const dbconnect = require('../dbconnect'); 

// Define a middleware function that checks if the database connection is successful
const checkDBConnection = async (req, res, next) => {
    try {
        // Try to run a simple query to check if the database is responding
        // SELECT 1 is a lightweight query that simply checks if the connection works
        await dbconnect.query('SELECT 1');
        
        // If the query succeeds, log a message and call `next()` to pass control to the next middleware/route handler
        console.log('Database connection successful');
        next(); // Proceed to the next middleware or route handler
    } catch (err) {
        // If an error occurs (e.g., the database is down), log the error message
        console.error('Database connection error:', err.message);
        
        // Respond to the client with a 500 Internal Server Error and a custom message
        return res.status(500).json({
            success: false,
            msg: 'Failed to connect to the database',
            errorType: "database",
            data: err
        });
    }
};

// Export the middleware function so it can be used in the main app
module.exports = checkDBConnection;
