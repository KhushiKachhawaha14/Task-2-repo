pipeline {
    // 1. Agent: Specifies where the pipeline runs. 'any' means any available Jenkins agent.
    agent any

    // 2. Environment: Variables used throughout the pipeline.
    environment {
        // !!! IMPORTANT: Replace 'your-user/my-app' with your actual Docker Hub/Registry path
        DOCKER_IMAGE = "khushi14kachhawaha/my-app"
        // Uses the unique Jenkins build number for the image version tag
        IMAGE_TAG = "${env.BUILD_NUMBER}"
        // Credential ID matching the secret you set up in Jenkins (See Step 2 below)
        DOCKER_CRED_ID = "docker-hub-creds"
    }

    // 3. Stages: The main steps of the CI/CD process (Hint d)
    stages {

        // --- Stage 1: Build Application & Docker Image ---
        stage('Build & Dockerize') {
            steps {
                echo 'Step 1: Starting application compilation (e.g., npm run build or mvn package)...'
                // Placeholder command for building your code
                sh 'echo "Application artifacts built successfully."'

                // Build the Docker image using the Dockerfile in the project root
                echo "Step 2: Building Docker image: ${DOCKER_IMAGE}:${IMAGE_TAG}"
                sh "docker build -t ${DOCKER_IMAGE}:${IMAGE_TAG} ."
            }
        }

        // --- Stage 2: Automated Tests ---
        stage('Test') {
            steps {
                echo 'Running automated tests inside the Docker container...'
                // Run a command inside the newly built image for unit/integration testing
                sh "docker run --rm ${DOCKER_IMAGE}:${IMAGE_TAG} npm test"
            }
        }

        // --- Stage 3: Push Image to Registry ---
        stage('Push Image') {
            steps {
                script {
                    echo "Pushing image to registry..."
                    // Securely retrieves credentials from the Jenkins secret store
                    withCredentials([usernamePassword(credentialsId: DOCKER_CRED_ID, passwordVariable: 'DOCKER_PASSWORD', usernameVariable: 'DOCKER_USERNAME')]) {
                        // 1. Log in using the retrieved credentials
                        sh "docker login -u ${DOCKER_USERNAME} -p ${DOCKER_PASSWORD}"
                        // 2. Push the unique, versioned image
                        sh "docker push ${DOCKER_IMAGE}:${IMAGE_TAG}"
                        // 3. Push a 'latest' tag for easy access
                        sh "docker tag ${DOCKER_IMAGE}:${IMAGE_TAG} ${DOCKER_IMAGE}:latest"
                        sh "docker push ${DOCKER_IMAGE}:latest"
                    }
                }
            }
        }

        // --- Stage 4: Deployment ---
        stage('Deploy') {
            steps {
                echo 'Executing deployment command (e.g., to Kubernetes or an ECS cluster)...'
                // This is a placeholder for a real deployment, replacing the old running image with the new one
                sh "echo 'kubectl set image deployment/app-deployment web-container=${DOCKER_IMAGE}:${IMAGE_TAG}'"
                sh 'echo "Deployment to Staging complete! The application has been updated."'
            }
        }
    }

    // 4. Post: Actions that run after all stages are complete (success or failure)
    post {
        always {
            // Cleans the workspace to save disk space on the Jenkins agent
            cleanWs()
            echo 'Workspace cleaned up.'
        }
        failure {
            echo "PIPELINE FAILED. Please review the logs."
        }
    }
}
