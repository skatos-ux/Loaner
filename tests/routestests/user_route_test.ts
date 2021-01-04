import request from 'supertest';
import { app } from '../../src/index';

describe('GET /user/all', function() {
    it('responds with json', function(done) {
        request(app)
            .get('/api/users/all')
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
});