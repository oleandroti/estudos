let express = require('../config/express')();
let request = require('supertest')(express);

describe('#ProdutosController', () =>{
    it('#teste', (done) => {
        request.get('/produtos')
        .set('Accept', 'application/json')
        .expect('Content-type', /json/)
        .expect(200, done);
    });
});
