module.exports = {
  apps: [
    {
      name: "",      // Name of the app
      script: "./server.js",       // Path to the main app file
      instances: 4,         // Start as many instances as there are CPU cores
      exec_mode: "cluster",     // Enable cluster mode for load balancing
      env: {
        NODE_ENV: "development",  // Environment variables for development
        port: 8000,
      },
      env_production: {
        NODE_ENV: "production",   // Environment variables for production
        port: 8000,
      },
      watch: true,               // Restart on file changes
      ignore_watch: ["node_modules", "logs"],  // Do not watch these files
      max_memory_restart: "1G",  // Restart app if memory usage exceeds 1GB
      log_file: "./logs/combined.log",  // Combined log file for stdout and stderr
      error_file: "./logs/err.log",     // Error log file
      out_file: "./logs/out.log",       // Output log file
      merge_logs: true,           // Merge all logs into one
    }
  ]
};
