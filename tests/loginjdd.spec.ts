import { test, expect } from '@playwright/test'
import { loginpom } from '../pages/loginpom.page'
// systeme fille qui permet de lire le csv
import fs from 'fs'
// importer un parser csv qui convertir le fechier csv qui contient les jdd on objet javascript
import { parse } from 'csv-parse/sync'
//importer le module path pour  gerere les chemin
import path from 'path'
// declarer les varrialbe pour  recuperer la page de pom 
let pm: loginpom
// lecture  de fechier csv  et transformer en tableau d'objet 
//__dirname le fechier  actuelle 
const users = parse(fs.readFileSync(path.join(__dirname, 'data/jdd.csv')), {
    columns: true, //cibler l'entete du fechier csv 
    skip_empty_lines: true //ignore les lines vides 

})
test("logine with jdd", async ({ page }) => {
    for (const user of users!) { // la boucle parcourire toute les lignes de le fechier csv 
        // ! non nulle assertion operateur son utiliter (! les donnes non nulle non undefinde) 
        pm = new loginpom(page)
        await page.goto("https://www.saucedemo.com/")
        await pm.saisirUsername(user!.username)
        await pm.saisirpassword(user!.password)
        await pm.clickLogin()

        if (user!.result == "succes") {
            await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html")

        }
        else {
            await expect(pm.messageerreur()).toBeVisible()


        }
    }
})
