const Hapi = require('hapi');
const allRoutes = require('./routes/routes.js');

const server = new Hapi.Server();
server.connection({
  host: 'localhost',
  port: 8090,
});
server.route(allRoutes);
if (!module.parent) {
  server.start((error) => {
    if (error) { throw error; }
    console.log('server started');
  });
}
module.exports = server;
