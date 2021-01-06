import request from 'supertest';
import { app } from '../../src/index';
import * as helper from './routing_tests_helper';

import createDatabase from '../../util/create_db';

describe('PUT /category/add/:category_name', function() {

    this.beforeEach(() => {
        createDatabase();
    });

    it('responds error when too long name is given', function(done) {
        request(app)
            .put('/api/category/add/' + new Array(257).join("A"))
            .set('Accept', 'application/json')
            .set("x-access-token", helper.getToken())
            .expect('Content-Type', /json/)
            .expect(400, {
                error: true,
                message: "Invalid name"
            }, done);
    });

    it('responds error when category name already exists', function(done) {
        request(app)
            .put('/api/category/add/Ordinateurs')
            .set('Accept', 'application/json')
            .set("x-access-token", helper.getToken())
            .expect('Content-Type', /json/)
            .expect(400, {
                error: true,
                message: "Category name already exists"
            }, done);
    });

    helper.checkAllTokens(() => request(app).put('/api/category/add/Test'));

    it('adding category works', function(done) {
        request(app)
            .put('/api/category/add/Test')
            .set('Accept', 'application/json')
            .set("x-access-token", helper.getToken())
            .expect('Content-Type', /json/)
            .expect(201, done);
    });
});

describe('POST /category/modify', function() {

    this.beforeEach(() => {
        createDatabase();
    });

    it('responds error when not existing category name is given', function(done) {
        request(app)
            .post('/api/category/modify')
            .set('Accept', 'application/json')
            .set('Content-Type', 'application/json')
            .set("x-access-token", helper.getToken())
            .send({
                oldName: "Existepas",
                newName: "Existepasnonplus"
            })
            .expect('Content-Type', /json/)
            .expect(400, {
                error: true,
                message: "Invalid category name"
            }, done);
    });

    it('responds error when old name is equals to new name', function(done) {
        request(app)
            .post('/api/category/modify')
            .set('Accept', 'application/json')
            .set('Content-Type', 'application/json')
            .set("x-access-token", helper.getToken())
            .send({
                oldName: "Ordinateurs",
                newName: "Ordinateurs"
            })
            .expect('Content-Type', /json/)
            .expect(400, {
                error: true,
                message: "Old name can't be the equal to new name"
            }, done);
    });

    it('responds error when new name already exists', function(done) {
        request(app)
            .post('/api/category/modify')
            .set('Accept', 'application/json')
            .set('Content-Type', 'application/json')
            .set("x-access-token", helper.getToken())
            .send({
                oldName: "Ordinateurs",
                newName: "Téléphones"
            })
            .expect('Content-Type', /json/)
            .expect(400, {
                error: true,
                message: "New name is already set for a category"
            }, done);
    });

    helper.checkAllTokens(() => request(app)
        .post('/api/category/modify')
        .set('Content-Type', 'application/json')
        .send({
            oldName: "Ordinateurs",
            newName: "Courgette"
        }));

    it('modifying category works', function(done) {
        request(app)
            .post('/api/category/modify')
            .set('Accept', 'application/json')
            .set('Content-Type', 'application/json')
            .set("x-access-token", helper.getToken())
            .send({
                oldName: "Ordinateurs",
                newName: "Courgette"
            })
            .expect('Content-Type', /json/)
            .expect(201, done);
    });
});

describe('POST /category/delete/:id_category', function() {

    this.beforeEach(() => {
        createDatabase();
    });

    it('responds error when category ID is not a number', function(done) {
        request(app)
            .delete('/api/category/delete/PASUNNOMBRE')
            .set('Accept', 'application/json')
            .set("x-access-token", helper.getToken())
            .expect('Content-Type', /json/)
            .expect(400, {
                error: true,
                message: "Category ID is not a number"
            }, done);
    });

    it('responds error when category ID doesnt exists', function(done) {
        request(app)
            .delete('/api/category/delete/99')
            .set('Accept', 'application/json')
            .set("x-access-token", helper.getToken())
            .expect('Content-Type', /json/)
            .expect(400, {
                error: true,
                message: "Invalid category ID"
            }, done);
    });

    helper.checkAllTokens(() => request(app).delete('/api/category/delete/1'));

    it('deleting category works', function(done) {
        request(app)
            .delete('/api/category/delete/1')
            .set('Accept', 'application/json')
            .set("x-access-token", helper.getToken())
            .expect('Content-Type', /json/)
            .expect(201, done);
    });
});