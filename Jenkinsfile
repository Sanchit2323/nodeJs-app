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
    }
}
