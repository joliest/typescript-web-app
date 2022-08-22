export class Attributes<T> {
  constructor(private data: T) {}

  // https://docs.google.com/document/d/1mlasXzzYuh95Wlj7x-JRJwKNbWy8xH-OO6NJqYVjj30/edit#heading=h.bt1yoyfe3jew
  get = <K extends keyof T>(key: K): T[K] => {
    return this.data[key];
  };

  set(update: T): void {
    Object.assign(this.data, update);
  }
}
