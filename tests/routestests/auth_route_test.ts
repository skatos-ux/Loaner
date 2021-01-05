import request from 'supertest';
import * as jwt from 'jsonwebtoken';

import { app } from '../../src/index';
import * as helper from './routing_tests_helper';
import * as config from '../../config.json';

const createDatabase = require('../../util/create_db');

describe('POST /auth/login', function() {
    this.beforeAll(() => {
        createDatabase();
    });

    it('authentification works', function(done) {
        request(app)
            .post('/api/auth/login')
            .set('Accept', 'application/json')
            .set('Content-Type', 'application/json')
            .send({
                email: "lilianb@mail.fr",
                password: "fromage"
            })
            .expect('Content-Type', /json/)
            .expect(200)
            .expect(function(res) {
                if(!res.body.auth) throw new Error("No field 'auth' specified");
                if(!res.body.token || res.body.token.length == 0) throw new Error("Empty token returned");
                if(!res.body.user || res.body.user.id !== "ABCDEFG") throw new Error("Invalid user returned");
                const token: string = res.body.token?.toString() || "";
                const decoded: any = jwt.verify(token, config.jwtSecret);
                const id: string = decoded['id'] || "";
                if(!decoded || id != "ABCDEFG") throw new Error("Invalid token");
            })
            .end(done);
    });

    it('responds error when already have a token', function(done) {
        request(app)
            .post('/api/auth/login')
            .set('Accept', 'application/json')
            .set('Content-Type', 'application/json')
            .set("x-access-token", helper.getToken())
            .send({
                email: "lilianb@mail.fr",
                password: "fromage"
            })
            .expect('Content-Type', /json/)
            .expect(400, {
                error: true,
                message: "You already have a token"
            }, done);
    });

    it('responds error when email is invalid', function(done) {
        request(app)
            .post('/api/auth/login')
            .set('Accept', 'application/json')
            .set('Content-Type', 'application/json')
            .send({
                email: "paslabonneadresse@mail.fr",
                password: "fromage"
            })
            .expect('Content-Type', /json/)
            .expect(400, {
                error: true,
                message: "Invalid name or password"
            }, done);
    });

    it('responds error when password is invalid', function(done) {
        request(app)
            .post('/api/auth/login')
            .set('Accept', 'application/json')
            .set('Content-Type', 'application/json')
            .send({
                email: "lilianb@mail.fr",
                password: "paslebonmdp"
            })
            .expect('Content-Type', /json/)
            .expect(400, {
                error: true,
                message: "Invalid name or password"
            }, done);
    });
});

describe('POST /auth/password/change', function() {

    this.beforeEach(() => {
        createDatabase();
    });

    it('responds error if new password is empty', function(done) {
        request(app)
            .post('/api/auth/password/change')
            .set('Accept', 'application/json')
            .set('Content-Type', 'application/json')
            .send({
                email: "lilianb@mail.fr",
                oldPassword: "fromage",
                newPassword: ""
            })
            .expect('Content-Type', /json/)
            .expect(400, {
                error: true,
                message: "New password can't be empty"
            }, done);
    });

    it('responds error if old password is incorrect', function(done) {
        request(app)
            .post('/api/auth/password/change')
            .set('Accept', 'application/json')
            .set('Content-Type', 'application/json')
            .send({
                email: "lilianb@mail.fr",
                oldPassword: "paslebon",
                newPassword: "salade"
            })
            .expect('Content-Type', /json/)
            .expect(400, {
                error: true,
                message: "Invalid name or old password"
            }, done);
    });

    it('responds error if email is incorrect', function(done) {
        request(app)
            .post('/api/auth/password/change')
            .set('Accept', 'application/json')
            .set('Content-Type', 'application/json')
            .send({
                email: "paslebon@mail.fr",
                oldPassword: "fromage",
                newPassword: "salade"
            })
            .expect('Content-Type', /json/)
            .expect(400, {
                error: true,
                message: "Invalid name or old password"
            }, done);
    });

    helper.checkNoToken(request(app)
        .post('/api/auth/password/change')
        .set('Content-Type', 'application/json')
        .send({
            email: "lilianb@mail.fr",
            oldPassword: "fromage",
            newPassword: "salade"
        }));

    helper.checkInvalidToken(request(app)
        .post('/api/auth/password/change')
        .set('Content-Type', 'application/json')
        .send({
            email: "lilianb@mail.fr",
            oldPassword: "fromage",
            newPassword: "salade"
        }));

    helper.checkUserToken(request(app)
        .post('/api/auth/password/change')
        .set('Content-Type', 'application/json')
        .send({
            email: "mpsqr@mail.fr",
            oldPassword: "bourbe",
            newPassword: "bourbier"
        }));

    it('password change works', function(done) {
        request(app)
            .post('/api/auth/password/change')
            .set('Accept', 'application/json')
            .set('Content-Type', 'application/json')
            .set("x-access-token", helper.getToken())
            .send({
                email: "lilianb@mail.fr",
                oldPassword: "fromage",
                newPassword: "salade"
            })
            .expect('Content-Type', /json/)
            .expect(201, {
                success: true,
                user: {
                    id: "ABCDEFG",
                    firstName: "Lilian",
                    lastName: "Bethus",
                    email: "lilianb@mail.fr",
                    admin: true,
                    temporaryPassword: false
                }
            }, done);
    });
});