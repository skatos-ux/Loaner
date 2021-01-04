import DAODevice from '../../src/dao/dao_device';
import DAOCategory from '../../src/dao/dao_category';
import Category from '../../src/model/category';
import Device from '../../src/model/device';
import { DAO } from '../../src/dao/dao';
import DAOUser from '../../src/dao/dao_user';
import User from '../../src/model/user';
import DAOReservation from '../../src/dao/dao_reservation';

import { assert, expect } from 'chai';

 const DAObooking = new DAOReservation();
const DAOuser = new DAOUser();
const DAOTested = new DAODevice();
const DAOcat = new DAOCategory();
 /* TODO:
- Vérifier que les types des variabes soient du même type que les attributs de la classe;
- Vérifier que chaque appareil appartiennent à une categorie existante
- Vérifier que chaque appareil ait une reference égale à 5 caractères
- vérifier que chaque appareil ait un nom non null
- Vérifier qu'une version soit inscrite entre 3 et 15 caractères
- Vérifier que chaque version est supérieure à 0.0
- Vérifier
*/

 describe("Tests onf dao_device.ts", function() {

    describe("Tests on getAll() method",function() {

        function resultAllDevices() {
            return DAOTested.getAll();
        }

        it("The result type must be an array of devices", async function() {
            const result = await resultAllDevices();
            expect(Array.isArray(result)).to.equal(true);
        });

        it("The devices must match an existing category", async function(){
            const existingCategories = await DAOcat.getAll();
            const result = await resultAllDevices();

            var check = false;

            //Testing for every device that its category is member of the categories of the database
            result.forEach(function(device){
                existingCategories.forEach(function(category){
                    if (device.getCategoryID() == category.getID()) check = true;
                });
            });

            assert.isTrue(check);
        });

        it("The devices must have a five character reference", async function() {
            const result = await resultAllDevices();

            result.forEach(function(device){
                assert.equal(device.getRef().length,5);
            });
        });

        it("The devices must not have an empty name or a null name", async function() {
            const result = await resultAllDevices();

            result.forEach(function(device){
                assert.isNotNull(device.getName());
                assert.isAbove(device.getName().length,0);
            });
        });

        it("The devices must have a version number between 3 and 15 characters", async function() {
            const result = await resultAllDevices();

            result.forEach(function(device){
                assert.isAbove(device.getVersion().length,2);
                assert.isBelow(device.getVersion().length,16);
            })
        });

        it("The devices must have a correct version number", async function(){
            const result = await resultAllDevices();

            result.forEach(function(device){
                expect(device.getVersion()).to.match(/^[0-9]*\.[0-9]*$/);
            })
        });

        it("The devices must have a grater version than 0.0", async function(){
            const result = await resultAllDevices();

            result.forEach(function(device){
                const numbers = device.getVersion().split('.');
                assert.isAbove(parseInt(numbers[0]),0);
                assert.isAbove(parseInt(numbers[1]),-1);
            });
        })

        it("The devices with a phone number must have a correct phone number", async function(){
            const result = await resultAllDevices();

            result.forEach(function(device){
                if(device.getPhone()){
                    expect(device.getPhone()).to.match(/^\+?[0-9]{0,15}$/);
                }
            });
        })
    });

    describe("Tests on get() method",async function() {
        //The reference used in the test is a mock created at the start of init_db.sql
        const device =  await DAOTested.get("AN001");

        it("The device must match an existing category", async function(){
            const existingCategories = await DAOcat.getAll();

            var check = false;

            //Testing that its category is member of the categories of the database
            existingCategories.forEach(function(category){
                if (device.getCategoryID() == category.getID()) check = true;
            });

            assert.isTrue(check);
        });

        it("The device must have a five character reference", async function() {
            assert.equal(device.getRef().length,5);
        });

        it("The device must not have an empty name or a null name", async function() {
            assert.isNotNull(device.getName());
            assert.isAbove(device.getName().length,0);
        });

        it("The device must have a version number between 3 and 15 characters", async function() {
            assert.isAbove(device.getVersion().length,2);
            assert.isBelow(device.getVersion().length,16);
        });

        it("The device must have a correct version number", async function(){
            expect(device.getVersion()).to.match(/^[0-9]*\.[0-9]*$/);
        });

        it("The device must have a grater version than 0.0", async function(){
            const numbers = device.getVersion().split('.');
            assert.isAbove(parseInt(numbers[0]),0);
            assert.isAbove(parseInt(numbers[1]),-1);
        })

        it("The device with a phone number must have a correct phone number", async function(){
            if(device.getPhone()){
                expect(device.getPhone()).to.match(/^\+?[0-9]{0,15}$/);
            }
        })
    });

    describe("Tests on addDevice() method",function() {

        it("Adding a compliant device should not throw exception, and the added device must be seen in queries",async function() {
            //This device is compliant to the specifications
            expect(await DAOTested.addDevice.bind(DAOTested,new Device("test1",1,"Téléphones","First test","1.0","","0778787878"))).not.to.throw(Error);
            
            const result = await DAOTested.get("test1");
            assert.isNotNull(result);
            expect(result.getRef()).to.equal("test1");
            expect(result.getCategoryID()).to.equal(1);
            expect(result.getName()).to.equal("First test");
            expect(result.getVersion()).to.equal("1.0");
            expect(result.getPhoto()).to.equal("");
            expect(result.getPhone()).to.equal("0778787878");
        });

        //Theses devices are not compliant and should not be created neither added to the database
        it("Adding a device with invalid references should throw error", async function (){
            expect(await DAOTested.addDevice.bind(DAOTested,new Device("test",1,"Second test","1.0","","0778787878"))).to.throw(Error);
            expect(await DAOTested.addDevice.bind(DAOTested,new Device("test33",1,"Third test","1.0","","0778787878"))).to.throw(Error);
        });
        
        it("Adding a device with an invalid category should throw an error", async function (){
            expect(await DAOTested.addDevice.bind(DAOTested,new Device("test4",9999,"Category test","1.0","","0778787878"))).to.throw(Error);
        });
        
        it("Adding a device with invalid version number should throw an error", async function(){
            expect(await DAOTested.addDevice.bind(DAOTested,new Device("test5",1,"Version test","4447.09984145115621441","","0778787878"))).to.throw(Error);
            expect(await DAOTested.addDevice.bind(DAOTested,new Device("test6",1,"Version test 2","1.","2.","0778787878"))).to.throw(Error);
            expect(await DAOTested.addDevice.bind(DAOTested,new Device("test7",1,"Version test 3","testversion","","0778787878"))).to.throw(Error);
        });
        
        it("Adding a device with an invalid phone number should throw an error"), async function(){
            expect(await DAOTested.addDevice.bind(DAOTested,new Device("test8",1,"Phone Number test","1.0","","+337787878787878787878787878"))).to.throw(Error);
            expect(await DAOTested.addDevice.bind(DAOTested, new Device("test9",1,"Phone Number test","1.0","","++33778787878"))).to.throw(Error);
            expect(await DAOTested.addDevice.bind(DAOTested,new Device("test10",1,"Phone Number test","1.0","","842+541616541"))).to.throw(Error);
            expect(await DAOTested.addDevice.bind(DAOTested,new Device("test11",1,"Phone Number test","1.0","","testPhone"))).to.throw(Error);
        }
        
    });

    describe("Tests on deleteDevice() method",function() {

        it("Deleting the compliant device should not throw an error, and the devices should not be queryable", async function() {
            expect(await DAOTested.deleteDevice.bind(DAOTested,"test1")).not.to.throw(Error);
        });

        //Tests bloquants Que les suppressions aient fonctionnées ou pas
        it("Deleting all the invalid devices should throw an error, or they were created earlier",async function (){
            expect(await  DAOTested.deleteDevice.bind(DAOTested,"test")).to.throw(Error);
            expect(await DAOTested.deleteDevice.bind(DAOTested,"test33")).to.throw(Error);
            expect(await DAOTested.deleteDevice.bind(DAOTested,"test4")).to.throw(Error);
            expect(await DAOTested.deleteDevice.bind(DAOTested,"test5")).to.throw(Error);
            expect(await DAOTested.deleteDevice.bind(DAOTested,"test6")).to.throw(Error);
            expect(await DAOTested.deleteDevice.bind(DAOTested,"test7")).to.throw(Error);
            expect(await DAOTested.deleteDevice.bind(DAOTested,"test8")).to.throw(Error);
            expect(await DAOTested.deleteDevice.bind(DAOTested,"test9")).to.throw(Error);
            expect(await DAOTested.deleteDevice.bind(DAOTested,"test10")).to.throw(Error);
            expect(await DAOTested.deleteDevice.bind(DAOTested,"test11")).to.throw(Error);
        });
    });

    describe("Tests on borrowDevice() method",function() {
        it("Booking a device which doesn't exist should throw error",async function(){
            var reservationID = await  DAObooking.getLastId();
            expect(await DAOTested.borrowDevice.bind(DAOTested,"TESTB","ABCDEFG",reservationID.getID()+1)).to.throw(Error);
        });

        it("Borrow a wrong reference device should throw an error",async function(){
            var reservationID = await  DAObooking.getLastId();
            expect(await DAOTested.borrowDevice.bind(DAOTested,"toolongref","ABCDEFG",reservationID.getID()+2)).to.throw(Error);
            expect(await DAOTested.borrowDevice.bind(DAOTested,"ref","ABCDEFG",reservationID.getID()+3)).to.throw(Error);
        });

        it("Booking a device as a invalid user should throw error",async function(){
            var reservationID = await  DAObooking.getLastId();
            expect(await DAOTested.borrowDevice.bind(DAOTested,"AN001","testUserRef",reservationID.getID()+4)).to.throw(Error);
        });
    });    

    describe("Tests on getDevicesByFilter() method",function() {

        it("Research with empty filters should throw error",async function (){
            expect(await DAOTested.getDevicesByFilter.bind(DAOTested,"","",-1,-1)).to.throw("All fields can't be empty");
        });

        it("Checking if all the filters works well",async function(){
            await DAOTested.addDevice.bind(DAOTested,new Device("test1",1,"Test filters","1.0","","0778787878"));

            var result = await DAOTested.getDevicesByFilter("Test filters","",-1,-1);
            result.forEach(function(device){
                assert.equal(device.getName(),"Test filters");
            })

            //Test à modifier selon l'implémentation du code
            var result = await DAOTested.getDevicesByFilter("","test1",-1,-1);
            result.forEach(function(device){
                assert.equal(device.getRef(),"test1");
                //assert.equal(device.getCategory(),1);
            })

            var result = await DAOTested.getDevicesByFilter("","",1,-1);
            result.forEach(function(device){
                assert.isEmpty(device.getLockDays());
            })

            var result = await DAOTested.getDevicesByFilter("","",-1,1);
            result.forEach(function(device){
                assert.equal(device.getName(),"Téléphones");
            })

            await DAOTested.deleteDevice.bind(DAOTested,"test1");
        });
        
    });
 })

