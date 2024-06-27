pipeline {
    agent any

    environment {
        BUILD_NUMBER = "${env.BUILD_NUMBER}"
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
                dir('frontend_img') {
                    script {
                        bat "docker build -t frontend_img ."
                    }
                }
                dir('backend_img') {
                    script {
                        bat "docker build -t backend_img ."
                    }
                }
            }
        }

        stage('Login to DockerHub') {
            steps {
                withCredentials([string(credentialsId: 'test-dockerhubpassword', variable: 'dms-dockerhubpw')]) {
                    bat 'docker login -u selani004 -p %dms-dockerhubpw%'
                }
            }
        }

        stage('Tag Image') {
            steps {
                script {
                    bat "docker tag frontend_img ${DOCKER_USERNAME}/dms-ci-frontend:v${BUILD_NUMBER}"
                    bat "docker tag backend_img ${DOCKER_USERNAME}/dms-ci-backend:v${BUILD_NUMBER}"
                }
            }
        }

        stage('Docker Image Push') {
            steps {
                bat "docker push ${DOCKER_USERNAME}/dms-ci-frontend:v${BUILD_NUMBER}"
                bat "docker push ${DOCKER_USERNAME}/dms-ci-backend:v${BUILD_NUMBER}"
            }
        }

        stage('Cleanup Local Images') {
            steps {
                bat "docker rmi ${DOCKER_USERNAME}/dms-ci-frontend:v${BUILD_NUMBER}"
                bat "docker rmi ${DOCKER_USERNAME}/dms-ci-backend:v${BUILD_NUMBER}"
            }
        }
    }

    post {
        always {
            bat 'docker logout'
        }
    }
}
