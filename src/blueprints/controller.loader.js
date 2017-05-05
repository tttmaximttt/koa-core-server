import glob from 'glob';
import path from 'path';

export default class ControllerLoader {
  static _getControllerName(rawName) {
    const splitName = rawName.split('.');
    return `${splitName[0]}${splitName[1].charAt(0).toUpperCase() + splitName[1].slice(1)}`
  }

  constructor(controllersDirPath, dataAccessInjector) {
    this.controllersDirPath = controllersDirPath;
    this.injector = dataAccessInjector;
  }

  load(injector) {
    const controllerFiles = glob.sync(`${this.controllersDirPath}/**/*.controller.js`);

    for (const file of controllerFiles) {
      const ControllerClass = require(file).default;
      ControllerClass.prototype.injector = this.injector;
      const fileName = `${path.basename(file)}Controller`;
      const controllerInstance = new ControllerClass();
      const controllerName = controllerInstance.name || ControllerLoader._getControllerName(fileName);
      console.log(`Controller "${controllerName}" load successful`);
      injector.set(controllerName, controllerInstance);
    }
  }
}