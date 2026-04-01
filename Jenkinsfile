pipeline{
    agent {
        docker {
            image 'mcr.microsoft.com/playwright:v1.58.2-noble'
            args '-u root --entrypoint='
        } 

    }
      parameters {
        string(name: 'panierpom', defaultValue: 'panierpom', description: 'cibler le fichier')      
        choice(name: 'browser', choices: ['chromium', 'firefox', 'webkit'], description: 'choisis votre navigateur')

    }
    
    stages{
        stage('install dependence'){
            steps{
               sh 'npm install'
            }
        }
        stage('lancement de test'){
            steps{
                sh "npx playwright test --project=${params.browser}"
                    }
           
        }
        stage('allure repport'){
             steps{
                sh 'npx allure generate allure-results --clean -o allure-report'
                sh 'npx allure open allure-report'
            }
        }
            }
           
   

}