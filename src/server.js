import Hapi from 'hapi';
import { routes } from './routes';
var models = require('./models');

const server = Hapi.server({
  host: 'localhost',
  port: 5000,
  routes: { cors: true }
});

routes.forEach((route) => {
  server.route(route);
});

async function start() {
  try{
    await server.start();
  }
  catch (err) {
    console.log(err);
  }

  console.log('Hapii server is running');
}
models.sequelize.sync().
then(function() {
  start();
});
