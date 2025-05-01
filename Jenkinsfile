pipeline {
  agent any

  environment {
    SERVER_DIR = 'server'
    CLIENT_DIR = 'client'
  }

  stages {

    stage('Checkout Code') {
      steps {
        git 'https://github.com/pratheekp1904/lost_and_found.git'
      }
    }

    stage('Build Client') {
      steps {
        dir("${CLIENT_DIR}") {
          sh 'docker build -t mern-client ./'
        }
      }
    }

    stage('Build Server') {
      steps {
        dir("${SERVER_DIR}") {
          sh 'docker build -t mern-server ./'
        }
      }
    }

    stage('Deploy Containers') {
      steps {
        sh 'docker-compose down'
        sh 'docker-compose up -d --build'
      }
    }
  }

  post {
    success {
      echo '✅ Deployment successful!'
    }
    failure {
      echo '❌ Deployment failed.'
    }
  }
}
