pipeline{
    agent {
        docker {
            image 'mcr.microsoft.com/playwright:v1.58.2-noble'
            args '-u root --entrypoint='
        } 

    }
      parameters {
        string(name: 'fichier', defaultValue: 'panierpom', description: 'cibler le fichier')      
        choice(name: 'browser', choices: ['chromium', 'firefox', 'webkit'], description: 'choisis votre navigateur')
        //booleanParam(name: 'allure', defaultValue: true, description: 'generer le rapport')

    }
    
    stages{
        stage('install dependence'){
            steps{
               sh 'npm install'
            }
        }
        stage('lancement de test'){
            steps{
                sh "npx playwright test ${params.fichier} --project=${params.browser}"
                    }
           
        }
            }
           
   

}