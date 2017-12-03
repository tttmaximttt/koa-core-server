const Server = require('../index'); // Path to koa-core in node_modules
const path = require('path');

const routePath = path.join(__dirname, 'routers');
const controllersPath = path.join(__dirname, 'controllers');
const dataAccessPath = path.join(__dirname, 'dataAccess');
const server = new Server({
  routePath,
  controllersPath,
  dataAccessPath,
});

server.use((ctx, next) => {
  console.log('hello from middleware');
  next();
});

server.start();
