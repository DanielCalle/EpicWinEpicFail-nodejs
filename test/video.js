var request = require('supertest-as-promised');
var api = require('../server.js');
var host = process.env.API_TEST_HOST || api;
var mongoose = require('mongoose');
// var host = 'http://localhost:3000';

var _ = require('lodash');

request = request(host);
describe('Coleccion de Videos [/videos]', function() {
  before(function(done) {
    mongoose.connect('mongodb://localhost/epicwin', done);
  });

  after(function(done) {
    mongoose.disconnect(done);
    mongoose.models = {};
  });
  describe('POST /videos', function() {
    it('Crear un registro', function(done) {
      var data =
      {
        "video":{
        "title":"prueba",
        "type":"animales",
        "response":"win",
        "videoId":"8a2Rl4paT5u",
        "start":50,
        "pause":70,
        "stop":80
        }
      };

      request
        .post('/videos')
        .set('Accept', 'application/json')
        .send(data)
        .expect(201)
        .expect('Content-Type', /application\/json/)
        .end(function(err, res) {
          var nota;

          var body = res.body;
          // console.log('body', body);

          // Nota existe
          video = body;

          // Propiedades
          expect(video).to.have.property("title", 'prueba');
          expect(video).to.have.property("type", "animales");
          expect(video).to.have.property("response", "win");
          expect(video).to.have.property("videoId", "8a2Rl4paT5u");
          expect(video).to.have.property("start",50);
          expect(video).to.have.property("pause",70);
          expect(video).to.have.property("stop",80);

          done(err);
        });
    });
  });

  describe('GET /videos/:id', function() {
    it('Obtener por id un registro de video existente', function(done) {
      var id;
      var data =
      {
        "video":{
        "title":"prueba",
        "type":"animales",
        "response":"win",
        "videoId":"8a2Rl4paT5u",
        "start":50,
        "pause":70,
        "stop":80
        }
      };

      request
        .post('/videos')
        .set('Accept', 'application/json')
        .send(data)
        .expect(201)
        .expect('Content-Type', /application\/json/)
      .then(function getVideo(res) {
        id = res.body._id;

        return request.get('/videos/' + id)
          .set('Accept', 'application/json')
          .send()
          .expect(200)
          .expect('Content-Type', /application\/json/);
      }, done)
      .then(function assertions(res) {
        var nota;
        var body = res.body;
        // Nota existe
        video = body;

        // Propiedades
        expect(video).to.have.property('_id', id);
        expect(video).to.have.property("title", 'prueba');
        expect(video).to.have.property("type", "animales");
        expect(video).to.have.property("response", "win");
        expect(video).to.have.property("videoId", "8a2Rl4paT5u");
        expect(video).to.have.property("start",50);
        expect(video).to.have.property("pause",70);
        expect(video).to.have.property("stop",80);
        done();
      }, done);

    });
  });

});
