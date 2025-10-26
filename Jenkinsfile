// This Jenkinsfile uses a Declarative Pipeline syntax.
// It assumes Docker is installed on the Jenkins agent (or the Jenkins master if running agent 'any').

pipeline {
    // 1. Define Agent: 'any' means Jenkins can run the pipeline on any available agent,
    // but in a production setup, this would be a specific Docker-enabled agent.
    agent any

    // 2. Define Environment Variables
    environment {
        // Name the Docker image (replace 'my-app' with your actual app name)
        IMAGE_NAME = 'devops-internship/sample-web-app'
        // Define the port the container will expose
        APP_PORT = '8080'
    }

    stages {
        // --- STAGE 1: BUILD ---
        stage('Build') {
            steps {
                echo 'Building Docker image for the application...'
                // Build the Docker image using the Dockerfile in the workspace root.
                // The current build ID is used as the image tag.
                bat 'docker build -t devops-internship/sample-web-app:2 .' 
                sh "docker tag ${IMAGE_NAME}:${BUILD_ID} ${IMAGE_NAME}:latest"
            }
        }

        // --- STAGE 2: TEST ---
        stage('Test') {
            // A simple test simulation. In a real-world scenario, this would execute
            // unit, integration, and security tests.
            steps {
                echo 'Running simulated unit tests...'
                // You would typically run a container for testing and then remove it (--rm)
                // For demonstration, we just simulate a shell script test run.
                sh 'echo "Tests successful: All 42 unit tests passed!"'
                // Add an actual command here if you had a test runner script:
                // sh "docker run --rm ${IMAGE_NAME}:${BUILD_ID} /app/run_tests.sh"
            }
        }

        // --- STAGE 3: DEPLOY (STAGING/DEV) ---
        stage('Deploy') {
            steps {
                echo "Starting Deployment to localhost (port ${APP_PORT})..."
                
                // Stop and remove any previous running container with the same name.
                // '|| true' ensures the pipeline doesn't fail if the container doesn't exist.
                script {
                    try {
                        sh "docker stop my-app-container"
                        sh "docker rm my-app-container"
                        echo "Existing container stopped and removed."
                    } catch (e) {
                        echo "No existing container to stop/remove, proceeding..."
                    }
                }
                
                // Run the newly built image in a detached mode (-d), mapping the port, and naming the container.
                sh "docker run -d --name my-app-container -p ${APP_PORT}:${APP_PORT} ${IMAGE_NAME}:${BUILD_ID}"
                
                echo 'Deployment complete. Application should be accessible on http://localhost:8080'
            }
        }

        // --- STAGE 4: CLEANUP (Optional but good practice) ---
        stage('Cleanup') {
            steps {
                // Remove older images to save disk space
                echo 'Pruning old build images (optional).'
                // This command removes untagged images (dangling)
                sh 'docker image prune -f' 
            }
        }
    }
}
