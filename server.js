const Hapi = require('hapi');
const offerController = require('./controllers/offerController');

const server = new Hapi.Server();
server.connection({ 
  port: 3000, 
  host: 'localhost',
  routes: {
    cors: true
  }
});

server.register(require('inert'), (err) => {
  if (err) {
    throw err;
  }

  server.route({
    method: 'GET',
    path: '/{param*}',
    handler: {
      directory: {
        path: 'public',
        listing: false,
        index: true
      }
    }
  });
});

server.route({
  method: 'POST',
  path: '/offer',
  handler: offerController.createOffer
});

server.route({
  method: 'DELETE',
  path: '/offer/{id}',
  handler: offerController.deleteOffer
});

server.route({
  method: 'GET',
  path: '/offers/{limit?}',
  handler: offerController.getOffers
});

server.start((err) => {
  if (err) {
    throw err;
  }
  console.log(`Server running at: ${server.info.uri}`);
});

module.exports = server;
