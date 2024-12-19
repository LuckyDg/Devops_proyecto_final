pipeline {
    agent any
    environment {
        AWS_ACCESS_KEY_ID = credentials('aws_access_key') 
        AWS_SECRET_ACCESS_KEY = credentials('aws_secret_key')
        DOCKER_IMAGE_BACKEND = 'luckydg/ms-auth:latest'
        DB_HOST = credentials('DB_HOST')
        DB_PORT = credentials('DB_PORT')
        DB_USER = credentials('DB_USER')
        DB_PASS = credentials('DB_PASS')
        JWT_SECRET = credentials('JWT_SECRET')
    }
    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/LuckyDg/Devops_proyecto_final.git'
            }
        }
        stage('Build Docker Image') {
            steps {
                script {
                    sh """
                     docker build \
                        --build-arg DB_HOST=${DB_HOST} \
                        --build-arg DB_PORT=${DB_PORT} \
                        --build-arg DB_USER=${DB_USER} \
                        --build-arg DB_PASS=${DB_PASS} \
                        --build-arg JWT_SECRET=${JWT_SECRET} \
                        --build-arg AWS_ACCESS_KEY_ID=${AWS_ACCESS_KEY_ID} \
                        --build-arg AWS_SECRET_ACCESS_KEY=${AWS_SECRET_ACCESS_KEY} \
                        -t ${DOCKER_IMAGE} api-users
                    """
                }
            }
        }
        stage('Push Docker Image') {
            steps {
                script {
                    withCredentials([usernamePassword(credentialsId: 'docker-credentials-id', passwordVariable: 'DOCKER_PASSWORD', usernameVariable: 'DOCKER_USERNAME')]) {
                        sh """
                        echo $DOCKER_PASSWORD | docker login -u $DOCKER_USERNAME --password-stdin
                        docker push ${DOCKER_IMAGE_BACKEND}
                        """
                    }
                }
            }
        }
        stage('Terraform Init') {
            steps {
                sh """
                cd terraform
                terraform init
                """
            }
        }
        stage('Terraform Plan') {
            steps {
                sh """
                cd terraform
                terraform plan
                """
            }
        }
        stage('Terraform Apply') {
            steps {
                input "¿Aplicar los cambios en AWS?"
                sh """
                cd terraform
                terraform apply -auto-approve
                """
            }
        }
        stage('Deploy to Kubernetes') {
            steps {
                script {
                    sh """
                    kubectl config set-context aws-cluster
                    kubectl config use-context aws-cluster
                    """
                    sh """
                    kubectl apply -f k8s/deployment.yml
                    """
                }
            }
        }
    }
    post {
        always {
            cleanWs()
        }
    }
}
