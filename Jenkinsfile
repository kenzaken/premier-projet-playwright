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
        choice(name: 'tag', choices:['@smoke','@regression'],  description:'choisis le test que on veut executer')
        booleanParam(name: 'choiceTags',  defaultValue:true, description:'si on a bien choisi le tag adequat  ')
        booleanParam(name:'alltest', defaultValue:true,description:'si on veut lancer tout les test a la fois ')

    }
    
    stages{
        stage('install dependence'){
            steps{
               sh 'npm install'
            }
        }
        stage('lancement de test'){
            steps{
                    //reflete exactement ce que on fait on local avec la notion des params pour reflete la commande en local
                    script{
                        if(params.alltest==true){
                            sh "npx playwright test --project=${params.browser}"
                            
                        }else{
                            if(params.choiceTags==true){
                                 sh "npx playwright test ${params.choiceTags} --project=${params.browser}"

                            }
                             else{
                                 sh "npx playwright test ${params.fichier} --project=${params.browser}"
                                 } 
                        }
                        
                    }
                }
           
        }
            }
           
   

}