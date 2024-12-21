pipeline {
    agent any
    environment {
        AWS_ACCESS_KEY_ID = credentials('aws_access_key') 
        AWS_SECRET_ACCESS_KEY = credentials('aws_secret_key')
        DOCKER_IMAGE = 'luckydg/ms-auth:latest'
        DB_HOST = credentials('DB_HOST')
        DB_PORT = credentials('DB_PORT')
        DB_USER = credentials('DB_USER')
        DB_PASS = credentials('DB_PASS')
        JWT_SECRET = credentials('JWT_SECRET')
    }
    stages {
        stage('Checkout') {
            steps {
                script {
                    git branch: 'main', url: 'https://github.com/LuckyDg/Devops_proyecto_final.git'
                    echo 'Código obtenido correctamente desde el repositorio.'
                }
            }
        }
        stage('Build Docker Image') {
            steps {
                script {
                    echo 'Iniciando la construcción de la imagen Docker...'
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
                    echo 'Imagen Docker construida correctamente.'
                }
            }
        }
        stage('Push Docker Image') {
            steps {
                script {
                    echo 'Iniciando el login en Docker...'
                    withCredentials([usernamePassword(credentialsId: 'docker-credentials-id', passwordVariable: 'DOCKER_PASSWORD', usernameVariable: 'DOCKER_USERNAME')]) {
                        sh """
                        echo $DOCKER_PASSWORD | docker login -u $DOCKER_USERNAME --password-stdin
                        echo 'Login en Docker exitoso. Subiendo la imagen Docker...'
                        docker push ${DOCKER_IMAGE}
                        echo 'Imagen Docker subida correctamente.'
                        """
                    }
                }
            }
        }
        stage('Terraform Init') {
            steps {
                script {
                    echo 'Iniciando la configuración de Terraform...'
                    sh """
                    cd terraform
                    terraform init
                    """
                    echo 'Terraform inicializado correctamente.'
                }
            }
        }
        stage('Terraform Plan') {
            steps {
                script {
                    echo 'Generando el plan de ejecución de Terraform...'
                    sh """
                    cd terraform
                    terraform plan
                    """
                    echo 'Plan de Terraform generado con éxito.'
                }
            }
        }
        
        // stage('Terraform Apply') {
        //     steps {
        //         script {
        //             echo 'Esperando confirmación para aplicar los cambios en AWS...'
        //             input "¿Aplicar los cambios en AWS?"
        //             echo 'Aplicando los cambios en AWS...'
        //             sh """
        //             cd terraform
        //             terraform apply -auto-approve
        //             """
        //             echo 'Cambios aplicados en AWS correctamente.'
        //         }
        //     }
        // }
        
        stage('Deploy to Kubernetes') {
            steps {
                script {
                    echo 'Configurando contexto de Kubernetes...'
                    sh """
                    kubectl config set-context aws-cluster
                    kubectl config use-context aws-cluster
                    """
                    echo 'Desplegando la aplicación en Kubernetes...'
                    sh """
                    kubectl apply -f k8s/deployment.yml
                    """
                    echo 'Aplicación desplegada correctamente en Kubernetes.'
                }
            }
        }
    }
    post {
        always {
            echo 'Limpiando el workspace de Jenkins...'
            cleanWs()
        }
    }
}
