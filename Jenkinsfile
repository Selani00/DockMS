pipeline {
    agent any

    stages {
        stage('GIT Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/Selani00/DockMS.git'
            }
        }

        stage('Build Image') {
            steps {
                
                script {
                    bat "docker build -t selani004/frontend_img:${env.BUILD_NUMBER} -f front_end_/Dockerfile front_end_"
                    bat "docker build -t selani004/backend_img:${env.BUILD_NUMBER} -f backend/Dockerfile backend"
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

        stage('Docker Image Push') {
            steps {
                script {
                    bat "docker push selani004/frontend_img:${env.BUILD_NUMBER}"
                    bat "docker push selani004/backend_img:${env.BUILD_NUMBER}"
                }
            }
        }

        stage('Cleanup Local Images') {
            steps {
                script {
                    bat "docker rmi selani004/frontend_img:${env.BUILD_NUMBER}"
                    bat "docker rmi selani004/backend_img:${env.BUILD_NUMBER}"
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
