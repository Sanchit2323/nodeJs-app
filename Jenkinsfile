pipeline {
    agent any

    tools {
        nodejs 'node16'
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
                        catchError(buildResult: 'UNSTABLE') {
                            sh 'npm run test:unit'
                        }
                    }
                }

                stage('Integration Test') {
                    steps {
                        catchError(buildResult: 'UNSTABLE') {
                            sh 'npm run test:integration'
                        }
                    }
                }

                stage('E2E Test') {
                    steps {
                        catchError(buildResult: 'UNSTABLE') {
                            sh 'npm run test:e2e'
                        }
                    }
                }
            }
        }

        stage('Reports') {
            steps {
                junit 'reports/*.xml'
                archiveArtifacts artifacts: 'coverage/**', fingerprint: true
            }
        }
        stage('Generate PDF Report') {
            steps {
                sh '''
                echo "Test Report" > report.txt
                echo "Build: $BUILD_NUMBER" >> report.txt
                echo "Status: SUCCESS" >> report.txt
                '''
                archiveArtifacts artifacts: 'report.*'
            }
        }
    }
}
