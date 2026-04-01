
import{test,expect} from '@playwright/test'

/*test("description : ouvrir la page chrome ",async function({page}){

//naviger vers l'url

await page.goto("https://www.saucedemo.com/");

});*/

test("description : ouvrir les pages de navig ",async ({page}) => {

//naviger vers l'url

await page.goto("https://www.saucedemo.com/");

//pour verifier le resultat obtenu avec le resultat attendu
await expect(page).toHaveTitle(/Swag Labs/);

});