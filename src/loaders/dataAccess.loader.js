import Loader from '../blueprints/loader';

export default class DataAccessLoader extends Loader{
  constructor(dataAccessDirPath, filePostfix) {
    super();
    this.dirPath = dataAccessDirPath;
    this.filePostfix = filePostfix || 'dataAccess';
  }
}
