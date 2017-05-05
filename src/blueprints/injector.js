export default class Injector extends Map {

  constructor() {
    super();
  }

  get(key) {
    if (!this.has(key)) {
      throw new Error(`No dependency ${key}`);
    }

    return super.get(key);
  }

  set(key, value) {
    if (!this.has(key)) {
      return super.set(key, value);
    }

    return this;
  }
}