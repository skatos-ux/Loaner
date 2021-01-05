// supertest doc : https://github.com/visionmedia/supertest/

// Permet de simplifier la rédaction des tests sur les routes

import * as jwt from 'jsonwebtoken';
import * as config from '../../config.json';
import request from 'supertest';

let token: string, tokenNoAdmin: string, invalidToken: string;

function checkHasTokens() : void {
    if(!token || !tokenNoAdmin || !invalidToken) {
        [token, tokenNoAdmin, invalidToken] = generateTokens();
        /*console.log("token : " + token);
        console.log("token no admin : " + tokenNoAdmin);
        console.log("invalid token : " + invalidToken);*/
    }
}

function getToken() : string {

    checkHasTokens();

    return token;
}

function generateTokens() : string[] {

    const token = jwt.sign({ id: "ABCDEFG", admin: true }, config.jwtSecret, {
        expiresIn: "1h"
    });

    const tokenNoAdmin = jwt.sign({ id: "HIJKLMN", admin: false }, config.jwtSecret, {
        expiresIn: "1h"
    });

    const invalidToken = token.replace("e", "g").replace("y", "h").replace(".", "a");

    return [token, tokenNoAdmin, invalidToken];
}

function checkNoToken(test : request.Test) : void {

    checkHasTokens();

    it('responds error with no token', function(done) {
        test.set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(401, {
                    error: true,
                    message: "No token specified"
                }, done);
    });
}

function checkInvalidToken(test : request.Test) : void {

    checkHasTokens();

    it('responds error with invalid token', function(done) {
        test
            .set('Accept', 'application/json')
            .set("x-access-token", invalidToken)
            .expect('Content-Type', /json/)
            .expect(401, {
                error: true,
                message: "Invalid token"
            }, done);
    });
}

function checkNoAdminToken(test : request.Test) : void {

    checkHasTokens();

    it('responds error with not admin privileges token', function(done) {
        test
            .set('Accept', 'application/json')
            .set("x-access-token", tokenNoAdmin)
            .expect('Content-Type', /json/)
            .expect(401, {
                error: true,
                message: "This endpoint requires admin privileges"
            }, done);
    });
}

function checkUserToken(test : request.Test) : void {

    checkHasTokens();

    it('responds error with invalid user ID token', function(done) {
        test
            .set('Accept', 'application/json')
            .set("x-access-token", token)
            .expect('Content-Type', /json/)
            .expect(401, {
                error: true,
                message: "Invalid user"
            }, done);
    });
}

type TestCreatorCallback = () => request.Test;

function checkAllTokens(testCreator: TestCreatorCallback) : void {
    checkNoToken(testCreator());
    checkInvalidToken(testCreator());
    checkNoAdminToken(testCreator());
}

export { generateTokens, checkNoToken, checkInvalidToken, checkNoAdminToken, checkUserToken, checkAllTokens, getToken };