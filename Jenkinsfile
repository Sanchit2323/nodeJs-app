pipeline {
    agent any

    tools {
        nodejs 'node18'
    }

    stages {

        stage('Build') {
            steps {
                sh '''
                rm -rf node_modules package-lock.json
                npm cache clean --force
                npm install
                '''
            }
        }

        stage('Test') {
            parallel {

                stage('Unit Test') {
                    steps {
                        catchError(buildResult: 'UNSTABLE', stageResult: 'FAILURE') {
                            sh 'npm run test:unit'
                        }
                    }
                }

                stage('Integration Test') {
                    steps {
                        catchError(buildResult: 'UNSTABLE', stageResult: 'FAILURE') {
                            sh 'npm run test:integration'
                        }
                    }
                }

                stage('E2E Test') {
                    steps {
                        catchError(buildResult: 'UNSTABLE', stageResult: 'FAILURE') {
                            sh 'npm run test:e2e'
                        }
                    }
                }
            }
        }

        stage('Reports') {
            steps {
                junit 'reports/*.xml'
                archiveArtifacts artifacts: 'reports/**, coverage/**, report.*', fingerprint: true
            }
        }
        stage('Generate PDF Report') {
            steps {
                sh '''
                npm install
                node generatePdf.js
                '''
                archiveArtifacts artifacts: 'report.pdf'
            }
        }
        post {

            always {
                echo 'Notification sent'
            }

            success {
                slackSend channel: '#devops',
                message: "✅ SUCCESS: ${env.JOB_NAME} - Build #${env.BUILD_NUMBER}"

                emailext(
                    subject: "SUCCESS: ${env.JOB_NAME} #${env.BUILD_NUMBER}",
                    body: "Build Successful\n${env.BUILD_URL}",
                    to: "your-email@gmail.com"
                )
            }

            failure {
                slackSend channel: '#devops',
                message: "❌ FAILED: ${env.JOB_NAME} - Build #${env.BUILD_NUMBER}"

                emailext(
                    subject: "FAILED: ${env.JOB_NAME} #${env.BUILD_NUMBER}",
                    body: "Build Failed\n${env.BUILD_URL}",
                    to: "your-email@gmail.com"
                )
            }
        }
    }
}
