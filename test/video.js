var request = require('supertest-as-promised');
var api = require('../server.js');
var host = process.env.API_TEST_HOST || api;
var mongoose = require('mongoose');
// var host = 'http://localhost:3000';
var id;
request = request(host);
var data =
{
  "title":"prueba",
  "win":false,
  "videoId":"8a2Rl4paT5u",
  "start":50,
  "pause":70,
  "stop":80
};

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

      request
        .post('/videos')
        .set('Accept', 'application/json')
        .send({ video : data })
        .expect(201)
        .expect('Content-Type', /application\/json/)
        .end(function(err, res) {

          var video = res.body.video;

          expect(video).to.have.property("title", data.title);
          expect(video).to.have.property("win", data.win);
          expect(video).to.have.property("videoId", data.videoId);
          expect(video).to.have.property("start", data.start);
          expect(video).to.have.property("pause", data.pause);
          expect(video).to.have.property("stop", data.stop);

          id = video.id;
          done();
        });
    });
  });
  describe('GET /videos/:id', function() {
    it('Obtener un video', function(done) {

      request.get('/videos/' + id)
        .set('Accept', 'application/json')
        .send()
        .expect(200)
        .expect('Content-Type', /application\/json/)
        .then(function assertions(res) {

        video = res.body.video;

        expect(video).to.have.property("id", id);
        expect(video).to.have.property("title", data.title);
        expect(video).to.have.property("win", data.win);
        expect(video).to.have.property("videoId", data.videoId);
        expect(video).to.have.property("start", data.start);
        expect(video).to.have.property("pause", data.pause);
        expect(video).to.have.property("stop", data.stop);

        done();
      }, done);

    });
  });
  describe('GET /videos', function() {
    it('Obtener todos los videos', function(done) {

      request.get('/videos')
        .set('Accept', 'application/json')
        .send()
        .expect(200)
        .expect('Content-Type', /application\/json/)
        .then(function assertions(res) {

        videos = res.body.videos;

        expect(videos).to.not.be.empty;

        done();

      }, done);

    });
  });
  describe('PUT /videos/:id', function() {
    it('Actualizar un video existente', function(done) {

      var updateVideo = data;
      updateVideo.title = 'Rocky';

      request.put('/videos/' + id)
        .set('Accept', 'application/json')
        .send({ video : updateVideo})
        .expect(200)
        .expect('Content-Type', /application\/json/)
        .then(function assertions(res) {

        var video = res.body.video;

        expect(video).to.have.property("id", id);
        expect(video).to.have.property("title", updateVideo.title);
        expect(video).to.have.property("win", updateVideo.win);
        expect(video).to.have.property("videoId", updateVideo.videoId);
        expect(video).to.have.property("start", updateVideo.start);
        expect(video).to.have.property("pause", updateVideo.pause);
        expect(video).to.have.property("stop", updateVideo.stop);

        done();

      }, done);

    });
  });
  describe('DELETE /videos/:id', function() {
    it('Borrar un video', function(done) {
      request.delete('/videos/' + id)
        .set('Accept', 'application/json')
        .send()
        .expect(204)
        .then(function assertions(res) {
          var video;
          var body = res.body;

          // Respuesta vacia
          expect(body).to.be.empty;

          // Probamos que de verdad no exista
          request.get('/videos/' + id)
            .set('Accept', 'application/json')
            .send()
            .expect(400);

          done();

        }, done);

    });
  });

});
