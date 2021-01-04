import DAOUser from '../../src/dao/dao_user';
import User from '../../src/model/user'
import * as chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
const assert = chai.assert;
const expect = chai.expect;

chai.use(chaiAsPromised);

const DAOTested = new DAOUser();

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
            result.map((user:User) =>{
                assert.isNotEmpty(user.getFirstName);
                assert.isNotEmpty(user.getLastName);
            }
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

    });

    describe("Tests on getLastId() method", function(){

    });

    describe("Tests on addUser() method", function(){

    });

    describe("Tests on deleteUser() method",function(){

    });

    describe("Tests on updateUser() method", function() {

    });

    describe("Tests on getUserHistory() method",function(){

    });

    describe("Tests on hasUserwithEmail() method", function(){

    });

    describe("Tests on checkUser() method", function(){

    });

    describe("Tests on changePassword() method", function(){

    });
});