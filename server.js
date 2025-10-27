// server.js
// This file sets up a minimal web server that runs on port 8080 (as defined in Jenkinsfile and Dockerfile).

const express = require('express');
const app = express();
const port = 8081; // Must match the port exposed in the Dockerfile

app.get('/', (req, res) => {
  // Respond with a simple message showing the app is running
  res.send('<h1>Jenkins CI/CD Pipeline Success!</h1><p>Application is running inside the Docker container.</p>');
});
const PORT = process.env.PORT || 8081;
const HOST = '0.0.0.0'; // <--- MUST be 0.0.0.0 for Docker
app.listen(port, () => {
  console.log(`Application successfully deployed and listening at http://localhost:${port}`);
});
