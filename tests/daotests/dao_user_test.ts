import DAOUser from '../../src/dao/dao_user';
import User from '../../src/model/user'
import * as chai from 'chai';
import chaiAsPromised from 'chai-as-promised';

import Reservation from '../../src/model/reservation';

const assert = chai.assert;
const expect = chai.expect;

chai.use(chaiAsPromised);

const DAOTested = new DAOUser();

var usertest = new User("EEEEEEE","Tester","Testing","Testtest@gmail.com",false,false);

describe("Tests on dao_user.ts",function(){

    describe("Tests on getAll() method",function() {

        it("The result type must be an array of user", async function() {
            const result = await DAOTested.getAll();
            expect(Array.isArray(result)).to.equal(true);
        });

        it("The users must have a 7 characters ID",async function() {
            const result = await DAOTested.getAll();
            result.map((user:User) => {
                assert.equal(user.getId().length,7);
            });
        })

        it("The users must not have empty names or surname", async function(){
            const result = await DAOTested.getAll();
            result.map((user:User) => {
                assert.isNotEmpty(user.getFirstName());
                assert.isNotEmpty(user.getLastName());
            })
        })

        it("The users must have a valid email", async function(){
            const result = await DAOTested.getAll();
            result.map((user:User) => {
                assert.match(user.getEmail(),/^[^@\s]+@[^@\s]+\.[^@\s]+$/);
            })
        })

        it("All registered users must have a definitive password", async function(){
            const result = await DAOTested.getAll();
            result.map((user:User) => {
                assert.isFalse(user.hasTemporaryPassword());
            })
        })
    });

    describe("Tests on getUser() method",function(){

        it("The user get must not have empty name or surname",async function(){
            const result = await DAOTested.getUser("ABCDEFG");
            assert.isNotEmpty(result.getFirstName());
            assert.isNotEmpty(result.getLastName());
        })

        it("The user must have a valid email", async function(){
            const result = await DAOTested.getUser("ABCDEFG");
            assert.match(result.getEmail(),/^[^@\s]+@[^@\s]+\.[^@\s]+$/);
        })

        it("All registered users must have a definitive password", async function(){
            const result = await DAOTested.getUser("ABCDEGF");
            assert.isFalse(result.hasTemporaryPassword());
            
        })
    });

    describe("Tests on getLastId() method", function(){
        /*
        it("The Last id must be positive",async function(){
            const result = await DAOTested.getLastId();
            assert.isAbove(result.getId(),0);
        })*/

        it("The last id must not be empty", async function(){
            const result = await DAOTested.getLastId();
            assert.isNotEmpty(result.getId());
        })
    });

    describe("Tests on addUser() method", function(){
        
        it("An added user must be seen in a query",async function(){
            expect(DAOTested.addUser(usertest,"test")).not.to.be.rejected;

            const result = await DAOTested.getUser("EEEEEEE");
            assert.equal(result.getFirstName(),"Tester");
            assert.equal(result.getLastName(),"Testing");
            assert.equal(result.getEmail(),"Testtest@gmail.com");
            assert.isFalse(result.isAdmin());
        })
    });

    describe("Tests on updateUser() method", function() {
        it("The modifications made on a user must be seen in queries later", async function(){
            usertest.setAdmin(true);
            usertest.setEmail("secondtest@gmail.com");
            usertest.setFirstName("Yohan");
            usertest.setLastName("Rousseau");
            usertest.setTemporaryPassword(true);

            expect(DAOTested.updateUser(usertest)).not.to.be.rejected;

            const result = await DAOTested.getUser(usertest.getId());
            assert.equal(result.getFirstName(),"Yohan");
            assert.equal(result.getLastName(),"Rousseau");
            assert.equal(result.getEmail(),"secondtest@gmail.com");
            assert.isTrue(result.isAdmin());
            assert.isTrue(result.hasTemporaryPassword());
        })
    });

    describe("Tests on authenticate", function(){

        it("Checking the actual password should not throw error",async function(){
            expect(DAOTested.checkUser(usertest.getEmail(),"test")).not.to.be.rejected;
        });

        it("Changing the password and checking it should not throw error", async function(){
            expect(DAOTested.changePassword(usertest.getEmail(),"newtest")).not.to.be.rejected;

            expect(DAOTested.checkUser(usertest.getEmail(),"newtest")).not.to.be.rejected;
        });
    });

    describe("Tests on deleteUser() method",function(){
        it("A deleted user cannot be seen in a query", async function(){
            expect(DAOTested.deleteUser(usertest.getId())).not.to.be.rejected;
            expect(DAOTested.getUser(usertest.getId())).to.be.rejected;
        })
    });
});