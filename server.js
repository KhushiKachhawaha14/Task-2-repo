// server.js

const express = require('express');
const app = express();
// The application must listen on the port exposed IN THE DOCKERFILE (8081).
const port = 8081; 
// The application must listen on 0.0.0.0 for Docker to route external traffic.
const host = '0.0.0.0'; 

app.get('/', (req, res) => {
  // Respond with a simple message showing the app is running
  res.send('<h1>Jenkins CI/CD Pipeline Success!</h1><p>Application is running inside the Docker container.</p>');
});

app.listen(port, host, () => {
  console.log(`Application successfully deployed and listening at http://${host}:${port}`);
});
