import DAOReservation from '../../src/dao/dao_reservation';
import DAOUser from '../../src/dao/dao_user';
import DAODevice from '../../src/dao/dao_device';

import * as chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import Reservation from '../../src/model/reservation';
const assert = chai.assert;
const expect = chai.expect;

chai.use(chaiAsPromised);

const DAOTested = new DAOReservation();
const DAOuser = new DAOUser();
const DAOdevice = new DAODevice();

describe("Tests on dao_reservation.ts", function(){

    describe("Tests on getLastid() method",function(){

        it("The Id must be positive", async function(){
            const result = await DAOTested.getLastId();
            assert.isAbove(result.getID(),0)
        })
        
    });

    //Lack of booking to tests in the database
    describe("Tests on historyDevice() method", function(){

        it("The users of a reservation must be registered", async function() {
            const users = await DAOuser.getAll();
            
            const result = await DAOTested.historyDevice("AN001");
            
            let check = false;

            result.forEach(function(booking){
                users.forEach(function(user){
                    if(booking.getUser()==user.getId()) check = true; 
                });
            });

            assert.isTrue(check);
        });

        it("The devices of a reservation must be registered", async function() {
            const devices = await DAOdevice.getAll();
            
            const result = await DAOTested.historyDevice("AN001");
            
            let check = false;

            result.forEach(function(booking){
                devices.forEach(function(device){
                    if (booking.getDevice().match(device.getRef())) check = true; 
                });
            });

            assert.isTrue(check);
        });

        it("The start date must be earlier than the two others", async function() {
            const result = await DAOTested.historyDevice("AN002");

            result.forEach(function(booking){
               assert.notDeepEqual(booking.getStartDate(),booking.getReturnDate());
               assert.notDeepEqual(booking.getStartDate(), booking.getEndDate());

               assert.isAbove(booking.getReturnDate().getTime(),booking.getStartDate().getTime());
               assert.isAbove(booking.getEndDate().getTime(),booking.getStartDate().getTime());
            });
        });

    });
        
    
    describe("Tests on getUserHistory() method",function(){

            it("The result type must be an array", async function(){
                const result = await DAOTested.getUserHistory("HIJKLMN");
                assert.isTrue(Array.isArray(result));
            })

            it("The id reservation must be positive", async function(){
                const result = await DAOTested.getUserHistory("HIJKLMN");
                result.forEach((reservation : Reservation) => {
                    assert.isAbove(reservation.getID(),0);
                })
            })

            it("The start date must be earlier than the two others",async function(){
                const result = await DAOTested.getUserHistory("ABCDEFG");

               result.forEach(function(booking){
                    assert.notDeepEqual(booking.getStartDate(),booking.getReturnDate());
                    assert.notDeepEqual(booking.getStartDate(), booking.getEndDate());

                    if(!booking.getReturnDate()) {
                        assert.isAbove(booking.getReturnDate().getTime(),booking.getStartDate().getTime());
                    }

                    assert.isAbove(booking.getEndDate().getTime(),booking.getStartDate().getTime());

               });
            });
            
    });

    describe("Tests on getAllReservationsDevice() method",function(){

        it("The result type must be an array", async function(){
            const result = await DAOTested.getAllReservationsDevice("AN002");
            assert.isTrue(Array.isArray(result));
        })

        it("The id reservation must be positive", async function(){
            const result = await DAOTested.getAllReservationsDevice("AN002");
            result.forEach((reservation : Reservation) => {
                assert.isAbove(reservation.getID(),0);
            })
        })

        it("The start date must be earlier than the two others",async function(){
            const result = await DAOTested.getAllReservationsDevice("AN002");

           result.forEach(function(booking){
            assert.notDeepEqual(booking.getStartDate(),booking.getReturnDate());
            assert.notDeepEqual(booking.getStartDate(), booking.getEndDate());

            assert.isAbove(booking.getReturnDate().getTime(),booking.getStartDate().getTime());
            assert.isAbove(booking.getEndDate().getTime(),booking.getStartDate().getTime());
           });
        });
    });
    
    describe("Tests on hasReservationWithInfos() method", function(){

        // En JavaScript, les mois commencent par 0 et non par 1
        it("An existing reservation must be seen in the database",async function(){
            const result = await DAOTested.hasReservationWithInfos("AN001", new Date(2021, 0, 5), new Date(2021, 0, 8));
            expect(result).to.be.true;
        });

        it("An inexisting reservation must not appear in the database",async function(){
            
            expect(await DAOTested.hasReservationWithInfos("AN003", new Date(2021, 0, 5), new Date(2021, 0, 8))).to.be.false;
            expect(await DAOTested.hasReservationWithInfos("AN001", new Date(2021, 0, 1), new Date(2021, 0, 4))).to.be.false;
            expect(await DAOTested.hasReservationWithInfos("AN001", new Date(2021, 1, 9), new Date(2021, 1, 20))).to.be.false;
            expect(await DAOTested.hasReservationWithInfos("AN003", new Date(2021, 0, 6), new Date(2021, 0, 8))).to.be.false;
            expect(await DAOTested.hasReservationWithInfos("AN003", new Date(2021, 0, 5), new Date(2021, 1, 12))).to.be.false;
            expect(await DAOTested.hasReservationWithInfos("AN003", new Date(2021, 2, 27), new Date(2021, 0, 8))).to.be.false;
        });
    });
});