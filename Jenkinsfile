pipeline {
agent any

tools {
    nodejs 'node18'
}

environment {
    EMAIL_TO = "sanchitkumar0307@gmail.com"
    SLACK_WEBHOOK = credentials('slack-webhook')
    REPO_URL = "https://github.com/Sanchit2323/nodeJs-app.git"
    PORT = "5000"
}

stages {

    stage('Checkout') {
        steps {
            git branch: 'main', url: "${REPO_URL}"
        }
    }

    stage('Start') {
        when {
            branch 'main'
        }
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
            sh 'npm install'
        }
    }

    stage('Test') {
        steps {
            catchError(buildResult: 'UNSTABLE', stageResult: 'UNSTABLE') {
                sh 'npm test || true'
            }
        }
    }

    stage('Deploy') {
        steps {
            sh '''
            echo "Starting app..."

            pkill node || echo "No process running"

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
