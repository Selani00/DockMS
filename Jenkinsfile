pipeline {
    agent any

    environment {
        BUILD_NUMBER = "env.BUILD_NUMBER"
        DOCKER_USERNAME = "selani004"
    }
    stages {
        stage('GIT Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/Selani00/DockMS.git'
            }
        }
        stage('Build Image') {
            steps {
                dir('frontend_img'){
                    script{
                        sh "docker build -t frontend_img ."
                    }
                }
                dir('backend_img'){
                    script{
                        sh "docker build -t backend_img ."
                    }
                }
            }
        }
        stage('Tag Image') {
            steps {
               script{
                   sh "docker tag frontend_img ${DOCKER_USERNAME}/dms-ci-frontend:v${BUILD_NUMBER}"
                   sh "docker tag backend_img ${DOCKER_USERNAME}/dms-ci-backend:v${BUILD_NUMBER}"
               }
            }
        }
        stage('Docker Image Push') {
            steps {
                script { 
                    withCredentials([usernamePassword(credentialsId: 'dockerhub-credentials', usernameVariable: 'docker_user', passwordVariable: 'docker_pass')]) {
                        sh "docker login -u '${docker_user}' -p '${docker_pass}'"
                        sh "docker push ${DOCKER_USERNAME}/dms-ci-frontend:v${BUILD_NUMBER}"
                        sh "docker push ${DOCKER_USERNAME}/dms-ci-backend:v${BUILD_NUMBER}"
                        sh "docker logout"
                    }
                }
            }
        }
        stage('Cleanup Local Images') {
            steps {
                sh "docker rmi ${DOCKER_USERNAME}/dms-ci-frontend:v${BUILD_NUMBER}"
                sh "docker rmi ${DOCKER_USERNAME}/dms-ci-backend:v${BUILD_NUMBER}"
                
            }
        }
    }
}