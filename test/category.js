var request = require('supertest-as-promised');
var api = require('../server.js');
var host = process.env.API_TEST_HOST || api;
var mongoose = require('mongoose');

var id;
request = request(host);
var data =
{
  "title":"prueba",
  "description":"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi arcu tellus, ultricies ac leo sit amet, lobortis varius nisl."
};

describe('Coleccion de Category [/categories]', function() {

  before(function(done) {
    mongoose.connect('mongodb://localhost/epicwin', done);
  });

  after(function(done) {
    mongoose.disconnect(done);
    mongoose.models = {};
  });

  describe('POST /categories', function() {
    it('Crear un registro', function(done) {

      request
        .post('/categories')
        .set('Accept', 'application/json')
        .send({ category : data })
        .expect(201)
        .expect('Content-Type', /application\/json/)
        .end(function(err, res) {

          var category = res.body.category;
          
          expect(category).to.have.property("title", data.title);
          expect(category).to.have.property("description", data.description);

          id = category.id;
          done();
        });
    });
  });
  describe('GET /categories/:id', function() {
    it('Obtener una categoria', function(done) {

      request.get('/categories/' + id)
        .set('Accept', 'application/json')
        .send()
        .expect(200)
        .expect('Content-Type', /application\/json/)
        .then(function assertions(res) {

        category = res.body.category;

        expect(category).to.have.property("id", id);
        expect(category).to.have.property("title", data.title);
        expect(category).to.have.property("description", data.description);

        done();
      }, done);

    });
  });
  describe('GET /categories', function() {
    it('Obtener todas las categorias', function(done) {

      request.get('/categories')
        .set('Accept', 'application/json')
        .send()
        .expect(200)
        .expect('Content-Type', /application\/json/)
        .then(function assertions(res) {

        categories = res.body.categories;

        expect(categories).to.not.be.empty;

        done();

      }, done);

    });
  });
  describe('PUT /categories/:id', function() {
    it('Actualizar una categoria existente', function(done) {

      var updateVideo = data;
      updateVideo.title = 'Rocky';

      request.put('/categories/' + id)
        .set('Accept', 'application/json')
        .send({ category : updateVideo})
        .expect(200)
        .expect('Content-Type', /application\/json/)
        .then(function assertions(res) {

        var category = res.body.category;

        expect(category).to.have.property("id", id);
        expect(category).to.have.property("title", updateVideo.title);
        expect(category).to.have.property("description", updateVideo.description);

        done();

      }, done);

    });
  });
  describe('DELETE /categories/:id', function() {
    it('Borrar una categoria', function(done) {
      request.delete('/categories/' + id)
        .set('Accept', 'application/json')
        .send()
        .expect(204)
        .then(function assertions(res) {
          var category;
          var body = res.body;

          // Respuesta vacia
          expect(body).to.be.empty;

          // Probamos que de verdad no exista
          request.get('/categories/' + id)
            .set('Accept', 'application/json')
            .send()
            .expect(400);

          done();

        }, done);

    });
  });

});
