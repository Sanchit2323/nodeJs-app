pipeline {
    agent any

    tools {
        nodejs 'node18'
    }

    environment {
        EMAIL_TO = "sanchitkumar0307@gmail.com"
        SLACK_WEBHOOK = "https://hooks.slack.com/services/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"
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
                    def repo = sh(script: "git config --get remote.origin.url", returnStdout: true).trim()
                    def branch = sh(script: "git rev-parse --abbrev-ref HEAD", returnStdout: true).trim()

                    notifySlack(":rocket: *STARTED*", repo, branch)
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
                catchError(buildResult: 'UNSTABLE', stageResult: 'UNSTABLE') {
                    sh 'npm test'
                }
            }
        }

        stage('Deploy') {
            steps {
                sh '''
                echo "Starting app..."

                pkill node || echo "No existing process"

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
                def repo = sh(script: "git config --get remote.origin.url", returnStdout: true).trim()
                def branch = sh(script: "git rev-parse --abbrev-ref HEAD", returnStdout: true).trim()

                notifySlack(":white_check_mark: *SUCCESS*", repo, branch)
            }
        }

        failure {
            script {
                def repo = sh(script: "git config --get remote.origin.url", returnStdout: true).trim()
                def branch = sh(script: "git rev-parse --abbrev-ref HEAD", returnStdout: true).trim()

                notifySlack(":x: *FAILURE*", repo, branch)
            }
        }

        unstable {
            script {
                def repo = sh(script: "git config --get remote.origin.url", returnStdout: true).trim()
                def branch = sh(script: "git rev-parse --abbrev-ref HEAD", returnStdout: true).trim()

                notifySlack(":warning: *UNSTABLE*", repo, branch)
            }
        }
    }
}

def notifySlack(status, repo, branch) {

    def msg = """
${status}

:package: Job   : ${env.JOB_NAME}
:1234: Build : #${env.BUILD_NUMBER}
:herb: Branch : ${branch}
:file_folder: Repo  : ${repo}
:link: URL   : ${env.BUILD_URL}
"""

    try {
        sh """
        curl -X POST -H 'Content-type: application/json' \
        --data '{"text":"${msg}"}' \
        ${SLACK_WEBHOOK}
        """
    } catch (err) {
        echo "Slack notification failed"
    }
}
