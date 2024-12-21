pipeline {
    agent any

    environment {
        AWS_ACCESS_KEY_ID = credentials('aws_access_key')
        AWS_SECRET_ACCESS_KEY = credentials('aws_secret_key')
        REGION = 'us-east-1'
    }

    stages {
        stage('Checkout') {
            steps {
                script {
                    git branch: 'main', url: 'https://github.com/LuckyDg/Devops_proyecto_final.git'
                    echo 'Código descargado correctamente...'
                }
            }
        }

        stage('Terraform Init') {
            steps {
                script {
                    echo 'Inicializando Terraform...'
                    sh """
                    cd terraform
                    terraform init
                    """
                }
            }
        }

        stage('Terraform Plan') {
            steps {
                script {
                    echo 'Ejecutando Terraform Plan...'
                    sh """
                    cd terraform
                    terraform plan -var "aws_access_key=${AWS_ACCESS_KEY_ID}" -var "aws_secret_key=${AWS_SECRET_ACCESS_KEY}" -var "region=${REGION}"
                    """
                }
            }
        }
    }

    post {
        always {
            echo 'Limpieza del workspace...'
            cleanWs()
        }
    }
}
