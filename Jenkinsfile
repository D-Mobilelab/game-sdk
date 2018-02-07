pipeline {
    agent {
        docker {
	    label 'Ceviche-docker'
            image 'localhost:5000/productfe/bdk'
            args '-p 3000:3000 -u 502:503'
        }
    }
    environment { 
        CI = "true"
        PROFILE = "$profile"        
    }
    stages {
        stage('Install') {
            steps {                
                sh 'pwd'
                sh 'echo "Node version: $(node --version), Npm version:$(npm --version), ENV: $profile"'
                sh 'ls -la'
                sh 'echo "npm get prefix: $(npm get prefix)"'                
                sh 'npm install'
            }
        }        
        stage('Test') {
            steps {                
                sh 'npm run test'
            }
        }        
        stage('Build') {
            steps {
                script {
                    if(env.PROFILE == 'prod') {
                        echo 'Build ${env.PROFILE}'
                        sh 'npm run build:prod'
                    } else {
                        echo 'Build ${env.PROFILE}'
                        sh 'npm run build:dev'
                    }
                }                
            }
        }
        stage('Zip') {
            steps {                
		        sh 'zip -r game-sdk-$version-code.zip dist'                
            }
        }
    }
}