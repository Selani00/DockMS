pipeline {
    agent any

    environment {
        BUILD_NUMBER = "${env.BUILD_NUMBER}"
        DOCKER_USERNAME = "selani004"
        DOCKER_IMAGE_BACKEND = "backend_img"
        DOCKER_IMAGE_FRONTEND = "frontend_img"
    }

    stages {
        stage('GIT Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/Selani00/DockMS.git'
            }
        }

        stage('Build Docker Images') {
            steps {
                script {
                    bat "docker build -t ${DOCKER_USERNAME}/${DOCKER_IMAGE_FRONTEND}:${BUILD_NUMBER} -f front_end_/Dockerfile front_end_"
                    bat "docker build -t ${DOCKER_USERNAME}/${DOCKER_IMAGE_BACKEND}:${BUILD_NUMBER} -f backend/Dockerfile backend"
                }
            }
        }

        stage('Tag and Push Docker Images') {
            steps {
                script {
                    withCredentials([string(credentialsId: 'dms-dockerhubpw', variable: 'dms-dockerhubpw')]) {
                        bat 'docker login -u selani004 -p %dms-dockerhubpw%'
                        bat "docker push ${DOCKER_USERNAME}/${DOCKER_IMAGE_FRONTEND}:${BUILD_NUMBER}"
                        bat "docker push ${DOCKER_USERNAME}/${DOCKER_IMAGE_BACKEND}:${BUILD_NUMBER}"
                        bat 'docker logout'
                    }
                }
            }
        }

        stage('Stop and Remove Existing Containers') {
            steps {
                script {
                        bat 'docker-compose down'
                        bat 'docker rm -f backend frontend mongo || true'
                    }
            }
        }


        

        stage('Deploy with Docker Compose') {
            steps {
                script {
                    writeFile file: 'docker-compose.yml', text: """
                    version: '3.8'

                    services:
                      backend:
                        image: ${DOCKER_USERNAME}/${DOCKER_IMAGE_BACKEND}:${BUILD_NUMBER}
                        container_name: backend
                        ports:
                          - "5000:5000"
                        depends_on:
                          - mongo
                        networks:
                          - dms-app

                      frontend:
                        image: ${DOCKER_USERNAME}/${DOCKER_IMAGE_FRONTEND}:${BUILD_NUMBER}
                        container_name: frontend
                        ports:
                          - "3000:3000"
                        depends_on:
                          - backend
                        stdin_open: true
                        networks:
                          - dms-app

                      mongo:
                        image: mongo:latest
                        ports:
                          - '27017:27017'
                        networks:
                          - dms-app   
                        volumes:
                          - mongo-data:/data/db

                    networks:
                      dms-app:
                        driver: bridge

                    volumes:
                      mongo-data:
                        driver: local
                    """
                    bat 'docker-compose down'
                    bat 'docker-compose up -d'
                }
            }
        }

        stage('Cleanup Local Images') {
            steps {
                script {
                    bat "docker rmi ${DOCKER_USERNAME}/${DOCKER_IMAGE_FRONTEND}:${BUILD_NUMBER}"
                    bat "docker rmi ${DOCKER_USERNAME}/${DOCKER_IMAGE_BACKEND}:${BUILD_NUMBER}"
                }
            }
        }
    }

    post {
        always {
            bat 'docker logout'
        }
    }
}
