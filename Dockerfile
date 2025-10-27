# This is a minimal Dockerfile required for the Jenkinsfile to execute the 'docker build' command successfully.
# It simulates a simple NodeJS application.

# Base image
FROM node:18-alpine

# Set the working directory in the container
WORKDIR /app

# Copy package.json and install dependencies
COPY package.json .
RUN npm install

# Copy the rest of the application code
# Assuming your server.js is in the root of your Jenkins workspace
COPY . /app

# Expose the application port (must match the Jenkinsfile's APP_PORT)
EXPOSE 8080

# Command to run the application
CMD ["node", "server.js"]

# Add a placeholder package.json and server.js to the repository 
# (These aren't provided here, but are needed in your Git repo root)
# package.json: {"name": "sample-app", "version": "1.0.0", "scripts": {"start": "node server.js"}}
# server.js: (A simple express or HTTP server file)
