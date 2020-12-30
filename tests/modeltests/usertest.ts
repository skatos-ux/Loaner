import { expect } from 'chai';
import User from '../../src/model/user';

const assert = require('chai').assert;
const chai = require('chai');
const userTested = new User(1,"Test","UserTest","test@gmail.com",0);


describe("Tests on user.ts", function() {

    it("User Creation test", function() {
        assert.equal(userTested.getId(),1);
        assert.equal(userTested.getFirstName(),"Test");
        assert.equal(userTested.getLastName(),"UserTest");
        assert.equal(userTested.getEmail(),"test@gmail.com");
        assert.equal(userTested.isAdmin(),0);
    });

    it("Device Modification test", function (){
        userTested.setId(2);
        userTested.setFirstName("Milan");
        userTested.setLastName("Bourbe");
        userTested.setEmail("MilanBourbe@guez.com");
        userTested.setAdmin(1);

        assert.equal(userTested.getId(),2);
        assert.equal(userTested.getFirstName(),"Milan");
        assert.equal(userTested.getLastName(),"Bourbe");
        assert.equal(userTested.getEmail(),"MilanBourbe@guez.com");
        assert.equal(userTested.isAdmin(),1);
    });

    describe("Testing exceptions", function (){
        it("Setting an ID lower than 0 should throw an error"), function (){
            expect(userTested.setId.bind(userTested,-1)).to.throw(Error);
        }
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
        it("Setting Admin number different than 0 or 1 should throw an error", function () {
            expect(userTested.setAdmin.bind(userTested,0)).not.to.throw(Error);
            expect(userTested.setAdmin.bind(userTested,-1)).to.throw(Error);
            expect(userTested.setAdmin.bind(userTested,35)).to.throw(Error);
        });
    })
});