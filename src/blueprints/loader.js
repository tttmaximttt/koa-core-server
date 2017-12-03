import glob from 'glob';
import _ from 'lodash';
import path from 'path';

const env = process.env.NODE_ENV || 'development';
export default class Loader {
  static _getName(rawName) {
    const splitName = rawName.split('.');
    return `${splitName[0]}${splitName[1].charAt(0).toUpperCase() + splitName[1].slice(1)}`
  }

  constructor() {
    this.dirPath = '';
    this.filePostfix = '';
  }

  load(injector) {
    const expression = this.filePostfix && _.isString(this.filePostfix);
    if (!expression) {
      throw new Error('File postfix should be defined.');
    }

    const files = glob.sync(`${this.dirPath}/**/*.${this.filePostfix}.js`);

    if (!files.length) {
      throw new Error(`No ${this.filePostfix} to load`);
    }

    for (const file of files) {
      let ClassFile = require(file);
      const fileName = `${path.basename(file)}`;

      if (ClassFile.default) {
        ClassFile = ClassFile.default;
      }

      ClassFile.prototype.injector = this.injector;
      const instance = new ClassFile();
      const name = instance.name || Loader._getName(fileName);
      loadersStatus && console.log(`${this.filePostfix} "${name}" load successful`);
      injector.set(name, instance);
    }

    return injector;
  }
}
