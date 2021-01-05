import User from '../../src/model/user';

import { assert, expect } from 'chai';

const userTested = new User("0000001","Test","UserTest","test@gmail.com",false,false);


describe("Tests on user.ts", function() {

    it("User Creation test", function() {
        assert.equal(userTested.getId(),"0000001");
        assert.equal(userTested.getFirstName(),"Test");
        assert.equal(userTested.getLastName(),"UserTest");
        assert.equal(userTested.getEmail(),"test@gmail.com");
        assert.equal(userTested.isAdmin(), false);
    });

    it("Device Modification test", function (){
        userTested.setId("0000002");
        userTested.setFirstName("Milan");
        userTested.setLastName("Bourbe");
        userTested.setEmail("MilanBourbe@guez.com");
        userTested.setAdmin(true);

        assert.equal(userTested.getId(),"0000002");
        assert.equal(userTested.getFirstName(),"Milan");
        assert.equal(userTested.getLastName(),"Bourbe");
        assert.equal(userTested.getEmail(),"MilanBourbe@guez.com");
        assert.equal(userTested.isAdmin(),true);
    });

    
    describe("Testing exceptions", function (){
        it("Setting an ID lower than 0 should throw an error", function () {
           expect(userTested.setId.bind(userTested,"-1")).to.throw(Error);
        });
        it("Setting an empty firstname should throw an error",function (){
            expect(userTested.setFirstName.bind(userTested,"")).to.throw(Error);
        });
        it("Setting an empty Lastname should throw an error", function() {
            expect(userTested.setLastName.bind(userTested,"")).to.throw(Error);
        });
        it("Setting an invalid email form should throw an error", function() {
            expect(userTested.setEmail.bind(userTested,"test@test@test.fr")).to.throw(Error);
            expect(userTested.setEmail.bind(userTested,"testtesttest.fr")).to.throw(Error);
            expect(userTested.setEmail.bind(userTested,"test@.test@test.fr")).to.throw(Error);
            expect(userTested.setEmail.bind(userTested,"test.test@testfr")).to.throw(Error);
        })
        

    })
});