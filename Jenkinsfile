pipeline {
    agent any

    tools {
        nodejs 'node18'
    }

    stages {

        stage('Build') {
            steps {
                sh '''
                npm config set strict-ssl false
                npm config set registry http://registry.npmjs.org/
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
                junit 'reports/junit.xml'
                archiveArtifacts artifacts: 'coverage/**', fingerprint: true
            }
        }
    }
}
