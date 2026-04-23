pipeline {
    agent any

    tools {
        nodejs 'node18'
    }

    stages {

        stage('Build') {
            steps {
                sh '''
                npm config set registry https://registry.npmjs.org/
                npm config set strict-ssl false
                npm config set fetch-retry-maxtimeout 600000
                npm install --legacy-peer-deps
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
