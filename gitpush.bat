@echo off

IF "%~1"=="" (
    echo ❌ Merci de fournir un message de commit
    echo Exemple: git "Ajout fonctionnalite"
    exit /b
)
git add .
git commit -m "%~1"
git push

echo ✅ Terminé !