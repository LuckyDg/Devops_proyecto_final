pipeline {
    agent any

    environment {
        API_PORT = ${API_PORT}
        DB_HOST = ${DB_HOST}
        DB_PORT = ${DB_PORT}
        DB_USER = ${DB_USER}
        DB_PASS = ${DB_PASS}
        DB_NAME = ${DB_NAME}
        JWT_SECRET = ${JWT_SECRET}
        AWS_ACCESS_KEY_ID = ${AWS_ACCESS_KEY_ID}
        AWS_SECRET_ACCESS_KEY = ${AWS_SECRET_ACCESS_KEY}
        S3_BUCKET = ${S3_BUCKET}
        FRONTEND_PORT = ${FRONTEND_PORT}
        NEXT_PUBLIC_API_URL = ${NEXT_PUBLIC_API_URL}
    }

    stages {
        stage('Checkout') {
            steps {
                echo "Clonando el repositorio..."
                git url: 'https://github.com/LuckyDg/Devops_proyecto_final.git', branch: 'develop'
            }
        }

        stage('Build Docker Images') {
            steps {
                script {
                    echo "Construyendo imágenes Docker..."
                    sh 'docker build -t ms-auth:latest ./api-users'
                    sh 'docker build -t client-user-interface:latest ./client-user-interface'
                }
            }
        }

        stage('Run Containers') {
            steps {
                script {
                    echo "Levantando los contenedores..."
                    sh '''
                    docker network create user-network-app || true
                    docker run -d --name auth-db --network user-network-app \
                        -e POSTGRES_USER=${DB_USER} \
                        -e POSTGRES_PASSWORD=${DB_PASS} \
                        -e POSTGRES_DB=${DB_NAME} \
                        -p ${DB_PORT}:${DB_PORT} postgres:14.3-alpine

                    docker run -d --name api-users --network user-network-app \
                        -e PORT=${API_PORT} \
                        -e DB_HOST=${DB_HOST} \
                        -e DB_PORT=${DB_PORT} \
                        -e DB_USER=${DB_USER} \
                        -e DB_PASS=${DB_PASS} \
                        -e DB_NAME=${DB_NAME} \
                        -e JWT_SECRET=${JWT_SECRET} \
                        -e AWS_ACCESS_KEY_ID=${AWS_ACCESS_KEY_ID} \
                        -e AWS_SECRET_ACCESS_KEY=${AWS_SECRET_ACCESS_KEY} \
                        -e S3_BUCKET=${S3_BUCKET} \
                        -p ${API_PORT}:${API_PORT} ms-auth:latest

                    docker run -d --name client-user-interface --network user-network-app \
                        -e NEXT_PUBLIC_API_URL=${NEXT_PUBLIC_API_URL} \
                        -p ${FRONTEND_PORT}:${FRONTEND_PORT} client-user-interface:latest
                    '''
                }
            }
        }

        stage('Healthcheck') {
            steps {
                script {
                    echo "Verificando healthchecks..."
                    sh '''
                    echo "Esperando a que los contenedores levanten correctamente..."
                    sleep 10

                    echo "Probando healthcheck de API Users..."
                    curl --fail http://localhost:${API_PORT}/health || exit 1

                    echo "Probando healthcheck de Client User Interface..."
                    curl --fail http://localhost:${FRONTEND_PORT}/ || exit 1
                    '''
                }
            }
        }

        stage('Cleanup') {
            steps {
                script {
                    echo "Eliminando contenedores y red..."
                    sh '''
                    docker stop client-user-interface api-users auth-db
                    docker rm client-user-interface api-users auth-db
                    docker network rm user-network-app || true
                    '''
                }
            }
        }
    }

    post {
        success {
            echo "Pipeline ejecutado correctamente. Todos los servicios se levantaron y verificaron con éxito."
        }
        failure {
            echo "Pipeline falló. Verificar logs y configuración."
        }
        always {
            script {
                sh 'docker ps -a'
            }
        }
    }
}
