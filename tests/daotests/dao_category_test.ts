
import DAOCategory from '../../src/dao/dao_category';
import Category from '../../src/model/category';

import * as chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
const assert = chai.assert;
const expect = chai.expect;

chai.use(chaiAsPromised);

const DAOCategTested = new DAOCategory();

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

    describe("Tests on addCategory() method",function (){

        function resultGetCategory(name:string) {
            return DAOCategTested.getByName(name);
        }

        it("A new category added should be seen in a SELECT request later",async function(){
            DAOCategTested.addCategory(new Category(9999, "TestCategory"));
            const result = await resultGetCategory("TestCategory");
            assert.isNotNull(result);
            expect(result.getID()).to.equal(9999);
            expect(result.getName()).to.equal("TestCategory");
        });
    });

    describe("Tests on deleteCategory() method",function (){

        function resultGetCategory(name:string) {
            return DAOCategTested.getByName(name);
        }

        it("A deleted category should not be in a query later",async function() {
            expect(await DAOCategTested.deleteCategory.bind(DAOCategTested,9999)).not.to.throw(Error);
        });
    
        // The previous category we tried to add should not be added, so theses deletion should not work
        it("The category we tried to added, should throw an error at its deletion, or it is deleted from the database", async function(){
           expect(DAOCategTested.deleteCategory(-1)).to.be.rejected;
        });
        
    });
});
