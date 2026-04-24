pipeline {
    agent any

    tools {
        nodejs 'node18'
    }

    environment {
        EMAIL_TO = "sanchitkumar0307@gmail.com"
        REPO_URL = "https://github.com/Sanchit2323/nodeJs-app.git"
    }

    stages {

        stage('Checkout') {
            steps {
                git branch: 'main', url: "${REPO_URL}"
            }
        }

        stage('Start') {
            steps {
                echo "Pipeline Started"
                script {
                    def repo = sh(script: "git config --get remote.origin.url", returnStdout: true).trim()
                    def branch = sh(script: "git rev-parse --abbrev-ref HEAD", returnStdout: true).trim()
                    notifySlack(":rocket: STARTED", repo, branch)
                }
            }
        }

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

        stage('SonarQube Analysis') {
            steps {
                withSonarQubeEnv('SonarQube') {
                    sh """
                    npx sonar-scanner \
                    -Dsonar.projectKey=nodejs-app \
                    -Dsonar.sources=. \
                    -Dsonar.host.url=$SONAR_HOST_URL \
                    -Dsonar.login=$SONAR_AUTH_TOKEN \
                    -Dsonar.javascript.lcov.reportPaths=coverage/lcov.info \
                    -Dsonar.exclusions=node_modules/**,coverage/** \
                    -Dsonar.test.inclusions=tests/**
                    """
                }
            }
        }

        stage('Quality Gate') {
            steps {
                timeout(time: 2, unit: 'MINUTES') {
                    waitForQualityGate abortPipeline: true
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
                npm install
                node generatePdf.js
                '''
                archiveArtifacts artifacts: 'report.pdf'
            }
        }
    }

    post {

        always {
            emailext(
                to: "${EMAIL_TO}",
                subject: "Build ${currentBuild.currentResult}: ${env.JOB_NAME} #${env.BUILD_NUMBER}",
                mimeType: 'text/html',
                body: """
                <h2>Jenkins Build Report</h2>
                <p><b>Job:</b> ${env.JOB_NAME}</p>
                <p><b>Status:</b> ${currentBuild.currentResult}</p>
                <p><b>Build:</b> #${env.BUILD_NUMBER}</p>
                <p><b>Duration:</b> ${currentBuild.durationString}</p>
                <p><a href="${env.BUILD_URL}console">View Logs</a></p>
                """
            )
        }

        success {
            script {
                def repo = sh(script: "git config --get remote.origin.url", returnStdout: true).trim()
                def branch = sh(script: "git rev-parse --abbrev-ref HEAD", returnStdout: true).trim()
                notifySlack(":white_check_mark: SUCCESS", repo, branch)
            }
        }

        failure {
            script {
                def repo = sh(script: "git config --get remote.origin.url", returnStdout: true).trim()
                def branch = sh(script: "git rev-parse --abbrev-ref HEAD", returnStdout: true).trim()
                notifySlack(":x: FAILURE", repo, branch)
            }
        }

        unstable {
            script {
                def repo = sh(script: "git config --get remote.origin.url", returnStdout: true).trim()
                def branch = sh(script: "git rev-parse --abbrev-ref HEAD", returnStdout: true).trim()
                notifySlack(":warning: UNSTABLE", repo, branch)
            }
        }
    }
}

def notifySlack(status, repo, branch) {

    def msg = """
${status}

Job: ${env.JOB_NAME}
Build: #${env.BUILD_NUMBER}
Branch: ${branch}
Repo: ${repo}
Build_URL: ${env.BUILD_URL}
"""

    def payload = groovy.json.JsonOutput.toJson([text: msg])

    try {
        withCredentials([string(credentialsId: 'slack-webhook', variable: 'SLACK_URL')]) {
            sh """
            curl -X POST -H "Content-type: application/json" \
            --data '${payload}' \
            \$SLACK_URL
            """
        }
    } catch (err) {
        echo "Slack notification failed"
    }
}
