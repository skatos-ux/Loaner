import request from 'supertest';
import { app } from '../../src/index';

describe('GET /user/all', function() {

    this.beforeAll(() => {
        require("../../create_db.js");
    });

    it('responds with json', function(done) {
        request(app)
            .get('/api/users/all')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200, done);
    });

    it('responds with correct user', function(done) {
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
        require("../../create_db.js");
    });

    it('responds with json', function(done) {
        request(app)
            .get('/api/users/ABCDEFG')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200, done);
    });

    it('responds with correct user', function(done) {
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

    /*this.beforeEach(() => {
        require("../../create_db.js");
    });*/

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
    });

    /*it('reponds error for invalid user value', function(done) {
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