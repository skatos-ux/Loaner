import request from 'supertest';
import { app } from '../../src/server';
import * as helper from './routing_tests_helper';

import createDatabase from '../../util/create_db';

describe('GET /user/all', function() {

    this.beforeAll(async () => {
        await createDatabase();
    });

    helper.checkAllTokens(() => request(app).get('/api/users/all'));

    it('responds with json', function(done) {
        request(app)
            .get('/api/users/all')
            .set('Accept', 'application/json')
            .set("x-access-token", helper.getToken())
            .expect('Content-Type', /json/)
            .expect(200, done);
    });

    it('responds with correct users informations', function(done) {
        request(app)
            .get('/api/users/all')
            .set('Accept', 'application/json')
            .set("x-access-token", helper.getToken())
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

    this.beforeAll(async () => {
        await createDatabase();
    });

    it('responds with json', function(done) {
        request(app)
            .get('/api/users/ABCDEFG')
            .set('Accept', 'application/json')
            .set("x-access-token", helper.getToken())
            .expect('Content-Type', /json/)
            .expect(200, done);
    });

    it('responds with correct user informations', function(done) {
        request(app)
            .get('/api/users/ABCDEFG')
            .set('Accept', 'application/json')
            .set("x-access-token", helper.getToken())
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
            .set("x-access-token", helper.getToken())
            .expect('Content-Type', /json/)
            .expect(400, {
                error: true,
                message: "Cannot find results"
            }, done);
    });

    helper.checkAllTokens(() => request(app).get('/api/users/ABCDEFG'));
});

describe('PUT /user/add', function() {

    this.beforeEach(async () => {
        await createDatabase();
    });

    it('responds error when trying to add user with already existing id', function(done) {
        request(app)
            .put('/api/users/add')
            .set('Content-Type', 'application/json')
            .set("x-access-token", helper.getToken())
            .send({
                id: "ABCDEFG",
                firstName: "Marche",
                lastName: "Pas",
                email: "rien@mail.fr",
                admin: false
            })
            .expect('Content-Type', /json/)
            .expect(400, {
                error: true,
                message: "User with this ID already exists"
            }, done);
    });

    it('responds error for invalid ID', function(done) {
        request(app)
            .put('/api/users/add')
            .set('Content-Type', 'application/json')
            .set("x-access-token", helper.getToken())
            .send({
                id: "INVAL",
                firstName: "Jean",
                lastName: "Dupont",
                email: "jdupont@mail.fr",
                admin: false
            })
            .expect('Content-Type', /json/)
            .expect(400, {
                error: true,
                message: "Invalid ID"
            }, done);
    });

    it('responds error for invalid email', function(done) {
        request(app)
            .put('/api/users/add')
            .set('Content-Type', 'application/json')
            .set("x-access-token", helper.getToken())
            .send({
                id: "TESTTE1",
                firstName: "Jean",
                lastName: "Dupont",
                email: "cecinestpasunmail.correct",
                admin: false
            })
            .expect('Content-Type', /json/)
            .expect(400, {
                error: true,
                message: "Invalid email"
            }, done);
    });

    it('responds error for invalid user with already existing email', function(done) {
        request(app)
            .put('/api/users/add')
            .set('Content-Type', 'application/json')
            .set("x-access-token", helper.getToken())
            .send({
                id: "TESTTE2",
                firstName: "Jean",
                lastName: "Dupont",
                email: "lilianb@mail.fr",
                admin: false
            })
            .expect('Content-Type', /json/)
            .expect(400, {
                error: true,
                message: "User with this email already exists"
            }, done);
    });

    helper.checkAllTokens(() => request(app)
        .put('/api/users/add')
        .set('Content-Type', 'application/json')
        .send({
            id: "TESTTE3",
            firstName: "Jean",
            lastName: "Dupont",
            email: "jdupont@mail.fr",
            admin: false
        }));

    it('user creation works', function(done) {
        request(app)
            .put('/api/users/add')
            .set('Content-Type', 'application/json')
            .set("x-access-token", helper.getToken())
            .send({
                id: "TESTTE3",
                firstName: "Jean",
                lastName: "Dupont",
                email: "jdupont@mail.fr",
                admin: false
            })
            .expect('Content-Type', /json/)
            .expect(201, () => {
                request(app)
                    .get('/api/users/TESTTE3')
                    .set('Accept', 'application/json')
                    .set("x-access-token", helper.getToken())
                    .expect('Content-Type', /json/)
                    .expect(200, {
                        id: "TESTTE3",
                        firstName: "Jean",
                        lastName: "Dupont",
                        email: "jdupont@mail.fr",
                        admin: false,
                        temporaryPassword: true
                    }, done);
            });
    });
});

describe('POST /user/modify', function() {

    this.beforeEach(async () => {
        await createDatabase();
    });

    it('responds error for invalid user ID', function(done) {
        request(app)
            .post('/api/users/modify')
            .set('Content-Type', 'application/json')
            .set("x-access-token", helper.getToken())
            .send({
                id: "INVALID",
                firstName: "Jean",
                lastName: "Dupont",
                email: "jdupont@mail.fr",
                admin: false
            })
            .expect('Content-Type', /json/)
            .expect(400, {
                error: true,
                message: "User with this ID doesn't exists"
            }, done);
    });

    it('responds error for invalid user with already existing email', function(done) {
        request(app)
            .post('/api/users/modify')
            .set('Content-Type', 'application/json')
            .set("x-access-token", helper.getToken())
            .send({
                id: "HIJKLMN",
                firstName: "Jean",
                lastName: "Dupont",
                email: "lilianb@mail.fr",
                admin: false
            })
            .expect('Content-Type', /json/)
            .expect(400, {
                error: true,
                message: "User with this email already exists"
            }, done);
    });

    helper.checkAllTokens(() => request(app)
        .post('/api/users/modify')
        .set('Content-Type', 'application/json')
        .send({
            id: "HIJKLMN",
            firstName: "M",
            lastName: "P",
            email: "psqrm@mail.fr",
            admin: false
        }));

    it('user modification works', function(done) {
        request(app)
            .post('/api/users/modify')
            .set('Content-Type', 'application/json')
            .set("x-access-token", helper.getToken())
            .send({
                id: "HIJKLMN",
                firstName: "M",
                lastName: "P",
                email: "psqrm@mail.fr",
                admin: false
            })
            .expect('Content-Type', /json/)
            .expect(201, () => {
                request(app)
                    .get('/api/users/HIJKLMN')
                    .set('Accept', 'application/json')
                    .set("x-access-token", helper.getToken())
                    .expect('Content-Type', /json/)
                    .expect(200, {
                        id: "HIJKLMN",
                        firstName: "M",
                        lastName: "P",
                        email: "psqrm@mail.fr",
                        admin: false,
                        temporaryPassword: false
                    }, done);
            });
    });

});

describe('DELETE /user/delete/:userId', function() {

    this.beforeEach(async () => {
        await createDatabase();
    });

    it('responds error with invalid user id', function(done) {
        request(app)
            .delete('/api/users/delete/INVALID')
            .set('Accept', 'application/json')
            .set("x-access-token", helper.getToken())
            .expect('Content-Type', /json/)
            .expect(400, {
                error: true,
                message: "User with this ID doesn't exists"
            }, done);
    });

    helper.checkAllTokens(() => request(app)
        .delete('/api/users/delete/HIJKLMN'));

    it('user deletion works', function(done) {
        request(app)
            .delete('/api/users/delete/HIJKLMN')
            .set('Accept', 'application/json')
            .set("x-access-token", helper.getToken())
            .expect('Content-Type', /json/)
            .expect(201, () => {
                request(app)
                    .get('/api/users/HIJKLMN')
                    .set('Accept', 'application/json')
                    .set("x-access-token", helper.getToken())
                    .expect('Content-Type', /json/)
                    .expect(400, {
                        error: true,
                        message: "Cannot find results"
                    }, done);
            });
    });
});

describe('GET /user/:userId/history', function() {

    this.beforeEach(async () => {
        await createDatabase();
    });

    it('responds error with invalid user id', function(done) {
        request(app)
            .get('/api/users/INVALID/history')
            .set('Accept', 'application/json')
            .set("x-access-token", helper.getToken())
            .expect('Content-Type', /json/)
            .expect(400, {
                error: true,
                message: "User with this ID doesn't exists"
            }, done);
    });

    helper.checkAllTokens(() => request(app)
        .get('/api/users/HIJKLMN/history'));

    it('user history works', function(done) {
        request(app)
            .get('/api/users/ABCDEFG/history')
            .set('Accept', 'application/json')
            .set("x-access-token", helper.getToken())
            .expect('Content-Type', /json/)
            .expect(200, [{
                ID: 2,
                endDate: "2021-01-12",
                idUser: "ABCDEFG",
                refDevice: "PC001",
                returnDate: "2021-02-04",
                startDate: "2021-01-04"
            }], done);
    });
});