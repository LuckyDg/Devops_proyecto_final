pipeline {
    agent any

    environment {
        AWS_ACCESS_KEY_ID = credentials('aws_access_key')
        AWS_SECRET_ACCESS_KEY = credentials('aws_secret_key')
        REGION = credentials('region')
        DOCKER_IMAGE = credentials('docker_image')
        DB_HOST = credentials('db_host')
        DB_PORT = credentials('db_port')
        DB_NAME = credentials('db_name')
        DB_USER = credentials('db_user')
        DB_PASS = credentials('db_pass')
        JWT_SECRET = credentials('jwt_secret')
        S3_BUCKET = credentials('s3_bucket')
        NEXT_PUBLIC_API_URL = credentials('next_public_api_url')
        KEY_NAME = credentials('key_name')
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

        stage('Build Docker Image') {
            steps {
                script {
                    echo 'Iniciando la construcción de la imagen Docker...'
                    sh """
                     docker build \
                        --build-arg DB_HOST=${DB_HOST} \
                        --build-arg DB_PORT=${DB_PORT} \
                        --build-arg DB_USER=${DB_USER} \
                        --build-arg DB_NAME=${DB_NAME} \
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
        // stage('Terraform Plan') {
        //     steps {
        //         script {
        //             echo 'Generando el plan de ejecución de Terraform...'
        //             sh """
        //             cd terraform
        //             terraform plan
        //             """
        //             echo 'Plan de Terraform generado con éxito.'
        //         }
        //     }
        // }
        stage('Terraform Plan') {
            steps {
                script {
                    sh """
                    cd terraform 
                    terraform plan \
                    -var="aws_access_key=${AWS_ACCESS_KEY_ID}" \
                    -var="aws_secret_key=${AWS_SECRET_ACCESS_KEY}" \
                    -var="docker_image=${DOCKER_IMAGE}" \
                    -var="key_name=${KEY_NAME}" \
                    -var="region=${REGION}" \
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
