<img width="1907" height="1079" alt="image" src="https://github.com/user-attachments/assets/f539d0a1-f095-46e6-80ce-5b6489567b7d" />
<img width="1907" height="1079" alt="image" src="https://github.com/user-attachments/assets/d2c2a4ed-e3db-49f1-8a43-3e2274002c66" />
Simple CI/CD Pipeline for Docker Application

This repository contains the necessary files to set up a basic, automated Continuous Integration and Continuous Deployment (CI/CD) pipeline using Jenkins and Docker. The pipeline is designed to run automatically upon every code commit.

Repository Contents

Jenkinsfile: The core definition of the Declarative Pipeline, defining the build, test, push, and deploy stages.

Dockerfile: A minimal definition for a Node.js application, used by the Jenkins pipeline for image creation.

server.js: A placeholder JavaScript file (minimal content) to satisfy the Dockerfile requirements.

Prerequisites

Before setting up the Jenkins job, ensure you have:

Jenkins Instance: A running Jenkins server (local or cloud).

Required Plugins: The Pipeline and Docker Pipeline plugins installed.

Docker on Agent: Docker installed on the Jenkins agent (or the main Jenkins server if running on agent any).

Step-by-Step Implementation

Follow these steps to configure the pipeline in Jenkins, addressing all hints in the objective:

Step 1: Configure Jenkins Credentials (Security)

The pipeline requires credentials to securely log into your Docker registry (e.g., Docker Hub, AWS ECR).

In Jenkins, navigate to Manage Jenkins -> Manage Credentials.

Click Add credentials in the (global) domain.

Select Kind: Username with password.

Set the ID to docker-hub-creds (This must match the DOCKER_CRED_ID variable in the Jenkinsfile).

Enter your Docker Registry Username and Password.

Click Create.

Step 2: Create and Configure the Jenkins Pipeline Job

On the Jenkins dashboard, click New Item.

Enter an item name (e.g., my-ci-cd-app) and select Pipeline. Click OK.

In the job configuration page:

Go to the Build Triggers section.

Check the box for GitHub hook trigger for GITScm polling (This addresses Hint c).

Go to the Pipeline section at the bottom.

Set Definition to: Pipeline script from SCM.

Set SCM to: Git.

Enter your GitHub Repository URL (e.g., https://github.com/your-user/repo-name.git).

Ensure Script Path is set to Jenkinsfile.

Click Save.

Step 3: Set up GitHub Webhook (Completes Hint c)

For Jenkins to be notified instantly of code commits, you must configure a webhook in your GitHub repository.

Go to your GitHub repository settings.

Click on Webhooks -> Add webhook.

Set the Payload URL to your Jenkins URL followed by /github-webhook/ (e.g., http://your-jenkins-ip:8080/github-webhook/).

Set Content type to application/json.

Select Just the push event.

Click Add webhook.

Step 4: Test the Pipeline (Hint e)

Perform an initial manual build in Jenkins by clicking Build Now. Observe the flow through the stages.

Make a small change to the server.js file, commit, and push it to your GitHub repository.

Jenkins should be automatically triggered by the webhook, and a new build will start, executing the full CI/CD process.

⚙️ The Pipeline Files

1. The Jenkins Pipeline

This file defines the four required stages (Build, Test, Push Image, Deploy).
