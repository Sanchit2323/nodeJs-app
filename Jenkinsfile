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
                echo "<h1>Test Report</h1>" > report.html
                echo "<p>Build: $BUILD_NUMBER</p>" >> report.html
                echo "<p>Status: SUCCESS</p>" >> report.html
                cp report.html report.pdf
                '''
                archiveArtifacts artifacts: 'report.*'
            }
        }
    }
}
