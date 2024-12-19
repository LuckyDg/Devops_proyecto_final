pipeline {
    agent any
    environment {
        AWS_ACCESS_KEY_ID = credentials('aws_access_key') 
        AWS_SECRET_ACCESS_KEY = credentials('aws_secret_key')
        DOCKER_IMAGE = 'luckydg/ms-auth:latest'
    }
    stages {
        stage('Checkout') {
            steps {
                git 'https://github.com/LuckyDg/Devops_proyecto_final.git'
            }
        }
        stage('Build Docker Image') {
            steps {
                script {
                    sh """
                    docker build -t ${DOCKER_IMAGE} .
                    """
                }
            }
        }
        stage('Push Docker Image') {
            steps {
                script {
                    sh """
                    echo $DOCKER_PASSWORD | docker login -u $DOCKER_USERNAME --password-stdin
                    docker push ${DOCKER_IMAGE}
                    """
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
