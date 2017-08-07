import glob from 'glob';
import path from 'path';

export default class DataAccessLoader {
  static _getControllerName(rawName) {
    const splitName = rawName.split('.');
    return `${splitName[0]}${splitName[1].charAt(0).toUpperCase() + splitName[1].slice(1)}`
  }

  constructor(controllersDirPath, controllerInjector) {
    this.controllersDirPath = controllersDirPath;
    this.injector = controllerInjector;
  }

  load(injector) {
    const controllerFiles = glob.sync(`${this.controllersDirPath}/**/*.dataAccess.js`);

    for (const file of controllerFiles) {
      const DataAccessClass = require(file);
      const fileName = `${path.basename(file)}`;
      console.log(fileName);
      const controllerInstance = new DataAccessClass();
      const dataAccessName = controllerInstance.name || DataAccessLoader._getControllerName(fileName);
      console.log(`Data access "${dataAccessName}" load successful`);
      injector.set(dataAccessName, controllerInstance);
    }
  }
}
