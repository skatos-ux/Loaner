import Category from '../../src/model/category';

import { assert } from 'chai';

const catTested = new Category(1,"Test");

describe("Tests on category.ts", function() {

    it("Category Creation",function(){
        assert.equal(catTested.getID(),1);
        assert.equal(catTested.getName(),"Test");
    });

    it("Id Modification",function(){
        catTested.setID(2);
        assert.equal(catTested.getID(),2);
    });

    it("Name Modification",function(){
        catTested.setName("Lafont");
        assert.equal(catTested.getName(),"Lafont");
    });
});