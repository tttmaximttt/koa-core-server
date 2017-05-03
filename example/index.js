import Server from '../src'; // Path to koa-core in node_modules
import path from 'path';

const routePath = path.join(__dirname, 'routers');
const controllersPath= path.join(__dirname, 'controllers');
const server = new Server({
  routePath,
  controllersPath,
});

server.start();