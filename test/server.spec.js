const Server = require('../src').default;
const path = require('path');
const { expect } = require('chai');
const sinon = require('sinon');
const os = require('os');
const cluster = require('cluster');

const routePath = path.join(__dirname, '../', 'example', 'routers');
const controllersPath = path.join(__dirname, '../', 'example', 'controllers');
const dataAccessPath = path.join(__dirname, '../', 'example', 'dataAccess');

const numWorkers = os.cpus().length;

describe('SERVER', () => {
  let server = null;
  let sandbox = null;

  beforeEach(() => {
    sandbox = sinon.sandbox.create();
    server = new Server({
      routePath,
      controllersPath,
      dataAccessPath,
      clustering: true,
      loadersStatus: false,
    });
  });

  afterEach(() => {
    sandbox.restore();
    sandbox.reset();
  });

  it('should have methods', () => {
    expect(server._init).to.be.a('function');
    expect(server.start).to.be.a('function');
    expect(server._boot).to.be.a('function');
    expect(server._loadDataAccess).to.be.a('function');
    expect(server._loadControllers).to.be.a('function');
    expect(server._loadRoutes).to.be.a('function');
  });

  describe('#_init', () => {
    it('should call chain of loaders', () => {
      sandbox.stub(server, '_loadDataAccess').callsFake(() => 'dataAccessInjector');
      sandbox.stub(server, '_loadControllers').callsFake(() => 'controllerInjector');
      sandbox.stub(server, '_loadRoutes').callsFake(() => {});

      server._init();

      sinon.assert.calledOnce(server._loadDataAccess);
      sinon.assert.calledWith(server._loadControllers, 'dataAccessInjector');
      sinon.assert.calledWith(server._loadRoutes, 'controllerInjector');
    });
  });

  describe('#start', () => {
    it('should call _init and _boot with correct parameters', () => {
      sandbox.stub(server, '_init').callsFake(() => server);
      sandbox.stub(server, '_boot').callsFake(() => {});

      server.start();

      sinon.assert.calledOnce(server._init);
      sinon.assert.calledWith(server._boot, true);
    });
  });

  describe('#_boot', () => {
    it(`should call 'cluster.fork' ${numWorkers} times`, () => {
      sandbox.stub(server, 'listen').callsFake(() => {});
      sandbox.stub(cluster, 'fork').callsFake(() => {});

      server._boot(true);

      sinon.assert.callCount(cluster.fork, numWorkers);
    });
  });

  describe('#_loadDataAccess', () => {
    it('should return fulfilled injector with data access files', () => {
      const dataAccessInjector = server._loadDataAccess();

      expect(dataAccessInjector).to.be.instanceOf(Map);
      expect(dataAccessInjector.has('helloDataAccess')).to.be.eql(true);
      expect(dataAccessInjector.has('userData')).to.be.eql(true);
    });

    it('should throw error if path is not defined', () => {
      server.options.dataAccessPath = null;
      const errFn = () => server._loadDataAccess();
      expect(errFn).to.throw('Should be provided path to you data access dir.');
    });
  });
});
