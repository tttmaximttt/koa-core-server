import Loader from '../blueprints/loader';

export default class DataAccessLoader extends Loader{
  constructor(controllersDirPath, controllerInjector) {
    super();
    this.dirPath = controllersDirPath;
    this.injector = controllerInjector;
    this.filePostfix = 'dataAccess';
  }
}
