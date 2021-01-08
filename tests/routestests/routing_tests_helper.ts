// Permet de simplifier la rédaction des tests sur les routes

// TODO : vérifier si des objets sont manquant quand envoie d'un requete avec un corps

import * as jwt from 'jsonwebtoken';
import * as config from '../../src/config.json';
import request from 'supertest';

// Tokens
// token = Token administrateur pour l'utilisateur Lilian
// tokenNoAdmin = Token classique pour l'utilisateur Milan
// invalidToken = Token "token" modifié afin qu'il soit volontairement invalide
let token: string, tokenNoAdmin: string, invalidToken: string;

// Vérifie si les tokens ont été générés et les génèrent si besoin
function checkHasTokens() : void {
    if(!token || !tokenNoAdmin || !invalidToken) {
        [token, tokenNoAdmin, invalidToken] = generateTokens();
    }
}

// Retourne 
function getToken() : string {
    checkHasTokens();
    return token;
}

// Génère les tokens
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

// Permet de tester si une erreur est bien renvoyée lorsque aucun token n'est passé à l'API
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

// Permet de tester si une erreur est bien renvoyée lorsqu'un token non valide n'est passé à l'API
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

// Permet de tester si une erreur est bien renvoyée lorsqu'un token non administrateur n'est passé à l'API
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

// Permet de tester si une erreur est bien renvoyée lorsque le token passé à l'API ne correspond pas au bon utilisateur
// Utilise le token de base pour Lilian, doit donc etre testé dans la requete avec l'utilisateur Milan
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

// Prototype de la fonction permettant de créer des tests
type TestCreatorCallback = () => request.Test;

// Permet de tester les 3 premiers types de tests sur les tokens
// La fonction passé doit permettre à cette méthode de générer le test approprié (un test ne pouvant pas servir deux fois)
function checkAllTokens(testCreator: TestCreatorCallback, checkAdmin = true) : void {
    checkNoToken(testCreator());
    checkInvalidToken(testCreator());
    if(checkAdmin) {
        checkNoAdminToken(testCreator());
    }
}

export { generateTokens, checkNoToken, checkInvalidToken, checkNoAdminToken, checkUserToken, checkAllTokens, getToken };