pipeline {
    agent any

    environment {
        DOCKER_IMAGE = 'playwright-test'
        REPORT_DIR = 'playwright-report'
    }

    stages {

        stage('Checkout') {
            steps {
                // Ini otomatis dari SCM, jadi Jenkinsfile akan terambil
                checkout scm
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    sh "docker build -t ${DOCKER_IMAGE} ."
                }
            }
        }

        stage('Run Playwright Test!') {
            steps {
                script {
                    sh """
                    docker run --rm \
                        -v \$WORKSPACE/${REPORT_DIR}:/app/${REPORT_DIR} \
                        ${DOCKER_IMAGE }
                    """
                }
            }
        }
    }

    post {
        always {
            // Publish HTML report di Jenkins
            publishHTML(target: [
                allowMissing: false,
                alwaysLinkToLastBuild: true,
                keepAll: true,
                reportDir: 'playwright-report',
                reportFiles: 'index.html',
                reportName: 'Playwright Automation Report'
            ])
        }
    }
}
