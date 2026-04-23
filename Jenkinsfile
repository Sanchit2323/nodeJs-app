pipeline {
    agent any

    tools {
        nodejs 'node18'
    }

    environment {
        EMAIL_TO = "sanchitkumar0307@gmail.com"
        SLACK_CHANNEL = "#jenkins-test"
        REPO_URL = "https://github.com/kaniprabhu2/nodeJs-app.git"
        PORT = "5000"
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

                    def repo = sh(
                        script: "git config --get remote.origin.url",
                        returnStdout: true
                    ).trim()

                    def branch = sh(
                        script: "git rev-parse --abbrev-ref HEAD",
                        returnStdout: true
                    ).trim()

                    try {
                        slackSend(
                            channel: SLACK_CHANNEL,
                            message: """
:rocket: *STARTED*

:package: Job    : ${env.JOB_NAME}
:1234: Build  : #${env.BUILD_NUMBER}
:herb: Branch : ${branch}
:file_folder: Repo   : ${repo}
:link: URL    : ${env.BUILD_URL}
"""
                        )
                    } catch (err) {
                        echo "Slack failed at start"
                    }
                }
            }
        }

        stage('Build') {
            steps {
                sh 'npm install'
            }
        }

        stage('Test') {
            steps {
                sh 'npm test || true'
            }
        }

        stage('Deploy') {
            steps {
                sh '''
                echo "Starting app..."

                pkill node || true

                npm install

                nohup env PORT=5000 node app.js > app.log 2>&1 &

                sleep 5

                echo "Running processes:"
                ps -ef | grep node
                '''
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
                def repo = sh(
                    script: "git config --get remote.origin.url",
                    returnStdout: true
                ).trim()

                try {
                    slackSend(
                        channel: SLACK_CHANNEL,
                        message: """
:white_check_mark: *SUCCESS*

:package: Job   : ${env.JOB_NAME}
:1234: Build : #${env.BUILD_NUMBER}
:file_folder: Repo  : ${repo}
:link: URL   : ${env.BUILD_URL}
"""
                    )
                } catch (err) {}
            }
        }

        failure {
            script {
                def repo = sh(
                    script: "git config --get remote.origin.url",
                    returnStdout: true
                ).trim()

                try {
                    slackSend(
                        channel: SLACK_CHANNEL,
                        message: """
:x: *FAILURE*

:package: Job   : ${env.JOB_NAME}
:1234: Build : #${env.BUILD_NUMBER}
:file_folder: Repo  : ${repo}
:link: URL   : ${env.BUILD_URL}
"""
                    )
                } catch (err) {}
            }
        }

        unstable {
            script {
                def repo = sh(
                    script: "git config --get remote.origin.url",
                    returnStdout: true
                ).trim()

                try {
                    slackSend(
                        channel: SLACK_CHANNEL,
                        message: """
:warning: *UNSTABLE*

:package: Job   : ${env.JOB_NAME}
:1234: Build : #${env.BUILD_NUMBER}
:file_folder: Repo  : ${repo}
:link: URL   : ${env.BUILD_URL}
"""
                    )
                } catch (err) {}
            }
        }
    }
}
