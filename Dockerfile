# Use an official lightweight Node.js image as the base
FROM node:20-alpine

# Set the working directory
WORKDIR /app

# Copy package files (we only need server.js for this minimal example)
COPY server.js .

# Expose the port (standard practice)
EXPOSE 8080

# Command to run the application when the container starts
CMD ["node", "server.js"]
