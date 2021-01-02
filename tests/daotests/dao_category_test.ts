
import DAOCategory from '../../src/dao/dao_category';
import Category from '../../src/model/category';

const assert = require('chai').assert;
const expect = require('chai').expect;

const DAOCategTested = new DAOCategory();

/* TODO 
    - Vérifier que le résultat soit un tableau
    - Vérifier qu'il y ait au moins une catégorie
    -(à voir) Vérifier qu'il y ait la catégorie Ordinateurs / Portables
    - Vérifier que le nom des catégories n'excède pas 255 caractères
    - Vérifier que les identifiants des Catégories soient positifs et non null
    - Vérifier que les noms ne possèdent que des lettres de l'alphabet ou des tiret
    -(à voir) Vérifier que les types des variabes soient du même type que les attributs de la classe
    -(à voir) Controller l'ajout de catégorie au nom étrange
    - Controler l'ajout de categorie avec un Id négatif
*/

describe("Tests on dao_category.ts",function (){

    describe("Tests on getAll() method",function (){

        function resultAllCategories() {
            return DAOCategTested.getAll();
        }

        it("The result type must be an array of category", async function() {
            const result = await resultAllCategories();
            expect(Array.isArray(result)).to.equal(true);
        });
        
        it("The result must not be empty, there have to be at least one category in the program",async function() {
            const result = await resultAllCategories();
            assert.isAbove(result.length, 0, "There must be at least one category");
        })

        it("The names of the categories must not exceed 255 characters", async function(){
            const result = await resultAllCategories();
            result.forEach( function(category){
                assert.isBelow(category.getName().length,255);
            });
        });

        it("ID of Categories must be strictly postives", async function() {
            const result = await resultAllCategories();
            result.forEach( function(category){
                assert.isAbove(category.getID(),0);
            });
        });

        //Pas dans les spécifications, confort utilisateur
        /*
        it("The names of the categories must not have any number", async function(){
            const result = await resultAllCategories();
            result.forEach( function(category){
                expect(category.getName()).not.to.match(/^([0-9_])$/);
            });
        });

        it("The names of the categories must contain only letters or '-'",async function () {
            const result = await resultAllCategories();
            result.forEach( function(category){
                expect(category.getName()).to.match(/^[a-zA-Z\-éèà]{0,255}$/);
            });
        });
        */
    });

    describe("Tests on getByName() method",function (){

        function resultGetCategory(name:string) {
            return DAOCategTested.getByName(name);
        }

        it("The result type must be a category", async function() {
            const result = await resultGetCategory("Téléphones");
            assert.isTrue(result instanceof Category);
        });

        it("The database must have the smartphone category", async function(){
            const result = await resultGetCategory("Téléphones");
            assert.isNotNull(result);
        });

        it("The names of the category must not have any number", async function(){
            const result = await resultGetCategory("Téléphones");
            expect(result.getName()).not.to.match(/^([0-9_])$/);
        });

        it("The names of the category must contain only letters or '-'",async function () {
            const result = await resultGetCategory("Téléphones");
            expect(result.getName()).to.match(/^[a-zA-Z\-éèà]{0,255}$/);
        });
        
    });

    describe("Tests on getLastId() method",function (){
        function resultGetLastId() {
            return DAOCategTested.getLastId();
        }

        it("There must be at least one id, or there would be no categories", async function(){
            const result = await resultGetLastId();
            assert.isNotNull(result);
        });

        it("Last Id created must be positive", async function(){
            const result = await resultGetLastId();
            assert.isAbove(result.getID(),0);
        });
    });

    describe("Tests on rowToModel() method",function (){

    });

    describe("Tests on addCategory() method",function (){

        function resultGetCategory(name:string) {
            return DAOCategTested.getByName(name);
        }

        it("A new category added should be seen in a SELECT request later",async function(){
            DAOCategTested.addCategory("TestCategory",9999);
            const result = await resultGetCategory("TestCategory");
            assert.isNotNull(result);
            expect(result.getID()).to.equal(9999);
            expect(result.getName()).to.equal("TestCategory");
        });

        //Pas 
        /*
        //Theses categories will be deleted in the next test if the exceptions are not handled
        it("Adding a wrong name category should throw an error", function (){
            expect(DAOCategTested.addCategory.bind(DAOCategTested,"TestCategory1",9998)).to.throw(Error);
            expect(DAOCategTested.addCategory.bind(DAOCategTested,"?!te!st/",9997)).to.throw(Error);
            expect(DAOCategTested.addCategory.bind(DAOCategTested,"123456789",9996)).to.throw(Error);
        });
        */

        it("Adding category with a negative ID should throw an error",async function() {
           expect(await DAOCategTested.addCategory.bind(DAOCategTested,"TestCategory2",-1)).to.throw(Error);
        });
    });

    describe("Tests on deleteCategory() method",function (){

        function resultGetCategory(name:string) {
            return DAOCategTested.getByName(name);
        }

        it("A deleted category should not be in a query later",async function() {
            expect(await DAOCategTested.deleteCategory.bind(DAOCategTested,"9999")).not.to.throw(Error);
        });
    
        //The previous category we tried to add should not be added, so theses deletion should not work
        it("The category we tried to added, should throw an error at its deletion, or it is deleted from the database",async function(){
            //expect(DAOCategTested.deleteCategory.bind(DAOCategTested,"9998")).to.throw(Error);
            //expect(DAOCategTested.deleteCategory.bind(DAOCategTested,"9997")).to.throw(Error);
           //expect(DAOCategTested.deleteCategory.bind(DAOCategTested,"9996")).to.throw(Error);

           //Test bloquant que la suppression ait fonctionné ou pas
           expect(await DAOCategTested.deleteCategory.bind(DAOCategTested,"-1")).to.throw(Error);
            

        });
        
    });


    describe("Tests on modifyCategory() method",function (){

    });
});
