pipeline {
    agent {
        docker {
            image 'mcr.microsoft.com/playwright:v1.58.2-noble'
            args '-u root --entrypoint=""'  // FIX 1 : entrypoint vide correctement échappé
        }
    }

    triggers {
        cron('* * * * *')
    }

    parameters {
        string(name: 'fichier', defaultValue: 'panierpom', description: 'Cibler le fichier')
        choice(name: 'browser', choices: ['chromium', 'firefox', 'webkit'], description: 'Choisir votre navigateur')
        choice(name: 'tag', choices: ['@smoke', '@regression'], description: 'Choisir le tag à exécuter')
        booleanParam(name: 'choiceTags', defaultValue: true, description: 'Lancer les tests par tag')
        booleanParam(name: 'alltest', defaultValue: true, description: 'Lancer tous les tests')
    }

    stages {
        stage('Install dependencies') {
            steps {
                sh 'npm install'
            }
        }

        stage('Lancement des tests') {
            steps {
                script {
                    if (params.alltest) {
                        sh "npx playwright test --project=${params.browser}"

                    } else if (params.choiceTags) {
                        sh "npx playwright test --grep='${params.tag}' --project=${params.browser}"

                    } else {
                        sh "npx playwright test ${params.fichier} --project=${params.browser}"
                    }
                }
            }
        }
    }

    post {
        success {
            build job: 'jobE', wait: false
        }
    }
}