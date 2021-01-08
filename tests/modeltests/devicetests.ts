import Device from '../../src/model/device';

import { assert, expect } from 'chai';

const devTested = new Device("test1",2,"Ordinateur","PremierTest","1.0","url","0707070707");

describe("Test on device.ts", function(){

    describe("Constructor tests",function (){
        it("Create a device with invalid references should throw error",function(){
            expect(() => new Device("test",1,"Téléphones","Second test","1.0","","0778787878")).to.throw(Error);
            expect(() => new Device("test33",1,"Téléphones","Third test","1.0","","0778787878")).to.throw(Error);
        })

        // Ca n'a jamais été dis ?
        /*it("Create a device with an invalid category should throw an error", async function (){
            expect(() => new Device("test4",9999,"CategoryTest","Category test","1.0","","0778787878")).to.throw(Error);
        });*/
        
        /*it("Create a device with invalid version number should throw an error", async function(){
           expect(() => new Device("test5",1,"Téléphones","Version test","4447.09984145115621441","","0778787878")).to.throw(Error);
           expect(() => new Device("test6",1,"Téléphones","Version test 2","1.","2.","0778787878")).to.throw(Error);
           expect(() => new Device("test7",1,"Téléphones","Version test 3","testversion","","0778787878")).to.throw(Error);
        });*/
        
        it("Create a device with an invalid phone number should throw an error", async function(){
            expect(() => new Device("test8",1,"Téléphones","Phone Number test","1.0","","+337787878787878787878787878")).to.throw(Error);
            expect(() => new Device("test9",1,"Téléphones","Phone Number test","1.0","","++3377878787878")).to.throw(Error);
            expect(() => new Device("test10",1,"Téléphones","Phone Number test","1.0","","842+54161654196")).to.throw(Error);
            expect(() => new Device("test11",1,"Téléphones","Phone Number test","1.0","","te")).to.throw(Error);
        });
    });

    it("Device Creation test", function() {
        assert.equal(devTested.getRef(),"test1");
        assert.equal(devTested.getCategoryID(),2);
        assert.equal(devTested.getCategoryName(),"Ordinateur");
        assert.equal(devTested.getName(),"PremierTest");
        assert.equal(devTested.getVersion(),"1.0");
        assert.equal(devTested.getPhoto(),"url");
        assert.equal(devTested.getPhone(),"0707070707");
        assert.isTrue(Array.isArray(devTested.getLockDays()));
    })

    it("Device Modification test", function (){
        devTested.setRef("modif");
        //devTested.setCategory("Phone");
        devTested.setName("ModifTest");
        devTested.setVersion("1.1");
        devTested.setPhoto("url2");
        devTested.setPhone("0707070708");

        assert.equal(devTested.getRef(),"modif");
        //assert.equal(devTested.getCategory(),"Phone");
        assert.equal(devTested.getName(),"ModifTest");
        assert.equal(devTested.getVersion(),"1.1");
        assert.equal(devTested.getPhoto(),"url2");
        assert.equal(devTested.getPhone(),"0707070708");
    })

    describe("Testing the exceptions",function(){
        
        it("Setting a reference with higher or lower lenght than 5 should throw error", function () {
            const stringRef = "reftest";
            expect(devTested.setRef.bind(devTested, stringRef)).to.throw("Invalid reference");
        });

        it("Setting a wrong size Name should throw error", function () {
            let stringName = "";
            expect(devTested.setName.bind(devTested, stringName)).to.throw("Invalid name");
            stringName = "trentre et plus de noms pour le test";
            expect(devTested.setName.bind(devTested, stringName)).to.throw("Invalid name");
        });

        it("Setting a wrong version number size should throw an error", function() {
            let stringVersion = "1";
            expect(devTested.setVersion.bind(devTested, stringVersion)).to.throw("Invalid version");
            stringVersion = "11";
            expect(devTested.setVersion.bind(devTested, stringVersion)).to.throw("Invalid version");
            stringVersion = "8888888888.88888888888888888888";
            expect(devTested.setVersion.bind(devTested, stringVersion)).to.throw("Invalid version");
        });

        it("Setting a too long phone number size should throw an error", function() {
            const stringVersion = "123456789102487"; //15 caracters maximum, to respect the +999787878787 form
            expect(devTested.setPhone.bind(devTested, stringVersion)).to.throw("Invalid phone");
        });
    });
});