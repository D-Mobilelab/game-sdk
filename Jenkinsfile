pipeline {
    agent {
        docker {
            image 'node:6-alpine'
            args '-p 3000:3000 -u root:root'
        }
    }
    environment { 
        CI = 'true'
    }
    stages {
        stage('Install') {
            steps {
                sh 'echo "Node version: $(node --version), Npm version:$(npm --version)"'                
                sh 'ls -la'
                sh 'echo "npm get prefix: $(npm get prefix)"'
                sh 'npm install'
            }
        }        
        stage('Test') {
            steps {
                sh 'npm test'
            }
        }
        stage('Build') {
            steps {
                sh 'npm run build'
            }
        }
        stage('Deliver') { 
            steps {
                sh './jenkins/scripts/deliver.sh' 
                input message: 'Finished using the web site? (Click "Proceed" to continue)' 
                sh './jenkins/scripts/kill.sh' 
            }
        }
    }
}