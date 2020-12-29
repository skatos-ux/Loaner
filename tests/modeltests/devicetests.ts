import Device from '../../src/model/device';

import { assert } from 'chai';

const devTested = new Device("test1","Computer","PremierTest","1.0","url","0707070707");

describe("Test on device.ts", function(){

    it("Device Creation test", function() {
        assert.equal(devTested.getRef(),"test1");
        assert.equal(devTested.getCategory(),"Computer");
        assert.equal(devTested.getName(),"PremierTest");
        assert.equal(devTested.getVersion(),"1.0");
        assert.equal(devTested.getPhoto(),"url");
        assert.equal(devTested.getPhone(),"0707070707");
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
});