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
                dir('frontend_img') {
                    script {
                        bat "docker build -t selani004/dms-ci-frontend:%BUILD_NUMBER% ."
                    }
                }
                dir('backend_img') {
                    script {
                        bat "docker build -t selani004/dms-ci-backend:%BUILD_NUMBER% ."
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

        

        stage('Docker Image Push') {
            steps {
                bat "docker push selani004/dms-ci-frontend:%BUILD_NUMBER%"
                bat "docker push selani004/dms-ci-backend:%BUILD_NUMBER%"
            }
        }

        stage('Cleanup Local Images') {
            steps {
                bat "docker rmi selani004/dms-ci-frontend:%BUILD_NUMBER%"
                bat "docker rmi selani004/dms-ci-backend:v%BUILD_NUMBER%"
            }
        }
    }

    post {
        always {
            bat 'docker logout'
        }
    }
}
