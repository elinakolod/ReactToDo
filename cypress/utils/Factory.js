export default class Factory {
  value = [];
  static create(...args) {
    this.value = ['create', ...args];
    return this;
  }
  static createList(...args) {
    this.value = ['create_list', ...args];
    return this;
  }
  static as(name) {
    this.value = [name, ...this.value.slice(1)];
    return this;
  }
}
