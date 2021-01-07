import request from 'supertest';
import { app } from '../../src/index';
import * as helper from './routing_tests_helper';
import { expect } from 'chai';

import createDatabase from '../../util/create_db';

describe('GET /devices/all', function() {

    this.beforeAll(async () => {
        await createDatabase();
    });

    it('responds with json', function(done) {
        request(app)
            .get('/api/devices/all')
            .set('Accept', 'application/json')
            .set("x-access-token", helper.getToken())
            .expect('Content-Type', /json/)
            .expect(200, done);
    });

    helper.checkAllTokens(() => request(app).get('/api/devices/all'), false);

    it('responds with correct devices informations', function(done) {
        request(app)
            .get('/api/devices/all')
            .set('Accept', 'application/json')
            .set("x-access-token", helper.getToken())
            .expect('Content-Type', /json/)
            .expect(200)
            .expect(function(res) {
                expect(res.body).to.deep.equal([{
                    ID: 1,
                    name: "Téléphones",
                    devices: [{
                            ref: "AN001",
                            categoryID: 1,
                            categoryName: "Téléphones",
                            name: "Samsung Galaxy S1000",
                            version: "1.0",
                            photo: "https://media.ldlc.com/r1600/ld/products/00/05/30/35/LD0005303584_2.jpg",
                            phone: "0123456789",
                            lockDays: [
                                ["2021-01-05", "2021-01-08"],
                                ["2021-01-07", "2021-02-08"]
                            ]
                        }, {
                            ref: "AN002",
                            categoryID: 1,
                            categoryName: "Téléphones",
                            name: "Huawei P80",
                            version: "1.1",
                            photo: "https://media.ldlc.com/r1600/ld/products/00/05/39/99/LD0005399909_2.jpg",
                            phone: "1234567890",
                            lockDays: []
                    }]
                }, {
                    ID: 2,
                    name: "Ordinateurs",
                    devices: [{
                        ref: "PC001",
                        categoryID: 2,
                        categoryName: "Ordinateurs",
                        name: "Acer Pro Max",
                        version: "1.0",
                        photo: "https://static.acer.com/up/Resource/Acer/Laptops/Spin_5/Image/20180824/acer-Spin_5_SP513-53N-main.png",
                        phone: "",
                        lockDays: [
                            ["2021-01-04", "2021-02-04"]
                        ]
                    }]
                }, {
                    ID: 3,
                    name: "Tablettes",
                    devices: []
                }]);
            })
            .end(done);
    });
});

describe('GET /devices/:device_ref', function() {

    this.beforeAll(async () => {
        await createDatabase();
    });

    it('responds with json', function(done) {
        request(app)
            .get('/api/devices/AN001')
            .set('Accept', 'application/json')
            .set("x-access-token", helper.getToken())
            .expect('Content-Type', /json/)
            .expect(200, done);
    });

    it('responds error when device reference is invalid', function(done) {
        request(app)
            .get('/api/devices/PASBON')
            .set('Accept', 'application/json')
            .set("x-access-token", helper.getToken())
            .expect('Content-Type', /json/)
            .expect(400, {
                error: true,
                message: "Invalid device reference"
            }, done);
    });

    helper.checkAllTokens(() => request(app).get('/api/devices/AN001'), false);

    it('responds with correct devices informations', function(done) {
        request(app)
            .get('/api/devices/AN001')
            .set('Accept', 'application/json')
            .set("x-access-token", helper.getToken())
            .expect('Content-Type', /json/)
            .expect(200)
            .expect(function(res) {
                expect(res.body).to.deep.equal({
                    ref: "AN001",
                    categoryID: 1,
                    categoryName: "Téléphones",
                    name: "Samsung Galaxy S1000",
                    version: "1.0",
                    photo: "https://media.ldlc.com/r1600/ld/products/00/05/30/35/LD0005303584_2.jpg",
                    phone: "0123456789",
                    lockDays: [
                        ["2021-01-05", "2021-01-08"],
                        ["2021-01-07", "2021-02-08"]
                    ]
                });
            })
            .end(done);
    });
});

describe('GET /devices/all?filter_name=filter_value&...', function() {

    this.beforeAll(async () => {
        await createDatabase();
    });

    it('responds nothing when device reference is invalid', function(done) {
        request(app)
            .get('/api/devices/all?ref=PABON')
            .set('Accept', 'application/json')
            .set("x-access-token", helper.getToken())
            .expect('Content-Type', /json/)
            .expect(200)
            .expect(function(res) {
                expect(res.body).to.deep.equal([{
                    ID: 1,
                    name: "Téléphones",
                    devices: []
                }, {
                    ID: 2,
                    name: "Ordinateurs",
                    devices: []
                }, {
                    ID: 3,
                    name: "Tablettes",
                    devices: []
                }]);
            })
            .end(done);
    });

    it('responds nothing when device name is invalid', function(done) {
        request(app)
            .get('/api/devices/all?name=PABON')
            .set('Accept', 'application/json')
            .set("x-access-token", helper.getToken())
            .expect('Content-Type', /json/)
            .expect(200)
            .expect(function(res) {
                expect(res.body).to.deep.equal([{
                    ID: 1,
                    name: "Téléphones",
                    devices: []
                }, {
                    ID: 2,
                    name: "Ordinateurs",
                    devices: []
                }, {
                    ID: 3,
                    name: "Tablettes",
                    devices: []
                }]);
            })
            .end(done);
    });

    it('responds error when device category is invalid', function(done) {
        request(app)
            .get('/api/devices/all?category=PABON')
            .set('Accept', 'application/json')
            .set("x-access-token", helper.getToken())
            .expect('Content-Type', /json/)
            .expect(400, {
                error: true,
                message: "Invalid category name"
            }, done);
    });

    helper.checkAllTokens(() => request(app).get('/api/devices/all?ref=AN001'), false);

    it('responds with correct devices informations with ref only', function(done) {
        request(app)
            .get('/api/devices/all?ref=AN001')
            .set('Accept', 'application/json')
            .set("x-access-token", helper.getToken())
            .expect('Content-Type', /json/)
            .expect(200)
            .expect(function(res) {
                expect(res.body).to.deep.equal([{
                    ID: 1,
                    name: "Téléphones",
                    devices: [{
                        ref: "AN001",
                        categoryID: 1,
                        categoryName: "Téléphones",
                        name: "Samsung Galaxy S1000",
                        version: "1.0",
                        photo: "https://media.ldlc.com/r1600/ld/products/00/05/30/35/LD0005303584_2.jpg",
                        phone: "0123456789",
                        lockDays: [
                            ["2021-01-05", "2021-01-08"],
                            ["2021-01-07", "2021-02-08"]
                        ]
                    }]
                }, {
                    ID: 2,
                    name: "Ordinateurs",
                    devices: []
                }, {
                    ID: 3,
                    name: "Tablettes",
                    devices: []
                }]);
            })
            .end(done);
    });

    it('responds with correct devices informations with name only', function(done) {
        request(app)
            .get('/api/devices/all?name=Samsung Galaxy S1000')
            .set('Accept', 'application/json')
            .set("x-access-token", helper.getToken())
            .expect('Content-Type', /json/)
            .expect(200)
            .expect(function(res) {
                expect(res.body).to.deep.equal([{
                    ID: 1,
                    name: "Téléphones",
                    devices: [{
                        ref: "AN001",
                        categoryID: 1,
                        categoryName: "Téléphones",
                        name: "Samsung Galaxy S1000",
                        version: "1.0",
                        photo: "https://media.ldlc.com/r1600/ld/products/00/05/30/35/LD0005303584_2.jpg",
                        phone: "0123456789",
                        lockDays: [
                            ["2021-01-05", "2021-01-08"],
                            ["2021-01-07", "2021-02-08"]
                        ]
                    }]
                    }, {
                        ID: 2,
                        name: "Ordinateurs",
                        devices: []
                    }, {
                        ID: 3,
                        name: "Tablettes",
                        devices: []
                    }]);
            })
            .end(done);
    });

    it('responds with correct devices informations with category only', function(done) {
        request(app)
            .get('/api/devices/all?category=Ordinateurs')
            .set('Accept', 'application/json')
            .set("x-access-token", helper.getToken())
            .expect('Content-Type', /json/)
            .expect(200)
            .expect(function(res) {
                expect(res.body).to.deep.equal([{
                    ID: 1,
                    name: "Téléphones",
                    devices: []
                }, {
                    ID: 2,
                    name: "Ordinateurs",
                    devices: [{
                        ref: "PC001",
                        categoryID: 2,
                        categoryName: "Ordinateurs",
                        name: "Acer Pro Max",
                        version: "1.0",
                        photo: "https://static.acer.com/up/Resource/Acer/Laptops/Spin_5/Image/20180824/acer-Spin_5_SP513-53N-main.png",
                        phone: "",
                        lockDays: [["2021-01-04", "2021-02-04"]]
                    }]
                }, {
                    ID: 3,
                    name: "Tablettes",
                    devices: []
                }]);
            })
            .end(done);
    });

    it('responds with correct devices informations with all filters', function(done) {
        request(app)
            .get('/api/devices/all?ref=PC001&name=Acer Pro Max&category=Ordinateurs')
            .set('Accept', 'application/json')
            .set("x-access-token", helper.getToken())
            .expect('Content-Type', /json/)
            .expect(200)
            .expect(function(res) {
                expect(res.body).to.deep.equal([{
                    ID: 1,
                    name: "Téléphones",
                    devices: []
                }, {
                    ID: 2,
                    name: "Ordinateurs",
                    devices: [{
                        ref: "PC001",
                        categoryID: 2,
                        categoryName: "Ordinateurs",
                        name: "Acer Pro Max",
                        version: "1.0",
                        photo: "https://static.acer.com/up/Resource/Acer/Laptops/Spin_5/Image/20180824/acer-Spin_5_SP513-53N-main.png",
                        phone: "",
                        lockDays: [["2021-01-04", "2021-02-04"]]
                    }]
                }, {
                    ID: 3,
                    name: "Tablettes",
                    devices: []
                }]);
            })
            .end(done);
    });
});

describe('POST /devices/:id_materiel/borrow/:id_utilisateur', function() {

    this.beforeEach(async () => {
        await createDatabase();
    });

    it('responds error when startDate is after endDate', function(done) {
        request(app)
            .post('/api/devices/AN001/borrow/ABCDEFG')
            .set('Accept', 'application/json')
            .set('Content-Type', 'application/json')
            .set("x-access-token", helper.getToken())
            .send({
                loanDays: ["2021-02-30", "2021-02-15"]
            })
            .expect('Content-Type', /json/)
            .expect(400, {
                error: true,
                message: "Invalid startDate or endDate"
            }, done);
    });

    it('responds error when no loanDays are given', function(done) {
        request(app)
            .post('/api/devices/AN001/borrow/ABCDEFG')
            .set('Accept', 'application/json')
            .set("x-access-token", helper.getToken())
            .expect('Content-Type', /json/)
            .expect(400, {
                error: true,
                message: "No loanDays given"
            }, done);
    });

    it('responds error when loanDays is not an array', function(done) {
        request(app)
            .post('/api/devices/AN001/borrow/ABCDEFG')
            .set('Accept', 'application/json')
            .set('Content-Type', 'application/json')
            .set("x-access-token", helper.getToken())
            .send({
                loanDays: 67
            })
            .expect('Content-Type', /json/)
            .expect(400, {
                error: true,
                message: "Invalid loanDays"
            }, done);
    });

    it('responds error when less than two loanDays are given', function(done) {
        request(app)
            .post('/api/devices/AN001/borrow/ABCDEFG')
            .set('Accept', 'application/json')
            .set('Content-Type', 'application/json')
            .set("x-access-token", helper.getToken())
            .send({
                loanDays: ["2020-04-12"]
            })
            .expect('Content-Type', /json/)
            .expect(400, {
                error: true,
                message: "Invalid loanDays count"
            }, done);
    });

    it('responds error when more than two loanDays are given', function(done) {
        request(app)
            .post('/api/devices/AN001/borrow/ABCDEFG')
            .set('Accept', 'application/json')
            .set('Content-Type', 'application/json')
            .set("x-access-token", helper.getToken())
            .send({
                loanDays: ["2020-04-12", "2020-04-14", "2020-04-16"]
            })
            .expect('Content-Type', /json/)
            .expect(400, {
                error: true,
                message: "Invalid loanDays count"
            }, done);
    });

    it('responds error when there already is a reservation in the given period', function(done) {
        request(app)
            .post('/api/devices/AN001/borrow/ABCDEFG')
            .set('Accept', 'application/json')
            .set('Content-Type', 'application/json')
            .set("x-access-token", helper.getToken())
            .send({
                loanDays: ["2021-01-02", "2021-01-15"]
            })
            .expect('Content-Type', /json/)
            .expect(400, {
                error: true,
                message: "Reservation already exists"
            }, done);
    });

    it('responds error when one date is invalid', function(done) {
        request(app)
            .post('/api/devices/AN001/borrow/ABCDEFG')
            .set('Accept', 'application/json')
            .set('Content-Type', 'application/json')
            .set("x-access-token", helper.getToken())
            .send({
                loanDays: ["01-s", "2021-01-15"]
            })
            .expect('Content-Type', /json/)
            .expect(400, {
                error: true,
                message: "Invalid startDate or endDate"
            }, done);
    });

    const testFunc = (userId: string) => request(app)
        .post('/api/devices/AN001/borrow/' + userId)
        .set('Content-Type', 'application/json')
        .send({
            loanDays: ["2021-02-05", "2021-02-15"]
        });

    helper.checkAllTokens(() => { return testFunc("ABCDEFG"); }, false);
    helper.checkUserToken(testFunc("HIJKLM"));

    it('borrow devices works', function(done) {
        request(app)
            .post('/api/devices/AN001/borrow/ABCDEFG')
            .set('Accept', 'application/json')
            .set('Content-Type', 'application/json')
            .set("x-access-token", helper.getToken())
            .send({
                loanDays: ["2021-05-05", "2021-05-15"]
            })
            .expect('Content-Type', /json/)
            .expect(201, done);
    });
});


describe('PUT /devices/add/', function() {

    this.beforeEach(async () => {
        await createDatabase();
    });

    it('responds error when category name is invalid', function(done) {
        request(app)
            .put('/api/devices/add')
            .set('Accept', 'application/json')
            .set('Content-Type', 'application/json')
            .set("x-access-token", helper.getToken())
            .send({
                ref: "AN003",
                name: "Honor 10",
                category: "EXISTEPAS",
                version: "1.0",
                photo: "",
                phone: "+33606060606"
            })
            .expect(400, {
                error: true,
                message: "Invalid category name"
            }, done);
    });

    it('responds error when reference is invalid', function(done) {
        request(app)
            .put('/api/devices/add')
            .set('Accept', 'application/json')
            .set('Content-Type', 'application/json')
            .set("x-access-token", helper.getToken())
            .send({
                ref: "PASVALIDE",
                name: "Honor 10",
                category: "Téléphones",
                version: "1.0",
                photo: "",
                phone: "+33606060606"
            })
            .expect(400, {
                error: true,
                message: "Invalid reference"
            }, done);
    });

    it('responds error when reference is missing', function(done) {
        request(app)
            .put('/api/devices/add')
            .set('Accept', 'application/json')
            .set('Content-Type', 'application/json')
            .set("x-access-token", helper.getToken())
            .send({
                name: "Honor 10",
                category: "Téléphones",
                version: "1.0",
                photo: "",
                phone: "+33606060606"
            })
            .expect(400, {
                error: true,
                message: "Missing reference"
            }, done);
    });

    it('responds error when category is missing', function(done) {
        request(app)
            .put('/api/devices/add')
            .set('Accept', 'application/json')
            .set('Content-Type', 'application/json')
            .set("x-access-token", helper.getToken())
            .send({
                ref: "AN003",
                name: "Honor 10",
                version: "1.0",
                photo: "",
                phone: "+33606060606"
            })
            .expect(400, {
                error: true,
                message: "Missing category name"
            }, done);
    });

    it('responds error when reference already exists', function(done) {
        request(app)
            .put('/api/devices/add')
            .set('Accept', 'application/json')
            .set('Content-Type', 'application/json')
            .set("x-access-token", helper.getToken())
            .send({
                ref: "AN001",
                name: "Honor 10",
                category: "Téléphones",
                version: "1.0",
                photo: "",
                phone: "+33606060606"
            })
            .expect(400, {
                error: true,
                message: "Device reference is already used"
            }, done);
    });

    helper.checkAllTokens(() => request(app)
        .put('/api/devices/add')
        .set('Content-Type', 'application/json')
        .send({
            ref: "AN003",
            name: "Honor 10",
            category: "Téléphones",
            version: "1.0",
            photo: "",
            phone: "+33606060606"
        }));

    it('adding device works', function(done) {
        request(app)
            .put('/api/devices/add')
            .set('Accept', 'application/json')
            .set('Content-Type', 'application/json')
            .set("x-access-token", helper.getToken())
            .send({
                ref: "AN003",
                name: "Honor 10",
                category: "Téléphones",
                version: "1.0",
                photo: "",
                phone: "+33606060606"
            })
            .expect(201, done);
    });
});

// Test à faire si implémenté : /devices/modify/

describe('DELETE /devices/delete/:device_id', function() {

    this.beforeEach(async () => {
        await createDatabase();
    });

    it('responds error when device reference is invalid', function(done) {
        request(app)
            .delete('/api/devices/delete/PASVALID')
            .set('Accept', 'application/json')
            .set("x-access-token", helper.getToken())
            .expect(400, {
                error: true,
                message: "Invalid device reference"
            }, done);
    });

    helper.checkAllTokens(() => request(app).delete('/api/devices/delete/AN001'));

    it('deleting a device works', function(done) {
        request(app)
            .delete('/api/devices/delete/AN001')
            .set("x-access-token", helper.getToken())
            .expect(201, done);
    });

});