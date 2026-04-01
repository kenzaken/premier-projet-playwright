pipeline{
    agent {
        docker {
            image 'mcr.microsoft.com/playwright:v1.58.2-noble'
            args '-u root --entrypoint='
        }  
    }
    stages{
        stage('install dependence'){
            steps{
               sh 'npm install'
            }
        }
        stage('lancement de test'){
            steps{
                sh 'npx playwright test --project=chromium'
            }
        }
    }
}
