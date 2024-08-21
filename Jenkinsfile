pipeline {
    agent any

    environment {
        AWS_REGION = 'us-east-1'
        S3_BUCKET = 'nitin-frontend-app-bucket'
        S3_PATH = 'demokart-app'
    }

    stages {
        stage('Get Git Commit Hash') {
            steps {
                script {
                    // Get the current Git commit hash
                    GIT_COMMIT_HASH = sh(script: 'git rev-parse --short HEAD', returnStdout: true).trim()
                    echo "Git commit hash: ${GIT_COMMIT_HASH}"
                }
            }
        }

        stage('Build') {
            steps {
                script {
                    // Clean previous build artifacts
                    sh 'rm -rf dist'
                    
                    // Build Angular app
                    sh 'npm install'
                    sh 'ng build'
                }
            }
        }

        stage('Package') {
            steps {
                script {
                    // Package the Angular app with the Git commit hash in the file name
                    APP_PATH = "Demokart-app-${GIT_COMMIT_HASH}.zip"
                    sh "cd dist && zip -r ../${APP_PATH} ."
                }
            }
        }

        stage('Upload to S3') {
            steps {
                script {
                    withCredentials([aws(credentialsId: "nagarro")]) {
                        // Upload the packaged app to S3
                        sh "aws s3 cp ${APP_PATH} s3://${S3_BUCKET}/${S3_PATH}/${APP_PATH} --region ${AWS_REGION}"
                    }
                }
            }
        }

        stage('Deploy') {
            steps {
                script {
                    withCredentials([aws(credentialsId: "nagarro")]) {
                        // Notify the EC2 instances to deploy the new app
                        sh """
                        aws cloudformation deploy \
                        --stack-name frontendAngularStack \
                        --template-file ./deployment.yaml \
                        --parameter-overrides S3Path=${S3_BUCKET}/${S3_PATH}/${APP_PATH}  \
                        --capabilities CAPABILITY_NAMED_IAM  \
                        --no-fail-on-empty-changeset \
                        --region us-east-1
                        """
                    }
                }
            }
        }
    }

    post {
        always {
            // Cleanup steps or notifications
            echo 'Cleaning up...'
            sh "rm -f ${APP_PATH}"
        }
    }
}
