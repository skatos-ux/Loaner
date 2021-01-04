import request from 'supertest';

import { app } from '../../src/index';

//import createDatabase from '../../util/create_db';
const createDatabase = require('../../util/create_db');

// TODO pour tous : Vérifier si le token est valide + est celui d'un admin

describe('GET /user/all', function() {

    this.beforeAll(() => {
        createDatabase();
    });

    it('responds with json', function(done) {
        request(app)
            .get('/api/users/all')
            .set('Accept', 'application/json')
            //.set("x-access-token", TOKEN)
            .expect('Content-Type', /json/)
            .expect(200, done);
    });

    it('responds with correct users informations', function(done) {
        request(app)
            .get('/api/users/all')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200, [{
                id: "ABCDEFG",
                firstName: "Lilian",
                lastName: "Bethus",
                email: "lilianb@mail.fr",
                admin: true,
                temporaryPassword: false
            },
            {
                id: "HIJKLMN",
                firstName: "Milan",
                lastName: "Pasquereau",
                email: "mpsqr@mail.fr",
                admin: false,
                temporaryPassword: false
            }], done);
    });
});

describe('GET /user/:userId', function() {

    this.beforeAll(() => {
        createDatabase();
    });

    it('responds with json', function(done) {
        request(app)
            .get('/api/users/ABCDEFG')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200, done);
    });

    it('responds with correct user informations', function(done) {
        request(app)
            .get('/api/users/ABCDEFG')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200, {
                id: "ABCDEFG",
                firstName: "Lilian",
                lastName: "Bethus",
                email: "lilianb@mail.fr",
                admin: true,
                temporaryPassword: false
            }, done);
    });

    it('responds error for invalid ID', function(done) {
        request(app)
            .get('/api/users/invalid')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(400, {
                error: true,
                message: "Cannot find results"
            }, done);
    });
});

describe('PUT /user/add', function() {

    this.beforeEach(() => {
        createDatabase();
    });

    it('user creation works', function(done) {
        request(app)
            .put('/api/users/add')
            .set('Content-Type', 'application/json')
            .send({
                id: "TESTTES",
                firstName: "Jean",
                lastName: "Dupont",
                email: "jdupont@mail.fr",
                admin: false,
                temporaryPassword: false
            })
            .expect('Content-Type', /json/)
            .expect(201, done);

            // TODO : Vérifier la création
    });

    /*it('reponds error for invalid values', function(done) {
        request(app)
            .put('/api/users/add')
            .set('Content-Type', 'application/json')
            .send({
                id: "INVAL",
                firstName: "Jean",
                lastName: "Dupont",
                email: "jdupont@mail.fr",
                admin: false,
                temporaryPassword: false
            })
            .expect('Content-Type', /json/)
            .expect(400, {
                error: true,
                message: "Invalid ID"
            }, done);
    });*/

    it('reponds error for invalid user with already existing email', function(done) {
        request(app)
            .put('/api/users/add')
            .set('Content-Type', 'application/json')
            .send({
                id: "TESTTES",
                firstName: "Jean",
                lastName: "Dupont",
                email: "lilianb@mail.fr",
                admin: false,
                temporaryPassword: false
            })
            .expect('Content-Type', /json/)
            .expect(400, {
                error: true,
                message: "User with this email already exists"
            }, done);
    });
});

describe('POST /user/modify', function() {

    this.beforeEach(() => {
        createDatabase();
    });

    it('user modification works', function(done) {
        request(app)
            .post('/api/users/modify')
            .set('Content-Type', 'application/json')
            .send({
                id: "HIJKLMN",
                firstName: "M",
                lastName: "P",
                email: "psqrm@mail.fr",
                admin: false,
                temporaryPassword: false
            })
            .expect('Content-Type', /json/)
            .expect(201, done);
        
            // TODO : Vérifier la modification
    });

    /*it('reponds error for invalid user ID', function(done) {
        request(app)
            .post('/api/users/modify')
            .set('Content-Type', 'application/json')
            .send({
                id: "INVALID",
                firstName: "Jean",
                lastName: "Dupont",
                email: "jdupont@mail.fr",
                admin: false,
                temporaryPassword: false
            })
            .expect('Content-Type', /json/)
            .expect(400, {
                error: true,
                message: "User with this email already exists"
            }, done);
    });*/

    /*it('reponds error for invalid values', function(done) {
        request(app)
            .post('/api/users/modify')
            .set('Content-Type', 'application/json')
            .send({
                id: "INVAL",
                firstName: "Jean",
                lastName: "Dupont",
                email: "jdupont@mail.fr",
                admin: false,
                temporaryPassword: false
            })
            .expect('Content-Type', /json/)
            .expect(400, {
                error: true,
                message: "Invalid ID"
            }, done);
    });*/

    /*it('reponds error for invalid user with already existing email', function(done) {
        request(app)
            .post('/api/users/modify')
            .set('Content-Type', 'application/json')
            .send({
                id: "TESTTES",
                firstName: "Jean",
                lastName: "Dupont",
                email: "lilianb@mail.fr",
                admin: false,
                temporaryPassword: false
            })
            .expect('Content-Type', /json/)
            .expect(400, {
                error: true,
                message: "User with this email already exists"
            }, done);
    });*/

});

describe('DELETE /user/delete/:userId', function() {

    this.beforeEach(() => {
        createDatabase();
    });

    it('user deletion works', function(done) {
        request(app)
            .delete('/api/users/delete/HIJKLMN')
            .expect('Content-Type', /json/)
            .expect(201, done);

        // TODO : Vérifier la suppression
    });

    /*it('responds error with invalid user id', function(done) {
        request(app)
            .delete('/api/users/delete/INVALID')
            .expect('Content-Type', /json/)
            .expect(400, {
                error: true,
                message: "Cannot find results"
            }, done);
    });*/
});

describe('GET /user/:userId/history', function() {

    this.beforeEach(() => {
        createDatabase();
    });

    it('user history works', function(done) {
        request(app)
            .get('/api/users/HIJKLMN/history')
            .expect('Content-Type', /json/)
            .expect(200, [], done);
    });

    /*it('responds error with invalid user id', function(done) {
        request(app)
            .get('/api/users/HIJKLMN/history')
            .expect('Content-Type', /json/)
            .expect(400, {
                error: true,
                message: "Cannot find results"
            }, done);
    });*/
});