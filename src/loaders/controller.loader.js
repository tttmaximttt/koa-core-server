import Loader from '../blueprints/loader';
import DataAccessLoader from "./dataAccess.loader";

export default class ControllerLoader extends Loader{
  constructor(controllersDirPath, dataAccessInjector) {
    super();
    this.dirPath = controllersDirPath;
    this.injector = dataAccessInjector;
    this.filePostfix = 'controller';
  }
}
