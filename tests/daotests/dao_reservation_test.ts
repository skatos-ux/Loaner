import DAOReservation from '../../src/dao/dao_reservation';
import DAOUser from '../../src/dao/dao_user';
import DAODevice from '../../src/dao/dao_device';

import { assert } from 'chai';

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
            
            var check = false;

            result.forEach(function(booking){
                users.forEach(function(user){
                    //if(booking.getUser()==user.getId()) check = true; //Fix the Id user typer problem to solve it
                });
            });

            assert.isTrue(check);
        });

        it("The devices of a reservation must be registered", async function() {
            const devices = await DAOdevice.getAll();
            
            const result = await DAOTested.historyDevice("AN001");
            
            var check = false;

            result.forEach(function(booking){
                devices.forEach(function(device){
                    if (booking.getDevice().match(device.getRef())) check = true; 
                });
            });

            assert.isTrue(check);
        });

        it("The start date must be earlier than the two others", async function() {
            const result = await DAOTested.historyDevice("AN001");

            result.forEach(function(booking){
               assert.notDeepEqual(booking.getStartDate(),booking.getReturnDate());
               assert.notDeepEqual(booking.getStartDate(), booking.getEndDate());

               assert.isAbove(booking.getReturnDate().getTime(),booking.getStartDate().getTime());
               assert.isAbove(booking.getEndDate().getTime(),booking.getStartDate().getTime());
            });
        });
    });

})